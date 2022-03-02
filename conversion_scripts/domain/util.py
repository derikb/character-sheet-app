"""Utilities to be used for defining domain objects."""
from __future__ import annotations

from abc import abstractclassmethod
from typing import Any, Callable, Dict, Generic, Iterable, Type, TypeVar

from pydantic import ValidationError, parse_obj_as

ValueType = TypeVar('ValueType')
DFDE = TypeVar('DFDE', bound='DynamicFrozenDictEnum')


class DynamicFrozenDictEnum(Generic[ValueType]):
	"""Initialisable class for instances of a select and frozen number of keys and any value type."""

	allowed_value_dict: Dict[str, ValueType] = {}

	@classmethod
	def is_initialised(cls) -> bool:
		"""Return whether allowed values have been loaded."""
		return bool(cls.allowed_value_dict)

	@classmethod
	def _set_allowed_values(cls, values: Dict[str, ValueType]) -> None:
		"""Set the allowed values, using a key to data mapping."""
		for key, data in values.items():
			try:
				_ = parse_obj_as(ValueType, data)  # type: ignore
			except ValidationError as err:
				raise ValueError(f"Bad value type for key '{key}': '{data}' ({type(data)})") from err
			if not isinstance(key, str):
				raise ValueError(f"Bad key type: '{key}' ({type(key)})")
		cls.allowed_value_dict = values

	@classmethod
	def __get_validators__(cls) -> Iterable[Callable[[Any], Any]]:
		"""Return iterable of validators for pydantic."""
		yield cls._validate

	@classmethod
	def _validate(cls: Type[DFDE], key: str) -> DFDE:
		"""Validate initialiser key."""
		if not isinstance(key, str):
			raise TypeError(f"Bad key for {cls.__name__}: {key} ({type(key)})")
		if not cls.is_initialised():
			raise ValueError(f"{cls.__name__} class not initialised.")
		if key not in cls.allowed_value_dict:
			raise KeyError(
				f"Unknown key: '{key}', known keys and values are:\n" + '\n'.join(
					f"{key_}: {str(data)}" for key_, data in cls.allowed_value_dict.items()
				)
			)
		return cls(key)

	@abstractclassmethod
	def initialise(cls, *args: str, **kwargs: str) -> None:
		"""Initialise allowed values."""
		raise NotImplementedError()

	def __init__(self, key: str):
		"""Minimal initalisation (should probably be overridden)."""
		self._key = key

	@property
	def value(self):
		"""Get the key, as with Enum."""
		return self._key
