"""Defines the domain of background definitions."""
from __future__ import annotations

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field

from .books import Book


class Background(BaseModel, extra=Extra.forbid):
	"""Definition of a background."""

	name: str = Field(description="Background name.")
	source: Book = Field(description="Source book that defines the background.")
