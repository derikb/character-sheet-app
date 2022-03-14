"""Defines the domain of all spell-related definitions."""
from __future__ import annotations

import copy
import re
from enum import Enum
from typing import Any, Dict, List, Optional, Type, Union

from pydantic import Extra  # pylint: disable=unused-import
from pydantic import BaseModel, Field, root_validator, validator

from .backgrounds import Background
from .books import Book, BookReference
from .classes import Class
from .description import Description
from .general import Attribute, Condition, CreatureType, DamageType, Time
from .races import Race
from .util import DynamicFrozenDictEnum


class School(DynamicFrozenDictEnum[str]):
	"""School of a spell."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Initialise schools with abbreviation as key."""
		parser_file = args[0] if len(args) == 1 else kwargs['parser_file']
		abv_var_pattern = re.compile(r"Parser\.SKL_ABVS\s*=\s*\[\s*\n?((?:\s*\w+\s*,\s*\n?)+)\s*\];", re.MULTILINE)
		abv_to_full = {}

		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			# get list of ABV variable names
			all_lines = input_file.read()
			match = re.search(abv_var_pattern, all_lines)
			if match:
				abv_vars = re.split(r"\s*,\s*\n?\s*", match.group(1))[:-1]
			# get abbreviations and mapping to full name
			input_file.seek(0)
			abv_patterns = {
				var: re.compile(fr"{var}\s*=\s*\"([^\"]+)\";") for var in abv_vars
			}
			full_patterns = {
				var: re.compile(fr"Parser\.SP_SCHOOL_ABV_TO_FULL\[{var}\]\s*=\s*(\w+);") for var in abv_vars
			}
			abvs = {}
			full = {}
			for line in input_file.readlines():
				for var, abv_pattern in abv_patterns.items():
					match = re.match(abv_pattern, line)
					if match:
						abvs[var] = match.group(1)
						abv_patterns.pop(var)
						break
				for var, full_pattern in full_patterns.items():
					match = re.match(full_pattern, line)
					if match:
						full[var] = match.group(1)
						full_patterns.pop(var)
						break
				if (not abv_patterns) and (not full_patterns):
					break
			# find full names
			abv_to_full_patterns = {}
			if any(var for var in full if var not in abvs):
				KeyError(f"Can't find abbreviations for schools {var for var in full if var not in abvs}.")
			for var, abv in abvs.items():
				if var not in full:
					raise KeyError(f"Can't find full name for school abv. {abv}.")
				abv_to_full_patterns[abv] = re.compile(fr"{full[var]}\s*=\s*\"(\w+)\";")
			input_file.seek(0)
			for line in input_file.readlines():
				for abv, pattern in abv_to_full_patterns.items():
					match = re.match(pattern, line)
					if match:
						abv_to_full[abv] = match.group(1)
						abv_to_full_patterns.pop(abv)
						break
				if not abv_to_full_patterns:
					break
		cls._set_allowed_values(abv_to_full)

	def __init__(self, key: str):
		"""Set full name of school."""
		self._name = self.allowed_value_dict[key]
		super().__init__(key)

	@property
	def name(self) -> str:
		"""Full school name as property."""
		return self._name


class RangeType(str, Enum):
	"""Type (shape) of spell range."""

	CONE = 'cone'
	CUBE = 'cube'
	HEMISPHERE = 'hemisphere'
	LINE = 'line'
	POINT = 'point'
	RADIUS = 'radius'
	SPHERE = 'sphere'
	SPECIAL = 'special'


class DistanceType(str, Enum):
	"""Type of distance."""

	FEET = 'feet'
	MILES = 'miles'
	SELF = 'self'
	SIGHT = 'sight'
	TOUCH = 'touch'
	UNLIMITED = 'unlimited'


class Distance(BaseModel, extra=Extra.forbid):
	"""Distance for spell casting."""

	distance_type: DistanceType = Field(alias='type')
	amount: Optional[int] = None


class Range(BaseModel, extra=Extra.forbid):
	"""Range of a spell."""

	range_type: RangeType = Field(alias='type')
	distance: Optional[Distance] = None

	# pylint: disable=no-self-argument
	@root_validator
	def check_distance_defined_if_not_special(cls: Type[Range], values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Verify that distance is not None if not special."""
		if values.get('distance') is None and values.get('range_type') != 'special':
			raise ValueError(f"Distance is None, but range_type is not 'special' for range {values}")
		return values


class MaterialComponent(BaseModel, extra=Extra.forbid):
	"""Material component required for a spell."""

	text: str
	cost: int = 0
	consume: bool = False

	# pylint: disable=no-self-argument
	@validator('consume', pre=True)
	def make_consume_bool(cls: Type[MaterialComponent], value: Union[bool, str]) -> bool:  # type: ignore
		"""Ensure consume is not a string."""
		if isinstance(value, str):
			return False
		return value


class SpellComponents(BaseModel, extra=Extra.forbid):
	"""Components of a spell, with booleans or a subclass for uniformity."""

	verbal: bool = Field(False, alias='v')
	somatic: bool = Field(False, alias='s')
	material: Optional[MaterialComponent] = Field(None, alias='m')
	royalty: bool = Field(False, alias='r')

	# pylint: disable=no-self-argument
	@validator('material', pre=True)
	def wrap_material_text_if_str(  # type: ignore
		cls: Type[SpellComponents], value: Union[str, Dict[str, Any]]
	) -> Dict[str, Any]:
		"""Wrap material component in case it's just a str."""
		if isinstance(value, str):
			return {'text': value}
		return value


class DurationType(str, Enum):
	"""Modality of spell duration."""

	INSTANT = 'instant'
	PERMANENT = 'permanent'
	SPECIAL = 'special'
	TIMED = 'timed'


class SpellDuration(BaseModel, extra=Extra.forbid):
	"""Duration of spell effect."""

	duration_type: DurationType = Field(alias='type')
	time: Optional[Time] = Field(None, alias='duration')
	concentration: bool = False
	ends: Optional[List[str]] = None
	condition: Optional[str] = None

	# pylint: disable=no-self-argument
	@validator('time', pre=True)
	def rename_time_args(cls: Type[SpellDuration], value: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Construct time for renaming of keys, custom."""
		new_value = {
			'number': value.pop('amount', None), 'unit': value.pop('type', None), 'up_to': value.pop('upTo', False)
		}
		if value:
			raise ValueError(f"extra fields: {list(value.keys())}")
		return new_value


class AttackType(DynamicFrozenDictEnum[str]):
	"""Attack types."""

	@classmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Get attack types from parser file."""
		parser_file = args[0] if len(args) == 1 else kwargs['parser_file']
		attack_type_pattern = re.compile(r"Parser\.SPELL_ATTACK_TYPE_TO_FULL\[\"([^\"]+)\"\]\s*=\s*\"([^\"]+)\";")
		abv_to_full = {}

		with open(parser_file, 'rt', encoding='utf-8') as input_file:
			for line in input_file.readlines():
				match = re.match(attack_type_pattern, line)
				if match:
					abv_to_full[match.group(1)] = match.group(2)

		cls._set_allowed_values(abv_to_full)

	def __init__(self, key: str):
		"""Set full name of attack type."""
		self._name = self.allowed_value_dict[key]
		super().__init__(key)

	@property
	def name(self) -> str:
		"""Full attack type name as property."""
		return self._name


class Damage(BaseModel, extra=Extra.forbid):
	"""Damage inflicted by the spell."""

	damage_types: List[DamageType]
	attack_types: List[AttackType]


class EldritchInvocation(BaseModel, extra=Extra.forbid):
	"""Eldritch invocation."""

	name: str
	source: Book


class Spell(BaseModel, extra=Extra.forbid):
	"""Domain representation of a spell."""

	name: str									# name of the spell
	sources: List[BookReference]				# source material defining the spell (first is main source)
	min_level: int								# minimal level required to cast
	school: School								# school of the spell
	cast_times: List[Time]						# Time it takes to cast a spell
	spell_range: Range							# range (and shape) of the spell
	components: SpellComponents					# components required for casting
	durations: List[SpellDuration]				# duration(s) of the spell's effects
	description: Description					# description of the spell
	higher_level_description: Optional[str]		# description for higher levels
	classes: Optional[List[Class]]				# classes that can use this spell
	races: Optional[List[Race]]					# races that can use this spell
	backgrounds: Optional[List[Background]]		# backgrounds that can use this spell
	conditions_inflicted: List[Condition]		# conditions inflicted on spell target
	conditions_immune: List[Condition]			# conditions for which spell grants immunity
	saving_throws: List[Attribute]				# saving throws
	creatures_affected: List[CreatureType]		# creature types that can be affected
	damage: Damage								# damage inflicted by the spell
	damage_resist: List[DamageType]				# resistances granted by the spell
	damage_immune: List[DamageType]				# Immunities granted by the spell
	ability_check: List[Attribute]				# check required for cast
	srd_name: Optional[str]						# whether the spell is available in the System Reference Document
	eldritch_invocations: Optional[				# eldritch invocations
		List[EldritchInvocation]
	]

	@classmethod
	def from_raw(cls, raw: Dict[str, Any]) -> Spell:
		"""Construct a spell from raw dict."""
		raw_spell = copy.deepcopy(raw)
		# throw away these fields (for now)
		raw_spell.pop('miscTags', None)
		raw_spell.pop('areaTags', None)
		raw_spell.pop('hasFluff', None)
		raw_spell.pop('hasFluffImages', None)
		raw_spell.pop('scalingLevelDice', None)
		raw_spell.pop('meta', None)
		raw_spell.pop('basicRules', None)
		raw_spell.pop('damageVulnerable', None)
		spell_name = raw_spell.pop('name', None)
		srd = raw_spell.pop('srd', False)
		spell = Spell(
			name=spell_name,
			sources=[
				{'source': raw_spell.pop('source', None), 'page': raw_spell.pop('page', None)}
			] + raw_spell.pop('otherSources', []) + raw_spell.pop('additionalSources', []),
			min_level=raw_spell.pop('level', None),
			school=raw_spell.pop('school', None),
			cast_times=raw_spell.pop('time', None),
			spell_range=raw_spell.pop('range', None),
			components=raw_spell.pop('components', None),
			durations=raw_spell.pop('duration', None),
			description=raw_spell.pop('entries', []),
			higher_level_description=(
				raw_spell.pop('entriesHigherLevel')[0]['entries'][0] if 'entriesHigherLevel' in raw_spell else None
			),
			classes=[
				class_ for class_list in raw_spell.pop('classes').values() for class_ in class_list
			] if 'classes' in raw_spell else None,
			races=raw_spell.pop('races', None),
			backgrounds=raw_spell.pop('backgrounds', None),
			conditions_inflicted=raw_spell.pop('conditionInflict', []),
			conditions_immune=raw_spell.pop('conditionImmune', []),
			saving_throws=raw_spell.pop('savingThrow', []),
			creatures_affected=raw_spell.pop('affectsCreatureType', []),
			damage=Damage(damage_types=raw_spell.pop('damageInflict', []), attack_types=raw_spell.pop('spellAttack', [])),
			damage_resist=raw_spell.pop('damageResist', []),
			damage_immune=raw_spell.pop('damageImmune', []),
			ability_check=raw_spell.pop('abilityCheck', []),
			srd_name=None if not srd else (srd if isinstance(srd, str) else spell_name),
			eldritch_invocations=raw_spell.pop('eldritchInvocations', None),
		)
		if raw_spell:
			raise ValueError(f"Unused field(s) {list(raw_spell.keys())}\nfrom {raw}")
		del raw_spell
		return spell


def initialise_spells(parser_file: str) -> None:
	"""Initialise spell-related dynamic enums."""
	if not School.is_initialised():
		School.initialise(parser_file)
	if not AttackType.is_initialised():
		AttackType.initialise(parser_file)
