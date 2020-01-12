/**
 * Model for 5e character data
 */

export default class Character5e {
    /**
     * Property notes...
     * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
     * @prop {String} charname Name.
     * @prop {Array[]} weapons Weapon data (name, att, dam, notes).
     * @prop {String[]} features Special features and abilities.
     * @prop {String[]} equipment Stuff the character carries.
     * @prop {Array[]} notes_adv Adventure notes [header, text]
     * @prop {Array[]} notes_cam Campaign notes [header, text]
     * @prop {Array[]} npcs NPC notes [header, text]
     * @prop {Array[]} factions NPC notes [header, text]
     * @prop {String} key_prev If character was imported into app with identical key. This is that key and the character is given a new one on import.
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
        inspiration = '',
        proficiency = '+2',
        armor_class = '',
        speed = 30,
        hp_cur = '',
        hp_max = '',
        hd_cur = '',
        hd_max = '',
        deathSave = {
            success: 0,
            fail: 0
        },
        classPoints = {
            cur: 0,
            max: 0
        },
        str = 10,
        dex = 10,
        con = 10,
        intel = 10,
        wis = 10,
        cha = 10,
        saves = {
            'str': 0,
            'dex': 0,
            'con': 0,
            'intel': 0,
            'wis': 0,
            'cha': 0
        },
        skills = {
            acrobatics: 0,
            animal_handling: 0,
            arcana: 0,
            athletics: 0,
            deception: 0,
            history: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0,
            medicine: 0,
            nature: 0,
            perception: 0,
            performance: 0,
            persuasion: 0,
            religion: 0,
            sleight_of_Hand: 0,
            stealth: 0,
            survival: 0
        },
        weapons = [],
        proficiencies_other = '',
        languages = '',
        traits = '',
        ideals = '',
        bonds = '',
        flaws = '',
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
        spell_ability = '',
        spell_save = '',
        spell_attack = '',
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
        key_prev = ''
    }) {
        this.app = 'character-sheet-5e';
        this.key = key;
        this.charname = charname;
        this.charclass = charclass;
        this.race = race;
        this.background = background;
        this.alignment = alignment;
        this.level = level;
        this.experience = experience;
        this.inspiration = inspiration;
        this.proficiency = proficiency;
        this.armor_class = armor_class;
        this.speed = speed;
        this.hp_cur = hp_cur;
        this.hp_max = hp_max;
        this.hd_cur = hd_cur;
        this.hd_max = hd_max;
        this.deathSave = deathSave;
        this.classPoints = classPoints;
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.intel = intel;
        this.wis = wis;
        this.cha = cha;
        this.saves = saves;
        this.skills = skills;
        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(weapons)) {
            const lines = weapons.split(new RegExp('<br/?>', 'i'));
            weapons = lines.map((el) => { return [el]; });
        }
        this.weapons = weapons;
        this.proficiencies_other = proficiencies_other;
        this.languages = languages;
        this.traits = traits;
        this.ideals = ideals;
        this.bonds = bonds;
        this.flaws = flaws;
        this.appearance = appearance;
        // @version < 1.8.0 Backwards compatible convert string to array
        if (!Array.isArray(equipment)) {
            equipment = equipment.split(new RegExp('<br/?>', 'i'));
        }
        this.equipment = equipment;
        this.cp = cp;
        this.sp = sp;
        this.gp = gp;
        this.pp = pp;
        // @version < 1.8.0 Backwards compatible convert string to array
        if (!Array.isArray(features)) {
            features = features.split(new RegExp('<br/?>', 'i'));
        }
        this.features = features;
        this.notes = notes;
        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(notes_adv)) {
            notes_adv = [
                ['', notes_adv]
            ];
        }
        this.notes_adv = notes_adv;
        // @version < 1.8.0 Backwards compatible convert string to the text of a first list item.
        if (!Array.isArray(notes_cam)) {
            notes_cam = [
                ['', notes_cam]
            ];
        }
        this.notes_cam = notes_cam;
        this.npcs = npcs;
        this.factions = factions;
        this.spell_ability = spell_ability;
        this.spell_save = spell_save;
        this.spell_attack = spell_attack;
        this.spell_slots = spell_slots;
        this.spell_slots_cur = spell_slots_cur;
        this.spells = spells;
        this.updated = updated;
        this.key_prev = key_prev;
    }
    /**
     * A quick summary header for use in lists.
     */
    get summaryHeader() {
        return `${this.charname} (${this.charclass} ${this.level})`;
    }
};
