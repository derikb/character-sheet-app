/**
 * Model for Vagabonds of Dyfed character
 */
import Character from './Character.js';

export default class CharacterVagabonds extends Character {
    /**
      * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
      * @prop {String} charname Name.
      * @prop {Number} level
      * @prop {String} conflict_approach
      * @prop {String} goal
      * @prop {String} gimmick
      * @prop {String} background
      * @prop {String} foreground
      * @prop {String} weakness
      * @prop {String} core_flaw
      * @prop {String[]} techniques
      * @prop {Number} hp_cur
      * @prop {Number} hp_max
      * @prop {Number} armor
      * @prop {Number} speed
      * @prop {String[]} lineage
      * @prop {Number} experience
      * @prop {String} appearance
      * @prop {String} personality
      * @prop {String[]} inventory
      * @prop {Number} coins
      * @prop {String} notes
      * @prop {CharacterNote[]} notes_adv Adventure notes
      * @prop {CharacterNote[]} notes_cam Campaign notes
      * @prop {CharacterNote[]} npcs NPC notes
      * @prop {CharacterNote[]} factions NPC notes
      * @prop {CharacterNote[]} partymembers Other party members.
      * @prop {String} key_prev If character was imported into app with identical key. This is that key and the character is given a new one on import.
      */
    constructor ({
        key = '',
        charname = '',
        level = 1,
        conflict_approach = '',
        goal = '',
        gimmick = '',
        background = '',
        foreground = '',
        weakness = '',
        core_flaw = '',
        techniques = [],
        hp_cur = 0,
        hp_max = 0,
        armor = 0,
        speed = 0,
        lineage = [],
        experience = 0,
        appearance = '',
        personality = '',
        inventory = [],
        coins = 0,
        notes = '',
        notes_adv = [],
        notes_cam = [],
        npcs = [],
        factions = [],
        partymembers = [],
        updated = '',
        key_prev = ''
    }) {
        super({
            key,
            charname,
            updated,
            key_prev
        });
        this.level = level;
        this.conflict_approach = conflict_approach;
        this.goal = goal;
        this.gimmick = gimmick;
        this.background = background;
        this.foreground = foreground;
        this.weakness = weakness;
        this.core_flaw = core_flaw;
        this.techniques = techniques;
        this.hp_cur = hp_cur;
        this.hp_max = hp_max;
        this.armor = armor;
        this.speed = speed;
        this.lineage = lineage;
        this.experience = experience;
        this.appearance = appearance;
        this.personality = personality;
        this.inventory = inventory;
        this.coins = coins;
        this.notes = notes;
        this.notes_adv = this._convertNotes(notes_adv);
        this.notes_cam = this._convertNotes(notes_cam);
        this.npcs = this._convertNotes(npcs);
        this.factions = this._convertNotes(factions);
        this.partymembers = this._convertNotes(partymembers);

        this.emitter = null;
    }
    /**
     * Class name (for JSON (de)serialization). Override in children.
     */
    get className () {
        return 'CharacterVagabonds';
    }
    /**
     * Ruleset name. Override in children.
     */
    get ruleset () {
        return 'Vagabonds';
    }
};
