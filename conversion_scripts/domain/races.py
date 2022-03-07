"""Defines the domain of race definitions."""
from __future__ import annotations

from typing import Optional

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field

from .books import Book


class Race(BaseModel, extra=Extra.forbid):
	"""Full definition of a race (with optional base race)."""

	name: str = Field(description="Name of the race.")
	source: Book = Field(description="Source book in which race is defined.")
	base_name: Optional[str] = Field(None, alias='baseName', description="Name of the base race.")
	base_source: Optional[Book] = Field(None, alias='baseSource', description="Source of the base race.")
