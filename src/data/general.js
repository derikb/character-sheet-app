/**
 * General data definitions.
 */

import { createEnum } from './utils.js';

/**
 * Unit in which duration can be defined.
 */
const TimeUnit = createEnum(['Minute', 'Hour', 'Day', 'Action', 'Reaction', 'Bonus', 'Round']);

/**
 * Condition inflicted on a character.
 */
const Condition = createEnum(['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious']);

/**
 * Basic attributes.
 */
const Attribute = createEnum(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']);

/**
 * Types of creatures.
 */
const CreatureType = createEnum(['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead']);

/**
 * Damage type inflicted.
 */
const DamageType = createEnum(['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder']);

export { TimeUnit, Condition, Attribute, CreatureType, DamageType };
