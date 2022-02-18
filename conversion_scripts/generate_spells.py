"""Use a local clone of 5etools with spell definitions in JSON format to generate javascript definitions."""
from __future__ import annotations

import copy
import json
import os
import re
from enum import Enum
from typing import Any, List, Dict, Iterable, Optional, Type, Union

from pydantic import (  # pylint: disable=unused-import
	Field, ValidationError, BaseModel, validator, root_validator, Extra
)
from pydantic.error_wrappers import ErrorWrapper

from domain.books import Book, BookReference, initialise_books
from domain.general import TimeUnit
from domain.spells import School


EXTERNAL_5ETOOLS_MIRROR = os.path.join('/home', 'ephron', 'Projects', '5etools-mirror-1.github.io')


# Initialise dependent definitions
initialise_books(
	official_books_file=os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'data', 'books.json'),
	books_parser_file=os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'js', 'parser.js'),
)


def _make_pydantic_error(message: str, model: Type[BaseModel]) -> ValidationError:
	"""Wrap the unwieldy way to create a custom pydantic ValidationError."""
	wrapper = ErrorWrapper(ValueError(message), '')
	return ValidationError([wrapper], model)


class Time(BaseModel, extra=Extra.forbid):
	"""Abstract time duration."""

	number: int
	unit: TimeUnit
	condition: Optional['str']
	up_to: bool = False


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
		new_value = {'number': value.pop('amount', None), 'unit': value.pop('type', None), 'up_to': value.pop('upTo', False)}
		if value:
			raise ValueError(f"extra fields: {list(value.keys())}")
		return new_value


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


class Race(BaseModel, extra=Extra.forbid):
	"""Full definition of a race."""

	name: str
	source: Book
	base_name: Optional[str] = Field(None, alias='baseName')
	base_source: Optional[Book] = Field(None, alias='baseSource')


class Background(BaseModel, extra=Extra.forbid):
	"""Definition of a background."""

	name: str
	source: Book


class Condition(str, Enum):
	"""Condition inflicted on target."""

	CHARMED = 'charmed'
	INVISIBLE = 'invisible'
	DEAFENED = 'deafened'
	RESTRAINED = 'restrained'
	BLINDED = 'blinded'
	EXHAUSTION = 'exhaustion'
	FRIGHTENED = 'frightened'
	GRAPPLED = 'grappled'
	INCAPACITATED = 'incapacitated'
	PARALYZED = 'paralyzed'
	PERTIFIED = 'petrified'
	POISONED = 'poisoned'
	PRONE = 'prone'
	STUNNED = 'stunned'
	UNCONSCIOUS = 'unconscious'


class Attribute(str, Enum):
	"""Basic attributes."""

	STRENGTH = 'strength'
	DEXTERITY = 'dexterity'
	CONSTITUTION = 'constitution'
	INTELLIGENCE = 'intelligence'
	WISDOM = 'wisdom'
	CHARISMA = 'charisma'


class CreatureType(str, Enum):
	"""Types of creatures."""

	ABERRATION = 'aberration'
	BEAST = 'beast'
	CELESTIAL = 'celestial'
	CONSTRUCT = 'construct'
	DRAGON = 'dragon'
	ELEMENTAL = 'elemental'
	FEY = 'fey'
	FIEND = 'fiend'
	GIANT = 'giant'
	HUMANOID = 'humanoid'
	MONSTROSITY = 'monstrosity'
	OOZE = 'ooze'
	PLANT = 'plant'
	UNDEAD = 'undead'


class DescriptionTableType(str, Enum):
	"""Type of description table entry."""

	TABLE = 'table'
	LIST = 'list'


class TextAlignment(str, Enum):
	"""Text alignment."""

	LEFT = 'left'
	CENTER = 'center'


DESCRIPTION_TABLE_COLUMN_STYLE_PATTERN = re.compile(
	r'\s*col-(?P<width>\d+)\s*(text-)?(?P<align>' + r'|'.join([align.value for align in TextAlignment]) + r')?\s*'
)


class DescriptionTableColumnStyle(BaseModel, extra=Extra.forbid):
	"""Style of a table column."""

	width: int
	alignment: TextAlignment = Field(TextAlignment.LEFT, alias='align')


class DescriptionTable(BaseModel, extra=Extra.forbid):
	"""Description entry with table format."""

	entry_type: DescriptionTableType = Field(alias='type')
	caption: Optional[str] = None
	headers: Optional[List[str]] = Field(alias='colLabels')
	column_styles: List[DescriptionTableColumnStyle] = Field(alias='colStyles')
	rows: List[List[str]]

	# pylint: disable=no-self-argument
	@root_validator(pre=True)
	def convert_list_and_check_n_columns_consistency(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether all fields have the same number of columns."""
		if values.get('type', '') == 'list':
			values = cls._convert_list_to_table(values)
		headers = values.get('colLabels', None)
		styles_len = len(values.get('colStyles', []))
		if headers is not None:
			header_len = len(headers)
			if header_len != styles_len:
				raise ValueError(
					f"length of headers ({header_len}) does not match length of styles "
					f"({styles_len}) in DescriptionTable {values}"
				)
		rows_new = []
		for ind, row in enumerate(values.get('rows', [])):
			if len(row) != styles_len:
				raise ValueError(
					f"lenght of row {ind} ({len(row)}) does not match length of styles "
					f"({styles_len}) in DescriptionTable {values}"
				)
			row_new = []
			for item in row:
				if isinstance(item, str):
					row_new.append(item)
				if isinstance(item, dict):
					if item.get('type') != 'cell':
						raise ValueError(
							f"table cell type unrecognised: {item.get('type')} in DescriptionTable {values}."
						)
					if list(item.keys()) != ['type', 'roll']:
						raise ValueError(
							f"table cell with unrecognised keys: {item} in DescriptionTable {values}."
						)
					roll = item['roll']
					roll.pop('pad', None)
					if list(roll.keys()) not in [['exact'], ['min', 'max']]:
						raise ValueError(
							f"table cell roll with unrecognised keys: {roll} in DescriptionTable {values}."
						)
					if 'exact' in roll:
						row_new.append(str(roll['exact']))
					else:
						row_new.append(str(roll['min']) + '-' + str(roll['max']))
			rows_new.append(row_new)
		values['rows'] = rows_new
		return values

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

	@classmethod
	def _convert_list_to_table(cls, values: Dict[str, Any]) -> Dict[str, Any]:
		"""Convert a list of items with names to a table format."""
		style = values.get('style', 'single')
		if style not in ('single', 'list-hang-notitle'):
			raise ValueError(f"Unknown list style '{style}'")

		max_name_len = 0
		max_descr_len = 0
		rows = []
		for entry in values.get('items', []):
			if style == 'single':
				if not isinstance(entry, str):
					raise ValueError(f"Unknown list item type '{type(entry)}' for list without style")
				max_descr_len = max(max_descr_len, len(entry))
				rows.append([entry])
			elif style == 'list-hang-notitle':
				if entry.get('type', None) != 'item':
					raise ValueError(f"Unknown list item type '{entry.get('type', None)}'")
				name = entry.get('name', "")
				entry_lines = entry.get('entries', [])

				max_name_len = max(max_name_len, len(name))
				max_descr_len = max(max_descr_len, max(len(line) for line in entry_lines))
				rows.append([name, '\n'.join(entry_lines)])

		if style == 'single':
			col_styles = [{'width': max_descr_len, 'align': 'left'}]
		elif style == 'list-hang-notitle':
			col_styles = [{'width': max_name_len, 'align': 'left'}, {'width': max_descr_len, 'align': 'left'}]
		return {'type': 'list', 'colLabels': None, 'colStyles': col_styles, 'rows': rows}


class DescriptionEntryType(str, Enum):
	"""Type of description entry."""

	QUOTE = 'quote'
	ENTRIES = 'entries'
	INSET = 'inset'


class DescriptionEntry(BaseModel, extra=Extra.forbid):
	"""More detailed description entry."""

	entry_type: DescriptionEntryType = Field(alias='type')
	entries: List[Union[str, DescriptionEntry, DescriptionTable]]
	author: Optional[str] = Field(None, alias='by')
	name: Optional[str] = None
	source: Optional[Book] = None
	page: Optional[int] = None

	# pylint: disable=no-self-argument
	@root_validator
	def check_exclusive_fields(cls, values: Dict[str, Any]) -> Dict[str, Any]:  # type: ignore
		"""Check whether all fields have the same umber of columns."""
		if values.get('entry_type', '') == DescriptionEntryType.QUOTE:
			if (
				values.get('author') is None
			) or any((values.get(key) is not None) for key in ['name', 'source', 'page']):
				raise ValueError(f"invalid quote entry: '{values}'")
		elif values.get('entry_type', '') == DescriptionEntryType.ENTRIES:
			if (
				values.get('name') is None
			) or any((values.get(key) is not None) for key in ['author', 'source', 'page']):
				raise ValueError(f"invalid entries entry: '{values}'")
		elif values.get('entry_type', '') == DescriptionEntryType.INSET:
			if (
				any((values.get(key) is None) for key in ['source', 'page', 'name'])
			) or (values.get('author') is not None):
				raise ValueError(f"invalid inset entry: '{values}'")
		return values


class DamageType(str, Enum):
	"""Damage type inflicted."""

	ACID = 'acid'
	BLUDGEONING = 'bludgeoning'
	COLD = 'cold'
	FIRE = 'fire'
	FORCE = 'force'
	LIGHTNING = 'lightning'
	NECROTIC = 'necrotic'
	PIERCING = 'piercing'
	POISON = 'poison'
	PSYCHIC = 'psychic'
	RADIANT = 'radiant'
	SLASHING = 'slashing'
	THUNDER = 'thunder'


class AttackType(str, Enum):
	"""Attack types."""

	MELEE = 'M'
	RANGED = 'R'


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

	name: str										# name of the spell
	sources: List[BookReference]					# source material defining the spell (first is main source)
	min_level: int									# minimal level required to cast
	school: School									# school of the spell
	cast_times: List[Time]							# Time it takes to cast a spell
	spell_range: Range								# range (and shape) of the spell
	components: SpellComponents						# components required for casting
	durations: List[SpellDuration]					# duration(s) of the spell's effects
	description: List[Union[						# description of the spell
		str,
		DescriptionEntry,
		DescriptionTable
	]]
	higher_level_description: Optional[str]			# description for higher levels
	classes: Optional[List[ClassDefinition]]		# classes that can use this spell
	races: Optional[List[Race]]						# races that can use this spell
	backgrounds: Optional[List[Background]]			# backgrounds that can use this spell
	conditions_inflicted: List[Condition]			# conditions inflicted on spell target
	conditions_immune: List[Condition]				# conditions for which spell grants immunity
	saving_throws: List[Attribute]					# saving throws
	creatures_affected: List[CreatureType]			# creature types that can be affected
	damage: Damage									# damage inflicted by the spell
	damage_resist: List[DamageType]					# resistances granted by the spell
	damage_immune: List[DamageType]					# Immunities granted by the spell
	ability_check: List[Attribute]					# check required for cast
	srd_name: Optional[str]							# whether the spell is available in the System Reference Document
	eldritch_invocations: Optional[					# eldritch invocations
		List[EldritchInvocation]
	]


def get_spells() -> List[Spell]:
	"""Read spells from external 5etools clone and parse to domain class."""
	all_spells = []
	for raw_spell in _read_from_5etools():
		raw_spell_cpy = copy.deepcopy(raw_spell)
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
		try:
			current_spell = Spell(
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
				description=raw_spell.pop('entries', None),
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
		except ValidationError as err:
			raise ValueError(f"{err} while processing raw spell\n{raw_spell_cpy}") from err
		if raw_spell:
			raise ValueError(f"Unused field(s) {list(raw_spell.keys())}\nfrom {raw_spell_cpy}")
		del raw_spell_cpy
		all_spells.append(current_spell)

	return all_spells


def _read_from_5etools() -> Iterable[Dict[str, Any]]:
	"""Read the spell definition from the external 5etools clone."""
	spells_folder = os.path.join(EXTERNAL_5ETOOLS_MIRROR, 'data', 'spells')

	with open(os.path.join(spells_folder, 'index.json'), 'rt', encoding='utf-8') as index_file:
		index = json.load(index_file)

	for spells_file in index.values():
		print("reading from", spells_file)
		with open(os.path.join(spells_folder, spells_file), 'rt', encoding='utf-8') as file_:
			source_spells = json.load(file_)
		yield from source_spells['spell']


if __name__ == '__main__':
	spells = get_spells()
	print("Parsed", len(spells), "spells")
	# print('-' * 120)
	# print(spells[0])
