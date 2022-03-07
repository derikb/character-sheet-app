"""Use a local clone of 5etools with spell definitions in JSON format to generate javascript definitions."""
from __future__ import annotations

import json
import os
from typing import Any, Dict, Iterable

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import ValidationError

from domain import books
from domain import backgrounds
from domain import general
from domain import races
from domain import classes
from domain.spells import Spell, initialise_spells
import js_writer

EXTERNAL_5ETOOLS_MIRROR = os.path.abspath(os.path.join('..', '5etools-mirror-1.github.io'))
OUTPUT_FOLDER = os.path.abspath(os.path.join("src", "data"))


# Initialise independent definitions
_PARSER_FILE_5E_TOOLS = os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'js', 'parser.js')
print("Initialising general data")
general.initialise_general(parser_file=_PARSER_FILE_5E_TOOLS)
print("Initialising books")
books.initialise_books(
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


def write_utils() -> None:
	"""Write some common utility definitions to utils.js."""
	print("Writing utils.js")
	enum_imports, enum_def, enum_exports = js_writer.write_enum_definitions()
	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'utils.js'),
		module_doc="Various utility definitions.",
		imports=enum_imports,
		definitions=enum_def,
		exports=enum_exports,
	)


def write_general() -> None:
	"""Write general data definitions to general.js."""
	print("Writing general.js")
	imports, definitions, exports = js_writer.combine_definitions([
		js_writer.write_enum(general.TimeUnit),
		js_writer.write_dict_enum(general.Condition),
		js_writer.write_enum(general.Attribute),
		js_writer.write_dict_enum(general.CreatureType),
		js_writer.write_dict_enum(general.DamageType),
	])

	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'general.js'),
		module_doc="General data definitions.",
		imports=imports,
		definitions=definitions,
		exports=exports,
	)


def write_books() -> None:
	"""Write definitions of source books to books.js."""
	print("Writing books.js")
	imports, definitions, exports = js_writer.combine_definitions([
		js_writer.write_dict_enum(books.Book),
	])

	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'books.js'),
		module_doc="Data definitions for source books.",
		imports=imports,
		definitions=definitions,
		exports=exports,
	)


def write_races() -> None:
	"""Write a race class to races.js."""
	print("Writing races.js")
	definitions, exports = js_writer.write_basemodel_class_definition('Race', races.Race)
	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'races.js'),
		module_doc="Data definition for races.",
		imports={},
		definitions=definitions,
		exports=exports,
	)


def write_backgrounds() -> None:
	"""Write a backgrounds class to backgrounds.js."""
	print("Writing backgrounds.js")
	definitions, exports = js_writer.write_basemodel_class_definition('Background', backgrounds.Background)
	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'backgrounds.js'),
		module_doc="Data definition for backgrounds.",
		imports={},
		definitions=definitions,
		exports=exports,
	)


def write_classes() -> None:
	"""Write a 'Class' class to classes.js :-) ."""
	print("Writing classes.js")
	descr_definitions, descr_exports = js_writer.write_basemodel_class_definition(
		'ClassDescription', classes.ClassDescription
	)
	class_definitions, class_exports = js_writer.write_basemodel_class_definition('Class', classes.Class)
	js_writer.write_js_file(
		file_path=os.path.join(OUTPUT_FOLDER, 'classes.js'),
		module_doc="Data definitions for character classes.",
		imports={},
		definitions=descr_definitions + ['\n'] + class_definitions,
		exports=descr_exports + class_exports,
	)


if __name__ == '__main__':
	# parse 5etools input
	spells = list(get_spells())
	print("Parsed", len(spells), "spells")

	# write js output
	os.makedirs(OUTPUT_FOLDER, exist_ok=True)
	write_utils()
	write_general()
	write_books()
	write_races()
	write_backgrounds()
	write_classes()
