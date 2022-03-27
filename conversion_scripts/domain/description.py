"""Defines the domain of descriptions, as a recursive union of various types."""
from __future__ import annotations

import abc
import re
from enum import Enum
from typing import Any, Callable, Dict, Iterable, List, Optional, Union

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field, root_validator, validator

from .books import Book


class HTMLConvertible(abc.ABC):
	"""Protocol to define a to_html function."""

	@abc.abstractmethod
	def to_html(self, indent_level: int) -> str:
		"""Convert object to html-string."""
		raise NotImplementedError()


class Description(HTMLConvertible, abc.ABC):
	"""Base class for descriptions."""

	@classmethod
	def create_subclass_instance(cls, value: Union[str, list, Dict[str, Any]]) -> Description:
		"""Create an appropriate description class based on value."""
		if isinstance(value, str):
			return StringDescription(value=value)
		elif isinstance(value, list):
			return ListDescription(entries=value)
		elif isinstance(value, dict):
			if 'type' not in value:
				raise KeyError(f"Description dict without 'type' key: {value}.")
			descr_type = value.pop('type', None)
			if descr_type == 'entries':
				return ListDescription(**value)
			elif descr_type == 'quote':
				return QuoteDescription(**value)
			elif descr_type == 'inset':
				return InsetDescription(**value)
			elif descr_type == 'cell':
				return CellDescription(**value)
			elif descr_type == 'table':
				return TableDescription(**value)
			elif descr_type == 'list':
				return EnumerationDescription(**value)
			if descr_type == 'item':
				return ListDescription(**value)
			raise KeyError(f"Description dict with unknown type: '{descr_type}'.")
		raise ValueError(f"Unknown description type: '{type(value)}'")

	@abc.abstractmethod
	def to_html(self, indent_level: int = 0) -> str:
		"""Create an html-string representation."""
		raise NotImplementedError()

	@classmethod
	def __get_validators__(cls) -> Iterable[Callable[[Union[str, list, Dict[str, Any]]], Description]]:
		"""Yield pydantic validators create the proper description type."""
		yield cls.create_subclass_instance


_NORMALISATION_PATTERNS = {
	re.compile(r"{@" + name + r"\s+([^}\|]+)\|?[^}]*?}"): r"<" + style + r">\1</" + style + r">"
	for name, style in [
		(emphasis_word, 'em') for emphasis_word in [
			"action", "adventure", "book", "classFeature", "condition", "creature", "filter", "item", "race", "sense",
			"skill", "spell",
		]
	] + [(bold_word, 'b') for bold_word in ["d20", "damage", "dice", "hit", "b"]] + [("i", 'i')]
}
_NORMALISATION_PATTERNS.update({
	re.compile(r"{@chance\s+([^}\|]+)\|?[^}]*?}"): r"\1%",
})
_NORMALISATION_POST_PATTERNS = {
	re.compile(r"{@note\s*([^}]+)}"): r"\1",
}


def _normalise_html_string(orig: str) -> str:
	"""Replace "... {@... ...} ..."."""
	processed = orig
	for pattern, replace_pattern in _NORMALISATION_PATTERNS.items():
		processed = re.sub(pattern, replace_pattern, processed)
	for pattern, replace_pattern in _NORMALISATION_POST_PATTERNS.items():
		processed = re.sub(pattern, replace_pattern, processed)
	return processed


class StringDescription(BaseModel, Description, extra=Extra.forbid):
	"""Simple string-description."""

	value: str

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string."""
		return "\t" * indent_level + _normalise_html_string(self.value) + "\n"


class ListDescription(BaseModel, Description, extra=Extra.forbid):
	"""Description consisting of a list of other descriptions."""

	entries: List[Description]
	name: Optional[str] = None

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as a list of paragraphs."""
		indent = "\t" * indent_level
		html = indent + ("<b>" + self.name + "</b>\n" if self.name else "")
		for entry in self.entries:
			html += indent + "<p>\n" + entry.to_html(indent_level + 1) + indent + "</p>\n"
		return html


class QuoteDescription(BaseModel, Description, extra=Extra.forbid):
	"""A citation in the description."""

	entries: List[Description]
	author: str = Field(alias='by')

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an indented list of paragraphs, followed by an attribution."""
		indent = "\t" * indent_level
		html = indent + "\"\n" + indent + "<i>\n"
		prefix = (indent + "<p>\n" if len(self.entries) > 1 else "")
		postfix = (indent + "</p>\n" if len(self.entries) > 1 else "")
		for entry in self.entries:
			html += prefix + entry.to_html(indent_level) + postfix
		html += indent + "</i>\n" + indent + "\"\n"
		html += indent + ("<p>— " + self.author + "</p>\n" if self.author else "")
		return html


class InsetDescription(BaseModel, Description, extra=Extra.forbid):
	"""An inset into a description."""

	entries: List[Description]
	name: str
	source: Book
	page: int

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an inset box."""
		indent = "\t" * indent_level
		html = indent + "<p style=\"padding: 2px; border: 2px solid;\">\n"
		html += indent + "\t<b>" + self.name + "</b> (" + self.source.abbreviation + " p." + str(self.page) + ")\n"
		for entry in self.entries:
			html += entry.to_html(indent_level + 1)
		html += indent + "</p>\n"
		return html


class DieRoll(BaseModel, extra=Extra.forbid):
	"""Model for a (range of) die roll result(s)."""

	pad: Optional[int] = None
	exact: Optional[int] = None
	minimum: Optional[int] = Field(None, alias='min')
	maximum: Optional[int] = Field(None, alias='max')


class CellDescription(BaseModel, Description, extra=Extra.forbid):
	"""Description of a table cell."""

	roll: DieRoll

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string."""
		string_value = "" if self.roll.pad is None else " " * self.roll.pad
		if self.roll.exact is not None:
			string_value = str(self.roll.exact)
		else:
			if self.roll.minimum is not None:
				string_value += str(self.roll.minimum)
			string_value += "-"
			if self.roll.maximum is not None:
				string_value += str(self.roll.maximum)
		return "\t" * indent_level + string_value + "\n"


class TextAlignment(str, Enum):
	"""Text alignment."""

	LEFT = 'left'
	CENTER = 'center'


class DescriptionTableColumnStyle(BaseModel, extra=Extra.forbid):
	"""Style of a table column."""

	width: int
	alignment: TextAlignment = Field(TextAlignment.LEFT, alias='align')


DESCRIPTION_TABLE_COLUMN_STYLE_PATTERN = re.compile(
	r'\s*col-(?P<width>\d+)\s*(text-)?(?P<align>' + r'|'.join([align.value for align in TextAlignment]) + r')?\s*'
)


class TableDescription(BaseModel, Description, extra=Extra.forbid):
	"""Description entry with table format."""

	caption: Optional[str] = None
	headers: List[str] = Field(alias='colLabels')
	column_styles: List[DescriptionTableColumnStyle] = Field(alias='colStyles')
	rows: List[List[Description]]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_n_columns_consistency(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether all fields have the same number of columns."""
		header_len = len(values.get('colLabels', []))
		styles_len = len(values.get('colStyles', []))
		if header_len != styles_len:
			raise ValueError(
				f"length of headers ({header_len}) does not match length of styles "
				f"({styles_len}) in DescriptionTable {values}"
			)
		for ind, row in enumerate(values.get('rows', [])):
			if len(row) != styles_len:
				raise ValueError(
					f"lenght of row {ind} ({len(row)}) does not match length of styles "
					f"({styles_len}) in DescriptionTable {values}"
				)
		return values

	@validator('column_styles', pre=True)
	def build_column_style(cls, value: List[Union[str, Dict[str, Any]]]) -> List[Dict[str, Any]]:
		"""Construct custom for table column style."""
		parsed_styles = []
		for style_str in value:
			if isinstance(style_str, str):
				matches = re.match(DESCRIPTION_TABLE_COLUMN_STYLE_PATTERN, style_str)
				if matches is None:
					raise ValueError(
						f"No match for string '{style_str}' with pattern '{DESCRIPTION_TABLE_COLUMN_STYLE_PATTERN}'"
					)
				style = matches.groupdict()
				if style.get('align') is None:
					style.pop('align', None)
				parsed_styles.append(style)
			else:
				parsed_styles.append(style_str)
		return parsed_styles

	@staticmethod
	def _count_cell_width(cell: str) -> int:
		return max(len(re.sub(r"</?[^>]+>", "", line.lstrip("\t"))) for line in cell.split("\n")) + 1

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as a table."""
		indent = "\t" * indent_level
		html = indent + "<table style=\"border-collapse: collapse;\">\n"

		if self.caption:
			html += indent + "\t<caption>" + self.caption + "</caption>\n"

		col_widths = [col.width for col in self.column_styles]
		border_style = "border: 1px solid;"

		content_html = indent + "\t<tr>\n"
		for col_ind, header in enumerate(self.headers):
			normalised_header = _normalise_html_string(header)
			content_html += indent + "\t\t<th style=\"" + border_style + "\">" + normalised_header + "</th>\n"
			col_widths[col_ind] = max(col_widths[col_ind], self._count_cell_width(normalised_header))
		content_html += indent + "\t</tr>\n"

		for row in self.rows:
			content_html += indent + "\t<tr>\n"
			for col_ind, cell in enumerate(row):
				content_html += indent + "\t\t<td style=\"" + border_style + "\">\n"
				cell_content = cell.to_html(indent_level + 3)
				content_html += cell_content
				col_widths[col_ind] = max(col_widths[col_ind], self._count_cell_width(cell_content))
				content_html += indent + "\t\t</td>\n"
			content_html += indent + "\t</tr>\n"
		content_html += indent + "</table>\n"

		html += indent + "\t<colgroup>\n"
		for col_ind, col in enumerate(self.column_styles):
			html += indent + "\t\t<col style=\"width: " + str(col_widths[col_ind]) + "ch; "
			html += "text-align: " + col.alignment.value + ";\">\n"
		html += indent + "\t</colgroup>\n"

		html += content_html

		return html


class EnumerationDescription(BaseModel, Description, extra=Extra.forbid):
	"""Description entry with an enumeration of other descriptions."""

	items: List[Description]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_style(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether style is missing or has an expected value."""
		style = values.pop('style', 'single')
		if style not in ('single', 'list-hang-notitle'):
			raise ValueError(f"Unknown list style '{style}'")
		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an unordered list."""
		indent = "\t" * indent_level
		html = indent + "<ul>\n"
		for item in self.items:
			html += indent + "\t<li>\n" + item.to_html(indent_level + 2) + indent + "\t</li>\n"
		html += indent + "</ul>\n"
		return html
