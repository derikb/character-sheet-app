"""Module with helper functions to write javascript files."""
import re
from enum import Enum
from typing import Dict, List, Tuple, Type

from pydantic import BaseModel

from domain.util import DynamicFrozenDictEnum


_ENUM_CONSTRUCTOR_NAME = 'createEnum'
_DICT_ENUM_CONSTRUCTOR_NAME = 'createEnumFromMapping'


def write_enum_definitions() -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Write a python Enum to JS enum (using POJO).

	Returns: a tuple of: necessary import lines, the definition itself, export names
	"""
	return (
		{},
		[
			"/**\n",
			" * Constructor function for enums.\n",
			" * @param {String[]} values\n",
			" * @returns {Object}\n",
			" */\n",
			"function " + _ENUM_CONSTRUCTOR_NAME + " (values) {\n",
			"    const enumObject = {};\n",
			"    for (const val of values) {\n",
			"        enumObject[val] = val;\n",
			"    }\n",
			"    return Object.freeze(enumObject);\n",
			"}\n",
			"\n",
			"/**\n",
			" * Constructor function for enums with different values.\n",
			" * @param {Map[String, Object]} values\n",
			" * @returns {Object}\n",
			" */\n",
			"function " + _DICT_ENUM_CONSTRUCTOR_NAME + " (values) {\n",
			"    const enumObject = {};\n",
			"    for ([key, value] of values) {\n",
			"        enumObject[key] = value;\n",
			"    }\n",
			"    return Object.freeze(enumObject);\n",
			"}\n",
		],
		[_DICT_ENUM_CONSTRUCTOR_NAME]
	)


def write_imports(imports: Dict[str, List[str]]) -> List[str]:
	"""Write imports as js imports."""
	return [
		"import { " + ", ".join(sorted(imports[file_])) + " } from './" + file_ + "';\n"
		for file_ in sorted(imports.keys())
	]


def write_doc(doc: str) -> List[str]:
	"""Write doc."""
	return [
		"/**\n",
		" * " + doc + "\n",
		" */\n",
	]


def write_exports(export_names: List[str]) -> str:
	"""Export a number of names."""
	return "export { " + ', '.join(export_names) + " };\n"


def write_js_file(
	file_path: str,
	module_doc: str,
	imports: Dict[str, List[str]],
	definitions: List[str],
	exports: List[str]
) -> None:
	"""Write a full js file, with imports, definitions and exports."""
	with open(file_path, 'wt', encoding='utf-8') as out_file:
		# module doc
		out_file.writelines(write_doc(module_doc))
		# imports
		if imports:
			out_file.write('\n')
			out_file.writelines(write_imports(imports))
		# content
		if definitions:
			out_file.write('\n')
			out_file.writelines(definitions)
		# exports
		if exports:
			out_file.write('\n')
			out_file.write(write_exports(exports))


def combine_definitions(
	definition_list: List[Tuple[Dict[str, List[str]], List[str], List[str]]]
) -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Combine several definitions to go into one file."""
	all_imports = {}
	all_definitions: List[str] = []
	all_exports = []

	for imports, definitions, exports in definition_list:
		for import_file, import_names in imports.items():
			if import_file not in all_imports:
				all_imports[import_file] = import_names
			else:
				all_imports[import_file] = list(set(all_imports[import_file] + import_names))
		if all_definitions:
			all_definitions.append("\n")
		all_definitions.extend(definitions)
		if any(export in all_exports for export in exports):
			raise KeyError(f"Duplicate export name(s): {[exp for exp in exports if exp in all_exports]}")
		all_exports.extend(exports)
	return all_imports, all_definitions, all_exports


def write_enum(enum: Type[Enum]) -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Write an enum definition."""
	if enum.__doc__:
		doc = write_doc(enum.__doc__)
	else:
		doc = []
	return (
		{'utils.py': [_ENUM_CONSTRUCTOR_NAME]},
		doc + [
			"const " + enum.__name__ + " = " + _ENUM_CONSTRUCTOR_NAME + "([" + ", ".join([
				"'" + enum_entry.name.capitalize() + "'" for enum_entry in enum
			]) + "]);\n"
		],
		[enum.__name__]
	)


def write_dict_enum(enum: Type[DynamicFrozenDictEnum]) -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Write an enum definition."""
	if not enum.is_initialised():
		raise ValueError(f"enum not initialized: {enum.__name__}")
	if enum.__doc__:
		doc = write_doc(enum.__doc__)
	else:
		doc = []
	exports = [enum.__name__]
	enum_values = list(enum.allowed_value_dict.values())
	if len(enum_values) == 0:
		raise ValueError(f"No values in enum: {enum.__name__}")
	if all(value is None for value in enum_values):
		# simple key-based enum
		return (
			{'utils.py': [_ENUM_CONSTRUCTOR_NAME]},
			doc + [
				"const " + enum.__name__ + " = " + _ENUM_CONSTRUCTOR_NAME + "([" + ", ".join([
					"'" + enum_entry.capitalize() + "'" for enum_entry in sorted(enum.allowed_value_dict.keys())
				]) + "]);\n"
			],
			exports
		)
	imports = {'utils.py': [_DICT_ENUM_CONSTRUCTOR_NAME]}
	if all(isinstance(value, str) for value in enum_values):
		# simple enum with string values
		return (
			imports,
			doc + [
				"const " + enum.__name__ + " = " + _DICT_ENUM_CONSTRUCTOR_NAME + "(new Map([[" + "], [".join([
					"'" + key.upper() + "', '" + value.capitalize() + "'"
					for key, value in enum.allowed_value_dict.items()
				]) + "]]));\n"
			],
			exports
		)
	if not all(isinstance(value, BaseModel) for value in enum_values):
		raise ValueError(f"Unknown enum value type: {type(enum_values[0])}")
	value_keys = list(enum_values[0].dict().keys())
	enum_value_name = enum_values[0].__class__.__name__.strip('_')
	enum_value_definitions = [
		"    ['" + key.replace('-', '_') + "', new " + enum_value_name + "(" + ", ".join([
			(str(val).lower() if isinstance(val, bool) else "'" + str(val).replace("'", "\\'") + "'")
			for value_key in value_keys
			for val in [value.dict()[value_key]]
		]) + ")]"
		for key, value in enum.allowed_value_dict.items()
	]
	enum_value_definitions = [
		definition + ("\n" if ind == (len(enum_value_definitions) - 1) else ",\n")
		for ind, definition in enumerate(enum_value_definitions)
	]
	return (
		imports,
		write_doc(enum_values[0].__doc__) + [
			"class " + enum_value_name + " {\n",
			"    constructor (" + ", ".join(value_keys) + ") {\n",
		] + [
			"        this." + key + " = " + key + ";\n" for key in value_keys
		] + [
			"    }\n",
			"}\n",
			"\n",
		] + doc + [
			"const " + enum.__name__ + " = " + _DICT_ENUM_CONSTRUCTOR_NAME + "(new Map([\n",
		] + enum_value_definitions + [
			"]));\n"
		],
		exports
	)


def write_basemodel_class_definition(class_name: str, model_class: Type[BaseModel]) -> Tuple[List[str], List[str]]:
	"""Write a simple pydantic BaseModel as js class."""
	if model_class.__doc__:
		doc = write_doc(model_class.__doc__)
	else:
		doc = []
	return doc + [
		"class " + class_name + " {\n",
		"    /**\n",
	] + [
		"     * @param {" + _python_to_js_type(
			field.outer_type_.__name__
		) + "} " + field.name + " " + field.field_info.description + "\n"
		for field in model_class.__fields__.values()
	] + [
		"     */\n",
		"    constructor (" + ", ".join([
			field.name + (
				" = " + ('undefined' if field.default is None else str(field.default))
				if not field.required
				else ""
			)
			for field in model_class.__fields__.values()
		]) + ") {\n",
	] + [
		"        this." + field.name + " = " + field.name + ";\n"
		for field in model_class.__fields__.values()
	] + [
		"    }\n",
		"};\n",
	], [class_name]


def _python_to_js_type(type_: str) -> str:
	"""Convert a python type to js."""
	return _remove_optional(type_).replace('str', 'String')


def _remove_optional(type_str: str) -> str:
	"""Remove all mentions of typing.Optional."""
	clean_str = type_str[:]
	match = re.search(r"Optional\[", clean_str)
	while match:
		closing_index = match.end()
		counter = 0
		while closing_index < len(clean_str):
			if clean_str[closing_index] == '[':
				counter += 1
			elif clean_str[closing_index] == ']':
				if counter == 0:
					break
				counter -= 1
			closing_index += 1
		clean_str = clean_str[:match.start()] + clean_str[match.end():closing_index] + clean_str[closing_index + 1:]
		match = re.search(r"Optional\[", clean_str)
	return clean_str
