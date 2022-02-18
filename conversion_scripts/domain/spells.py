"""Defines the domain of all spell-related definitions."""
from __future__ import annotations

from enum import Enum


class School(str, Enum):
	"""School of a spell."""

	ABJURATION = 'A'
	CONJURATION = 'C'
	DIVINATION = 'D'
	ENCHANTMENT = 'E'
	EVOCATION = 'V'
	ILLUSION = 'I'
	NECROMANCY = 'N'
	PSIONIC = 'P'
	TRANSMUTATION = 'T'
