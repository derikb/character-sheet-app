"""Defines the domain of descriptions, as a recursive union of various types."""
from __future__ import annotations

import re
from enum import Enum
from typing import Any, Dict, List, Optional, Union

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field, root_validator, validator

from .books import Book


class DescriptionEntries(BaseModel, extra=Extra.forbid):
	"""More detailed description entry."""

	entries: List[Description]
	name: str

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_type(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether the type is correct."""
		entry_type = values.pop('type', None)
		if entry_type != 'entries':
			raise ValueError(f"Wrong type for description entries: '{entry_type}'")
		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as a list of paragraphs."""
		indent = "\t" * indent_level
		html = indent + ("<b>" + self.name + "</b>\n" if self.name else "")
		for entry in self.entries:
			html += indent + "<p>\n" + (
				indent + "\t" + entry + "\n"
				if isinstance(entry, str)
				else entry.to_html(indent_level + 1)
			) + indent + "</p>\n"
		return html


class DescriptionQuote(BaseModel, extra=Extra.forbid):
	"""A citation in the description."""

	entries: List[Description]
	author: str = Field(alias='by')

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_type(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether the type is correct."""
		entry_type = values.pop('type', None)
		if entry_type != 'quote':
			raise ValueError(f"Wrong type for description quote: '{entry_type}'")
		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an indented list of paragraphs, followed by an attribution."""
		indent = "\t" * indent_level
		html = indent + "\"\n" + indent + "<i>\n"
		prefix = (indent + "<p>\n" if len(self.entries) > 1 else "")
		postfix = (indent + "</p>\n" if len(self.entries) > 1 else "")
		for entry in self.entries:
			html += prefix + (
				indent + entry + "\n"
				if isinstance(entry, str)
				else entry.to_html(indent_level)
			) + postfix
		html += indent + "</i>\n" + indent + "\"\n"
		html += indent + ("<p>— " + self.author + "</p>\n" if self.author else "")
		return html


class DescriptionInset(BaseModel, extra=Extra.forbid):
	"""An inset into a description."""

	entries: List[Description]
	name: str
	source: Book
	page: int

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_type(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether the type is correct."""
		entry_type = values.pop('type', None)
		if entry_type != 'inset':
			raise ValueError(f"Wrong type for description inset: '{entry_type}'")
		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an inset box."""
		indent = "\t" * indent_level
		html = indent + "<p style=\"padding: 2px; border: 2px solid;\">\n"
		html += indent + "\t<b>" + self.name + "</b> (" + self.source.abbreviation + " p." + str(self.page) + ")\n"
		for entry in self.entries:
			html += (
				indent + "\t" + entry + "\n"
				if isinstance(entry, str)
				else entry.to_html(indent_level + 1)
			)
		html += indent + "</p>\n"
		return html


class TextAlignment(str, Enum):
	"""Text alignment."""

	LEFT = 'left'
	CENTER = 'center'


class DescriptionTableColumnStyle(BaseModel, extra=Extra.forbid):
	"""Style of a table column."""

	width: int
	alignment: TextAlignment = Field(TextAlignment.LEFT, alias='align')


class TableCell(BaseModel, extra=Extra.forbid):
	"""Cell in a description table."""

	value: str

	# pylint: disable=no-self-argument
	@validator('value', pre=True)
	def convert_cell_to_str(cls, value: Union[str, Dict[str, Any]]) -> str:
		"""Convert a cell to str in case it is a dict."""
		if isinstance(value, str):
			return value

		if isinstance(value, dict):
			if value.get('type') != 'cell':
				raise ValueError(f"table cell type unrecognised: {value.get('type')} in table cell {value}.")
			if list(value.keys()) != ['type', 'roll']:
				raise ValueError(f"table cell with unrecognised keys: {value}.")
			roll = value['roll']
			roll.pop('pad', None)
			if list(roll.keys()) not in [['exact'], ['min', 'max']]:
				raise ValueError(f"table cell roll with unrecognised keys: {roll} in table cell {value}.")
			if 'exact' in roll:
				return str(roll['exact'])
			return str(roll['min']) + '-' + str(roll['max'])

		raise ValueError(f"Table cell with unrecognised type: '{value}' ({type(value)})")

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string."""
		return "\t" * indent_level + self.value + "\n"


DESCRIPTION_TABLE_COLUMN_STYLE_PATTERN = re.compile(
	r'\s*col-(?P<width>\d+)\s*(text-)?(?P<align>' + r'|'.join([align.value for align in TextAlignment]) + r')?\s*'
)


class DescriptionTable(BaseModel, extra=Extra.forbid):
	"""Description entry with table format."""

	caption: Optional[str] = None
	headers: List[str] = Field(alias='colLabels')
	column_styles: List[DescriptionTableColumnStyle] = Field(alias='colStyles')
	rows: List[List[TableCell]]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_n_columns_consistency(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether all fields have the same number of columns."""
		entry_type = values.pop('type', '')
		if entry_type != 'table':
			raise ValueError(f"Description table with wrong type: '{entry_type}'")

		header_len = len(values.get('colLabels', []))
		styles_len = len(values.get('colStyles', []))
		if header_len != styles_len:
			raise ValueError(
				f"length of headers ({header_len}) does not match length of styles "
				f"({styles_len}) in DescriptionTable {values}"
			)
		rows = values.pop('rows', [])
		for ind, row in enumerate(rows):
			if len(row) != styles_len:
				raise ValueError(
					f"lenght of row {ind} ({len(row)}) does not match length of styles "
					f"({styles_len}) in DescriptionTable {values}"
				)
		return dict({'rows': [[{'value': cell} for cell in row] for row in rows]}, **values)

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
			content_html += indent + "\t\t<th style=\"" + border_style + "\">" + header + "</th>\n"
			col_widths[col_ind] = max(col_widths[col_ind], len(header) + 1)
		content_html += indent + "\t</tr>\n"

		for row in self.rows:
			content_html += indent + "\t<tr>\n"
			for col_ind, cell in enumerate(row):
				content_html += indent + "\t\t<td style=\"" + border_style + "\">\n"
				cell_content = cell.to_html(indent_level + 3)
				content_html += cell_content
				col_widths[col_ind] = max(
					col_widths[col_ind],
					max(len(line.lstrip("\t")) for line in cell_content.split("\n")) + 1
				)
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


class RecursiveDescriptionListItem(BaseModel, extra=Extra.forbid):
	"""Item in a description list."""

	name: str
	entries: List[Description]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_type(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether the type of list item is recognised."""
		item_type = values.pop('type', None)
		if item_type != 'item':
			raise ValueError(f"Unknown list item type: '{item_type}'")
		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string."""
		html = ""
		indent = "\t" * indent_level
		for entry in self.entries:
			html += indent + "<p>\n"
			html += (
				indent + "\t" + entry + "\n"
				if isinstance(entry, str)
				else entry.to_html(indent_level + 1)
			)
			html += indent + "</p>\n"
		return html


DescriptionListItem = Union[str, RecursiveDescriptionListItem]


class DescriptionList(BaseModel, extra=Extra.forbid):
	"""Description entry with list format."""

	items: List[DescriptionListItem]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def check_type_and_style(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether all fields have the same number of columns."""
		list_type = values.pop('type', None)
		if list_type != 'list':
			raise ValueError(f"Description list with wrong type: '{list_type}'")

		style = values.pop('style', 'single')
		if style not in ('single', 'list-hang-notitle'):
			raise ValueError(f"Unknown list style '{style}'")

		return values

	def to_html(self, indent_level: int = 0) -> str:
		"""Convert self to html string as an unordered list."""
		indent = "\t" * indent_level
		html = indent + "<ul>\n"
		for item in self.items:
			html += indent + "\t<li>\n"
			html += (
				indent + "\t\t" + item + "\n"
				if isinstance(item, str)
				else item.to_html(indent_level + 2)
			)
			html += indent + "\t</li>\n"
		html += indent + "</ul>\n"
		return html


Description = Union[str, DescriptionEntries, DescriptionQuote, DescriptionInset, DescriptionTable, DescriptionList]

DescriptionEntries.update_forward_refs()
DescriptionQuote.update_forward_refs()
DescriptionInset.update_forward_refs()
RecursiveDescriptionListItem.update_forward_refs()
