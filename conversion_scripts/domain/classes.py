"""Defines the domain of class definitions."""
from __future__ import annotations

from typing import Any, Dict, Optional, Type

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field, root_validator

from .books import Book


class ClassDescription(BaseModel, extra=Extra.forbid):
	"""Description of a class or subclass."""

	name: str
	source: Book

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def drop_defined_in_source(cls: Type[ClassDescription], values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Drop the definedInSource."""
		values.pop('definedInSource', None)
		return values


class ClassDefinition(BaseModel, extra=Extra.forbid):
	"""Full definition of a class with possible subclass."""

	main_class: ClassDescription = Field(alias='class')
	sub_class: Optional[ClassDescription] = Field(None, alias='subclass')
	sub_sub_class: Optional[str] = None

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def reassign_sub_sub_class_and_wrap_if_open(  # type: ignore
		cls: Type[ClassDefinition], values: Dict[str, Any]
	) -> Dict[str, Any]:
		"""Wrap main class if bare, and reassign subsubclass."""
		if 'name' in values:
			return {'class': values}
		if 'subclass' not in values:
			return values
		if 'subSubclass' not in values['subclass']:
			return values
		subsubclass = values['subclass'].pop('subSubclass')
		return dict({'sub_sub_class': subsubclass}, **values)
