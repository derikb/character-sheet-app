/**
 * General data definitions.
 */

import { createEnum } from './utils.js';

/**
 * Unit in which duration can be defined.
 */
const TimeUnit = createEnum(['minute', 'hour', 'day', 'action', 'reaction', 'bonus', 'round']);

/**
 * Abstract time duration.
 */
class Time {
    /**
     * @param {int} number
     * @param {TimeUnit} unit
     * @param {String} condition
     * @param {bool} up_to
     */
    constructor ({ number, unit, condition = null, up_to = false }) {
        this.number = number;
        this.unit = unit;
        this.condition = condition;
        this.up_to = up_to;
    }
};

/**
 * Condition inflicted on a character.
 */
const Condition = createEnum(['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'grappled', 'incapacitated', 'invisible', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious']);

/**
 * Basic attributes.
 */
const Attribute = createEnum(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']);

/**
 * Types of creatures.
 */
const CreatureType = createEnum(['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead']);

/**
 * Damage type inflicted.
 */
const DamageType = createEnum(['acid', 'bludgeoning', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'piercing', 'poison', 'psychic', 'radiant', 'slashing', 'thunder']);

export { TimeUnit, Time, Condition, Attribute, CreatureType, DamageType };
