"""Module with helper functions to write javascript files."""
import re
from enum import Enum
from typing import Dict, Iterable, List, Tuple, Type, TypeVar

from pydantic import BaseModel

from domain.util import DynamicFrozenDictEnum
from domain.description import HTMLConvertible


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
			"    for (const [key, value] of values.entries()) {\n",
			"        enumObject[key] = value;\n",
			"    }\n",
			"    return Object.freeze(enumObject);\n",
			"}\n",
		],
		[_ENUM_CONSTRUCTOR_NAME, _DICT_ENUM_CONSTRUCTOR_NAME]
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
	all_imports: Dict[str, List[str]] = {}
	all_definitions: List[str] = []
	all_exports = []

	for imports, definitions, exports in definition_list:
		all_imports = _combine_imports(all_imports, imports)
		if all_definitions:
			all_definitions.append("\n")
		all_definitions.extend(definitions)
		if any(export in all_exports for export in exports):
			raise KeyError(f"Duplicate export name(s): {[exp for exp in exports if exp in all_exports]}")
		all_exports.extend(exports)
	return all_imports, all_definitions, all_exports


def _combine_imports(imports_1: Dict[str, List[str]], imports_2: Dict[str, List[str]]) -> Dict[str, List[str]]:
	"""Combine imports without duplicates or overwriting."""
	combined = imports_1.copy()
	for file_, names in imports_2.items():
		combined[file_] = list(set(combined.get(file_, []) + names))
	return combined


def write_enum(enum: Type[Enum]) -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Write an enum definition."""
	if enum.__doc__:
		doc = write_doc(enum.__doc__)
	else:
		doc = []
	return (
		{'utils.js': [_ENUM_CONSTRUCTOR_NAME]},
		doc + [
			"const " + enum.__name__ + " = " + _ENUM_CONSTRUCTOR_NAME + "([" + ", ".join([
				"'" + _normalise_enum_key(enum_entry.name.capitalize()) + "'" for enum_entry in enum
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
			{'utils.js': [_ENUM_CONSTRUCTOR_NAME]},
			doc + [
				"const " + enum.__name__ + " = " + _ENUM_CONSTRUCTOR_NAME + "([" + ", ".join([
					"'" + _normalise_enum_key(enum_entry.capitalize()) + "'"
					for enum_entry in sorted(enum.allowed_value_dict.keys())
				]) + "]);\n"
			],
			exports
		)
	imports = {'utils.js': [_DICT_ENUM_CONSTRUCTOR_NAME]}
	if all(isinstance(value, str) for value in enum_values):
		# simple enum with string values
		return (
			imports,
			doc + [
				"const " + enum.__name__ + " = " + _DICT_ENUM_CONSTRUCTOR_NAME + "(new Map([[" + "], [".join([
					"'" + _normalise_enum_key(key.upper()) + "', '" + value.capitalize() + "'"
					for key, value in enum.allowed_value_dict.items()
				]) + "]]));\n"
			],
			exports
		)
	if not all(isinstance(value, BaseModel) for value in enum_values):
		raise ValueError(f"Unknown enum value type: {type(enum_values[0])}")
	value_keys = list(enum_values[0].dict().keys())
	enum_value_name = _get_enum_value_name(enum_values[0])
	enum_value_definitions = [
		"    ['" + _normalise_enum_key(key) + "', new " + enum_value_name + "(" + ", ".join([
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
			"        this." + _normalise_enum_key(key) + " = " + key + ";\n" for key in value_keys
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


def _get_enum_value_name(obj: object) -> str:
	"""Get the name of a class to represent dict enum values."""
	return _escape_js_global_names(obj.__class__.__name__.strip('_'))


def write_basemodel_class_definition(
	class_name: str, model_class: Type[BaseModel]
) -> Tuple[Dict[str, List[str]], List[str], List[str]]:
	"""Write a simple pydantic BaseModel as js class."""
	if model_class.__doc__:
		doc = write_doc(model_class.__doc__)
	else:
		doc = []
	return {}, doc + [
		"class " + class_name + " {\n",
		"    /**\n",
	] + [
		"     * @param {" + _python_to_js_type(
			field.outer_type_
		) + "} " + _escape_js_global_names(field.name) + (
			" " + field.field_info.description if field.field_info.description else ""
		) + "\n"
		for field in model_class.__fields__.values()
	] + [
		"     */\n",
		"    constructor ({ " + ", ".join([
			_escape_js_global_names(field.name) + (
				" = " + _python_to_js_value(field.default)
				if not field.required
				else ""
			)
			for field in model_class.__fields__.values()
		]) + " }) {\n",
	] + [
		"        this." + _escape_js_global_names(field.name) + " = " + _escape_js_global_names(field.name) + ";\n"
		for field in model_class.__fields__.values()
	] + [
		"    }\n",
		"};\n",
	], [class_name]


def _python_to_js_type(type_: Type[object]) -> str:
	"""Convert a python type to js."""
	def _process_basic_type(basic_type: str) -> str:
		return _remove_optional(basic_type).replace('str', 'String')
	if str(type_).startswith("typing.List"):
		return _process_basic_type(str(type_)[12:-1].split('.')[-1]) + "[]"
	return _process_basic_type(type_.__name__)


def _python_to_js_value(value: object) -> str:
	"""Convert a python value to js value string."""
	if value is None:
		return 'null'
	if isinstance(value, bool):
		return str(value).lower()
	return str(value)


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


ObjectType = TypeVar('ObjectType')


def write_object_list(
	objects: Iterable[ObjectType], object_class: Type[ObjectType], list_name: str
) -> Tuple[Dict[str, List[str]], List[str], List[str], int]:
	"""Write a list of objects, with the correct instantiation."""
	norm_list_name = _escape_js_global_names(list_name)
	imports: Dict[str, List[str]] = {}
	definitions = write_doc("List of " + object_class.__name__ + " instances.")
	definitions += ["const " + norm_list_name + " = [\n"]
	n_objs = 0
	if objects:
		for obj in objects:
			obj_imports, obj_definitions = _instantiate_class_recursive(
				obj, _get_js_module_name(obj), indent_size=1, inline=False, multiline=True)
			imports = _combine_imports(imports, obj_imports)
			obj_definitions = obj_definitions + ","  # add comma at end
			definitions += [line + "\n" for line in obj_definitions.split("\n")]
			n_objs += 1
	definitions[-1] = definitions[-1][:-2] + "\n"  # remove comma after last item
	definitions += "];\n"
	return imports, definitions, [norm_list_name], n_objs


_PRIMITIVES_TO_JS_FORMAT = {
	int: "{:d}",
	float: "{:f}",
	bool: "{:r}",
	type(None): "null",
}


def _instantiate_class_recursive(
	obj: ObjectType, base_module_name: str, indent_size: int = 0, inline: bool = False, multiline: bool = True
) -> Tuple[Dict[str, List[str]], str]:
	single_indent = "" if inline else "    "
	indent = single_indent * indent_size
	sub_indent_size = indent_size + (1 if multiline else 0)
	bare_separator = "\n" + "    " * indent_size if multiline else ""
	item_separator = ",\n" + "    " * sub_indent_size if multiline else ", "
	brace_space = "" if multiline else " "

	# try primitive types
	if isinstance(obj, str) and not isinstance(obj, Enum) and not isinstance(obj, DynamicFrozenDictEnum):
		return {}, indent + "'{:s}'".format(_escape_js_string(obj))
	for type_, format_ in _PRIMITIVES_TO_JS_FORMAT.items():
		if isinstance(obj, type_):
			return {}, indent + format_.format(obj)

	# list
	if isinstance(obj, list):
		imports: Dict[str, List[str]] = {}
		list_definitions = []
		for item in obj:
			item_imports, item_definitions = _instantiate_class_recursive(
				item, base_module_name, indent_size=sub_indent_size, inline=not multiline, multiline=False
			)
			imports = _combine_imports(imports, item_imports)
			list_definitions.append(item_definitions)
		return (
			imports,
			indent + "[" + bare_separator + single_indent + item_separator.join(list_definitions) + bare_separator + "]"
		)

	# HTMLConvertible
	if isinstance(obj, HTMLConvertible):
		return {}, indent + "'" + _escape_js_string(obj.to_html(indent_level=0)) + "'"

	# enum
	if isinstance(obj, DynamicFrozenDictEnum) or isinstance(obj, Enum):
		return (
			_get_object_import(obj, base_module_name),
			indent + obj.__class__.__name__ + '.' + _normalise_enum_key(obj.value)
		)

	# Other classes
	definitions = indent + "new " + obj.__class__.__name__ + "({" + brace_space + bare_separator + single_indent
	imports = {}
	obj_definitions = []
	for attribute in vars(obj):
		if not attribute.startswith('_'):
			attr_imports, attr_definition = _instantiate_class_recursive(
				getattr(obj, attribute), base_module_name, indent_size=sub_indent_size, inline=True, multiline=False
			)
			imports = _combine_imports(imports, attr_imports)
			if attr_definition != 'null':
				obj_definitions.append(_escape_js_global_names(attribute) + ": " + attr_definition)
	definitions += item_separator.join(obj_definitions) + bare_separator + brace_space + "})"

	imports = _combine_imports(imports, _get_object_import(obj, base_module_name))

	return imports, definitions


def _escape_js_string(js_string: str) -> str:
	"""Escape special characters for js string (with single quotes)."""
	return js_string.replace("'", "\\'").replace("\n", "\\n").replace("\t", "\\t")


def _get_js_module_name(obj: object) -> str:
	"""Construct a js module name from a python object."""
	return obj.__module__.lower().split('.')[-1] + '.js'


def _escape_js_global_names(variable_name: str) -> str:
	"""Avoid overriding js globals like 'name'."""
	if variable_name == 'name':
		return variable_name + '_'
	return variable_name


def _get_object_import(obj: object, base_module_name: str) -> Dict[str, List[str]]:
	"""Create an import if object definition is imported from different module."""
	module_name = _get_js_module_name(obj)
	if module_name != base_module_name:
		return {module_name: [obj.__class__.__name__]}
	return {}


def _normalise_enum_key(key: str) -> str:
	return key.replace('-', '_')
