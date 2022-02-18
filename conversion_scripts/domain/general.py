"""Defines the domain of miscellaneous general stuff (should not import other domain modules)."""
from __future__ import annotations

from enum import Enum


class TimeUnit(str, Enum):
	"""Unit in which duration can be defined."""

	MINUTE = 'minute'
	HOUR = 'hour'
	DAY = 'day'
	ACTION = 'action'
	REACTION = 'reaction'
	BONUS = 'bonus'
	ROUND = 'round'
