"""Defines the domain of source books."""
from __future__ import annotations

import json
import re
from typing import Dict, Optional, Union

from pydantic import BaseModel, Extra, Field  # pylint: disable=unused-import

from .util import DynamicFrozenDictEnum


class _BookDef(BaseModel):
	"""Private dataclass for parsing allowed books."""

	name: str
	abbr: str
	date: str
	official: bool


class Book(DynamicFrozenDictEnum[_BookDef]):
	"""D&D source material book."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Initialise the Book class by loading the required definitions."""
		if len(args) == 2:
			official_books_file, books_parser_file = args
		else:
			official_books_file = kwargs['official_books_file']
			books_parser_file = kwargs['books_parser_file']
		with open(official_books_file, 'rt', encoding='utf-8') as input_file:
			official_book_definitions = json.load(input_file)
		official_books = {
			book['id']: {'name': book['name'], 'abbr': book['source'], 'date': book['published'], 'official': True}
			for book in official_book_definitions['book']
		}

		all_books = cls._get_books_from_parser_file(books_parser_file)
		all_books.update(official_books)
		for id_, book in all_books.items():
			if book['date'] == 'unknown':
				raise ValueError(f"Unknown date for book with id '{id_}': \"{book['name']}\"")

		cls._set_allowed_values({key: _BookDef(**book) for key, book in all_books.items()})

	@staticmethod
	def _get_books_from_parser_file(parser_file: str) -> Dict[str, Dict[str, Union[str, bool]]]:
		"""Read book info from 5etools parser file."""
		# define search patterns
		data_types = ['FULL', 'ABV', 'DATE', 'ID']
		patterns = {
			type_: re.compile(r"^Parser\.SOURCE_JSON_TO_" + type_ + r"\[([^\]]+)\]\s*=\s*([\"`]?.+[\"`]?);")
			if type_ != 'ID' else re.compile(r"^(SRC_[\w]+)\s*=\s*([\"`]?.+[\"`]?);")
			for type_ in data_types
		}
		variable_pattern = re.compile(r"\${([^}]+)}")

		found_matches: Dict[str, Dict[str, str]] = {type_: {} for type_ in data_types}
		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			# get necessary strings
			values_to_interpolate = []
			variables_to_resolve = set()
			for line in input_file.readlines():
				for type_ in data_types:
					match = re.match(patterns[type_], line)
					if match:
						key = match.group(1)
						if type_ == 'ID' and key.endswith(('_PREFIX', '_TMP', '_SUFFIX')):
							continue
						value = match.group(2)
						if not value.startswith(('"', '`')):
							# bare variable reference
							found_matches[type_][key] = f"{{{value}}}"
							values_to_interpolate.append((type_, key))
							variables_to_resolve.add(value)
							break
						variable_matches = re.findall(variable_pattern, value)
						value_clean = re.sub(variable_pattern, r"{\1}", value).lstrip('"`').rstrip('"`')
						found_matches[type_][key] = value_clean
						if variable_matches:
							# hybrid string with insert variables
							values_to_interpolate.append((type_, key))
							variables_to_resolve.update(variable_matches)
						break
			# get variables
			input_file.seek(0)
			var_patterns = {
				var: re.compile(rf"{var}\s*=\s*\"([^\"]+)\";") for var in variables_to_resolve
			}
			found_variables = {}
			for line in input_file.readlines():
				for var, var_pattern in var_patterns.items():
					match = re.match(var_pattern, line)
					if match:
						found_variables[var] = match.group(1)
						var_patterns.pop(var)
						break
				if not var_patterns:
					break
			if not all(var in found_variables for var in variables_to_resolve):
				raise KeyError(
					f"Could not find definition of variables {variables_to_resolve.difference(found_variables.keys())}"
				)
			# interpolate found strings
			for type_, key in values_to_interpolate:
				found_matches[type_][key] = found_matches[type_][key].format(**found_variables)

		books: Dict[str, Dict[str, Union[str, bool]]] = {}
		for key, id_ in found_matches['ID'].items():
			if key not in found_matches['FULL']:
				raise KeyError(f"No full name for key '{key}'.")
			name = str(found_matches['FULL'].pop(key))
			if key not in found_matches['ABV']:
				raise KeyError(f"No abbreviation for key '{key}'.")
			abbr = str(found_matches['ABV'].pop(key))
			if key not in found_matches['DATE']:
				date = 'unknown'
			else:
				date = str(found_matches['DATE'].pop(key))
			books[id_] = {'name': name, 'abbr': abbr, 'date': date, 'official': False}
		if found_matches['FULL']:
			raise KeyError(f"No id for keys '{list(found_matches['FULL'])}'.")
		if found_matches['ABV']:
			raise KeyError(f"No id for keys '{list(found_matches['ABV'])}'.")
		if found_matches['DATE']:
			raise KeyError(f"No id for keys '{list(found_matches['DATE'])}'.")

		return books

	def __init__(self, key: str):
		"""Initialise a book without type checking."""
		self._name = self._allowed_value_dict[key].name
		self._abbr = self._allowed_value_dict[key].abbr
		self._date = self._allowed_value_dict[key].date
		self._official = self._allowed_value_dict[key].official
		super().__init__(key)

	def __repr__(self) -> str:
		"""Represent as string."""
		return "'" + self._name + "'"

	@property
	def abbreviation(self) -> str:
		"""Get property abbreviation of book."""
		return self._abbr

	@property
	def published_date(self) -> str:
		"""Get property publication date of book."""
		return self._date

	@property
	def is_official(self) -> bool:
		"""Get property official status of book."""
		return self._official


class BookReference(BaseModel, extra=Extra.forbid):
	"""Book material reference."""

	book: Book = Field(alias='source')
	page: Optional[int] = None


def initialise_books(official_books_file: str, books_parser_file: str) -> None:
	"""Initialise the Book class by loading the required definitions."""
	if not Book.is_initialised():
		Book.initialise(official_books_file, books_parser_file)
