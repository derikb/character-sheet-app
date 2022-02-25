"""Defines the domain of miscellaneous general stuff (should not import other domain modules)."""
from __future__ import annotations

import re
from enum import Enum
from typing import Dict, Optional

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel

from .util import DynamicFrozenDictEnum


class TimeUnit(str, Enum):
	"""Unit in which duration can be defined."""

	MINUTE = 'minute'
	HOUR = 'hour'
	DAY = 'day'
	ACTION = 'action'
	REACTION = 'reaction'
	BONUS = 'bonus'
	ROUND = 'round'


class Time(BaseModel, extra=Extra.forbid):
	"""Abstract time duration."""

	number: int
	unit: TimeUnit
	condition: Optional['str']
	up_to: bool = False


class Condition(DynamicFrozenDictEnum):
	"""Condition inflicted on a character."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Extract conditions from parser file."""
		parser_file = args[0] if len(args) == 1 else kwargs['parser_file']
		conditions_pattern = re.compile(r"Parser\.CONDITIONS\s*=\s*\[\"(.*)\"\];")

		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			for line in input_file.readlines():
				match = re.match(conditions_pattern, line)
				if match:
					conditions = re.split(r"\"\s*,\s*\"", match.group(1))

		cls._set_allowed_values({condition: None for condition in conditions})


class Attribute(str, Enum):
	"""Basic attributes."""

	STRENGTH = 'strength'
	DEXTERITY = 'dexterity'
	CONSTITUTION = 'constitution'
	INTELLIGENCE = 'intelligence'
	WISDOM = 'wisdom'
	CHARISMA = 'charisma'


class CreatureType(DynamicFrozenDictEnum):
	"""Types of creatures."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Extract creature type from parser file."""
		parser_file = args[0] if len(args) == 1 else kwargs['parser_file']
		creatures_pattern = re.compile(r"Parser\.MON_TYPES\s*=\s*\[([^\]]+)\];")

		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			# get list of variables
			for line in input_file.readlines():
				match = re.match(creatures_pattern, line)
				if match:
					creature_variables = re.split(r"\s*,\s*", match.group(1))
			# get variable definitions
			input_file.seek(0)
			variable_patterns = {var: fr"{var}\s*=\s*\"([^\"]+)\";" for var in creature_variables}
			variables_found: Dict[str, None] = {}
			for line in input_file.readlines():
				for var, pattern in variable_patterns.items():
					match = re.match(pattern, line)
					if match:
						variables_found[match.group(1)] = None
						variable_patterns.pop(var)
						break
				if not variable_patterns:
					break

		cls._set_allowed_values(variables_found)


class DamageType(DynamicFrozenDictEnum):
	"""Damage type inflicted."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Extract damage types from parser file."""
		parser_file = args[0] if len(args) == 1 else kwargs['parser_file']
		damage_pattern = re.compile(r"Parser\.DMG_TYPES\s*=\s*\[\"(.*)\"\];")

		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			for line in input_file.readlines():
				match = re.match(damage_pattern, line)
				if match:
					damage_types = re.split(r"\"\s*,\s*\"", match.group(1))

		cls._set_allowed_values({damage_type: None for damage_type in damage_types})


def initialise_general(parser_file: str) -> None:
	"""Extract useful data from the 5etools parser file."""
	if not Condition.is_initialised():
		Condition.initialise(parser_file)
	if not CreatureType.is_initialised():
		CreatureType.initialise(parser_file)
	if not DamageType.is_initialised():
		DamageType.initialise(parser_file)
