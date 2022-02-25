"""Defines the domain of race definitions."""
from __future__ import annotations

from typing import Optional

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field

from .books import Book


class Race(BaseModel, extra=Extra.forbid):
	"""Full definition of a race."""

	name: str
	source: Book
	base_name: Optional[str] = Field(None, alias='baseName')
	base_source: Optional[Book] = Field(None, alias='baseSource')
