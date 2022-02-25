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


Description = Union[str, DescriptionEntries, DescriptionQuote, DescriptionInset, DescriptionTable, DescriptionList]

DescriptionEntries.update_forward_refs()
DescriptionQuote.update_forward_refs()
DescriptionInset.update_forward_refs()
RecursiveDescriptionListItem.update_forward_refs()
