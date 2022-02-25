"""Defines the domain of race definitions."""
from __future__ import annotations

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel

from .books import Book


class Background(BaseModel, extra=Extra.forbid):
	"""Definition of a background."""

	name: str
	source: Book
