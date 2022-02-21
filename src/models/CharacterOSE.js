/**
 * Model for OSE character data
 */

import Weapon from './Weapon.js';
import Character from './Character.js';

export default class CharacterOSE extends Character {
    /**
     * Property notes...
     * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
     * @prop {String} charname Name.
     * @prop {Number} thaco To hit AC 0.
     * @prop {Number} attack_bonus Bonus to attack rolls.
     * @prop {Weapon[]} weapons Weapon data (name, att, dam, notes).
     * @prop {String[]} features Special features and abilities.
     * @prop {String[]} equipment Stuff the character carries.
     * @prop {CharacterNote[]} notes_adv Adventure notes
     * @prop {CharacterNote[]} notes_cam Campaign notes
     * @prop {CharacterNote[]} npcs NPC notes
     * @prop {CharacterNote[]} factions NPC notes
     * @prop {CharacterNote[]} partymembers Other party members.
     */
    constructor ({
        key = '',
        charname = '',
        charclass = '',
        race = '',
        background = '',
        alignment = '',
        level = 1,
        experience = 0,
        armor_class = '',
        move = 30,
        hp_cur = '',
        hp_max = '',
        str = 10,
        dex = 10,
        con = 10,
        intel = 10,
        wis = 10,
        cha = 10,
        saves = {
            d: 0,
            w: 0,
            p: 0,
            b: 0,
            s: 0
        },
        thaco = 20,
        attack_bonus = 0,
        weapons = [],
        languages = '',
        appearance = '',
        equipment = [],
        cp = '',
        sp = '',
        gp = '',
        pp = '',
        features = [],
        notes = '',
        notes_adv = [],
        notes_cam = [],
        npcs = [],
        factions = [],
        partymembers = [],
        spell_slots = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spell_slots_cur = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spells = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        },
        updated = '',
        key_prev = '',
        version = ''
    }) {
        super({
            key,
            charname,
            updated,
            key_prev,
            version
        });
        this.charclass = charclass;
        this.race = race;
        this.background = background;
        this.alignment = alignment;
        this.level = level;
        this.experience = experience;
        this.armor_class = armor_class;
        this.move = move;
        this.hp_cur = hp_cur;
        this.hp_max = hp_max;
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.intel = intel;
        this.wis = wis;
        this.cha = cha;
        this.saves = saves;
        this.thaco = thaco;
        this.attack_bonus = attack_bonus;
        this.weapons = [];
        weapons.forEach((item) => {
            // Remove null and non-objects
            if (item && typeof item !== 'object') {
                return;
            }
            if (item instanceof Weapon) {
                this.weapons.push(item);
                return;
            }
            this.weapons.push(new Weapon(item));
        });

        this.languages = languages;
        this.appearance = appearance;
        this.equipment = equipment;
        this.cp = cp;
        this.sp = sp;
        this.gp = gp;
        this.pp = pp;
        this.features = features;
        this.notes = notes;
        this.notes_adv = this._convertNotes(notes_adv);
        this.notes_cam = this._convertNotes(notes_cam);
        this.npcs = this._convertNotes(npcs);
        this.factions = this._convertNotes(factions);
        this.partymembers = this._convertNotes(partymembers);
        this.spell_slots = spell_slots;
        this.spell_slots_cur = spell_slots_cur;
        this.spells = spells;

        this.emitter = null;
    }
    get className () {
        return 'CharacterOSE';
    }
    get ruleset () {
        return 'ose';
    }
    /**
     * Set an attribute score.
     * @param {String} attribute
     * @param {Number} value
     */
    setAttribute (attribute, value) {
        if (!this[attribute]) {
            return;
        }
        const curVal = this[attribute];
        if (curVal === value) {
            return;
        }
        this[attribute] = value;
        if (this.emitter) {
            this.emitter.trigger('character:attribute:update', attribute);
        }
    }
    /**
     * Get modifier for an attribute.
     * @param {String} attribute Attribute short code
     * @returns {String}
     */
    attributeMod (attribute) {
        const score = this[attribute];
        if (Number.isNaN(score)) {
            return '0';
        }
        const raw = Math.floor((score - 10) / 2);
        return (raw > 0) ? `+${raw}` : raw.toString();
    }
};
