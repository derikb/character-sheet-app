"""Use a local clone of 5etools with spell definitions in JSON format to generate javascript definitions."""
from __future__ import annotations

import json
import os
from typing import Any, Dict, Iterable

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import ValidationError

from domain.books import initialise_books
from domain.general import initialise_general
from domain.spells import Spell, initialise_spells

EXTERNAL_5ETOOLS_MIRROR = os.path.join('/home', 'ephron', 'Projects', '5etools-mirror-1.github.io')


# Initialise independent definitions
_PARSER_FILE_5E_TOOLS = os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'js', 'parser.js')
print("Initialising general data")
initialise_general(parser_file=_PARSER_FILE_5E_TOOLS)
print("Initialising books")
initialise_books(
	official_books_file=os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'data', 'books.json'),
	books_parser_file=_PARSER_FILE_5E_TOOLS,
)
print("Initialising spell data")
initialise_spells(parser_file=_PARSER_FILE_5E_TOOLS)


def get_spells() -> Iterable[Spell]:
	"""Read spells from external 5etools clone and parse to domain class."""
	for raw_spell in _read_spells_from_5etools():
		try:
			current_spell = Spell.from_raw(raw_spell)
		except (ValueError, ValidationError) as err:
			raise ValueError(f"{err} while processing raw spell\n{raw_spell}") from err
		yield current_spell


def _read_spells_from_5etools() -> Iterable[Dict[str, Any]]:
	"""Read the spell definition from the external 5etools clone."""
	spells_folder = os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'data', 'spells')

	with open(os.path.join(spells_folder, 'index.json'), 'rt', encoding='utf-8') as index_file:
		index = json.load(index_file)

	for spells_file in index.values():
		print("reading from", spells_file)
		with open(os.path.join(spells_folder, spells_file), 'rt', encoding='utf-8') as file_:
			source_spells = json.load(file_)
		yield from source_spells['spell']


if __name__ == '__main__':
	spells = list(get_spells())
	print("Parsed", len(spells), "spells")
	# print('-' * 120)
	# print(spells[0])
