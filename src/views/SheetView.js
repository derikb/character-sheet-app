/* eslint-disable no-case-declarations */
import Tabs from './Tabs.js';
import Weapon from '../models/Weapon.js';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<header id="page-top" class="page-header">
    <h1 class="pc-charname" aria-label="Character Name"><field-editable data-name="charname" placeholder="Character Name"></field-editable></h1>
</header>

<ul id="toptabs" role="tablist">
    <li role="presentation"><a role="tab" id="tab-stats" href="#pane-stats" aria-selected="true">Statistics, Abilities, Equipment, etc.</a></li>
    <li role="presentation"><a role="tab" id="tab-notes" href="#pane-notes" aria-selected="false">Notes, Personality, NPCs, etc.</a></li>
</ul>

<section id="pane-stats" class="grid" role="tabpanel" aria-labelledby="tab-stats">
    <section class="fullwidth">
        <dl class="field">
            <div>
                <dt>Class</dt><dd><field-editable data-name="charclass"></field-editable></dd>
            </div>
            <div>
                <dt>Race</dt><dd><field-editable data-name="race"></field-editable></dd>
            </div>
            <div>
                <dt>Background</dt><dd><field-editable data-name="background"></field-editable></dd>
            </div>
            <div>
                <dt>Alignment</dt><dd><field-editable data-name="alignment"></field-editable></dd>
            </div>
            <div>
                <dt>Level</dt><dd><field-editable data-name="level" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Experience</dt><dd><field-editable data-name="experience" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Proficiency Bonus</dt><dd class="small" data-name="proficiency"></dd>
            </div>
            <div>
                <dt>Inspiration</dt><dd><field-editable data-name="inspiration" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Speed</dt><dd><field-editable data-name="speed" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Hit Dice</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hd_cur" placeholder="0" aria-label="Current Hit Dice"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hd_max" placeholder="0" aria-label="Maximum Hit Dice"></field-editable>
                </dd>
            </div>
            <div class="with_icon">
                <dt>Armor Class</dt><dd><field-editable data-name="armor_class" placeholder="10" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Hit Points</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hp_cur" placeholder="0" aria-label="Current Hit Points"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hp_max" placeholder="0" aria-label="Maximum Hit Points"></field-editable>
                </dd>
            </div>
            <div>
                <dt>Death Save Success/Fail</dt>
                <dd>
                    <input type="number" class="small" name="death_success" data-name="deathSave" data-subfield="success" value="0" min="0" max="3" aria-label="Death Save Successes" />
                    <strong>/</strong>
                    <input type="number" class="small" name="death_fail" data-name="deathSave" data-subfield="fail" value="0" min="0" max="3" aria-label="Death Save Fails" />
                </dd>
            </div>
            <div class="with_icon">
                <dt>Class Points</dt>
                <dd>
                    <input type="number" class="small" data-name="class_points" data-subfield="cur" placeholder="0" min="0" aria-label="Current Class Points"/> <strong>/</strong> <input type="number" class="small" data-name="class_points" data-subfield="max" placeholder="0" min="0" aria-label="Maximum Class Points" />
                </dd>
            </div>
        </dl>
    </section>

    <section>
        <h2 id="page-attributes">Attributes</h2>
        <section class="pc-attributes" aria-labelledby="page-attributes" role="list">
            <attr-listing data-name="str">Str</attr-listing>
            <attr-listing data-name="dex">Dex</attr-listing>
            <attr-listing data-name="con">Con</attr-listing>
            <attr-listing data-name="intel">Int</attr-listing>
            <attr-listing data-name="wis">Wis</attr-listing>
            <attr-listing data-name="cha">Cha</attr-listing>
        </section>

        <h2 id="page-skills">Skills</h2>
        <section class="pc-skills" aria-labelledby="ppage-skills" role="list">
            <skill-listing data-name="skills" data-subfield="acrobatics">Acrobatics (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="animal_handling">Animal Handling (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="arcana">Arcana (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="athletics">Athletics (Str)</skill-listing>
            <skill-listing data-name="skills" data-subfield="deception">Deception (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="history">History (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="insight">Insight (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="intimidation">Intimidation (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="investigation">Investigation (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="medicine">Medicine (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="nature">Nature (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="perception">Perception (Wis)</skill-listing>
            <skill-listing data-name="skills" data-subfield="performance">Performance (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="persuasion">Persuasion (Cha)</skill-listing>
            <skill-listing data-name="skills" data-subfield="religion">Religion (Int)</skill-listing>
            <skill-listing data-name="skills" data-subfield="sleight_of_hand">Sleight of Hand (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="stealth">Stealth (Dex)</skill-listing>
            <skill-listing data-name="skills" data-subfield="survival">Survival (Wis)</skill-listing>
        </section>
    </section>

    <section class="grid-span-col-2">
        <h2>Weapons & Attacks</h2>
        <table-editable columns="Name||Attack||Damage||Notes" data-name="weapons"></table-editable>

        <h2>Features & Traits</h2>
        <simple-list data-name="features"></simple-list>

        <h2>Other Proficiencies</h2>
        <field-editable class="largearea" data-name="proficiencies_other"></field-editable>

        <h2>Equipment</h2>
        <simple-list data-name="equipment"></simple-list>

        <dl class="field">
            <div>
                <dt>CP</dt><dd><field-editable data-name="cp" placeholder="0" class="small"></field-editable></dd>
                <dt>SP</dt><dd><field-editable data-name="sp" placeholder="0" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>GP</dt><dd><field-editable data-name="gp" placeholder="0" class="small"></field-editable></dd>
                <dt>PP</dt><dd><field-editable data-name="pp" placeholder="0" class="small"></field-editable></dd>
            </div>
        </dl>
    </section>

    <section class="fullwidth">
        <h2 id="page-spells">Spells</h2>

        <dl class="field">
            <div>
                <dt>Spell Ability</dt><dd><field-editable data-name="spell_ability"></field-editable></dd>
            </div>
            <div>
                <dt>Spell Save DC</dt><dd><field-editable data-name="spell_save"></field-editable></dd>
            </div>
            <div>
                <dt>Spell Attack Bonus</dt><dd><field-editable data-name="spell_attack"></field-editable></dd>
            </div>
        </dl>

    <h3>Spell Slots</h3>

    <dl class="field">
        <div>
            <dt>1st</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="1" aria-label="Current spell slots: Level 1" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="1" aria-label="Max spell slots: Level 1" min="0" value="0" />
            </dd>
            <dt>2nd</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="2" aria-label="Current spell slots: Level 2" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="2" aria-label="Max spell slots: Level 2" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>3rd</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="3" aria-label="Current spell slots: Level 3" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="3" aria-label="Max spell slots: Level 3" min="0" value="0" />
            </dd>
            <dt>4th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="4" aria-label="Current spell slots: Level 4" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="4" aria-label="Max spell slots: Level 4" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>5th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="5" aria-label="Current spell slots: Level 5" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="5" aria-label="Max spell slots: Level 5" min="0" value="0" />
            </dd>
            <dt>6th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="6" aria-label="Current spell slots: Level 6" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="6" aria-label="Max spell slots: Level 6" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>7th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="7" aria-label="Current spell slots: Level 7" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="7" aria-label="Max spell slots: Level 7" min="0" value="0" />
            </dd>
            <dt>8th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="8" aria-label="Current spell slots: Level 8" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="8" aria-label="Max spell slots: Level 8" min="0" value="0" />
            </dd>
        </div>
        <div>
            <dt>9th</dt>
            <dd>
                <input type="number" class="small" data-name="spell_slots_cur" data-subfield="9" aria-label="Current spell slots: Level 9" min="0" />
                <strong>/</strong>
                <input type="number" class="small" data-name="spell_slots" data-subfield="9" aria-label="Max spell slots: Level 9" min="0" value="0" />
            </dd>
        </div>
    </dl>
</section>

    <section>
        <h3>Cantrips</h3>
        <simple-list data-name="spells" data-subfield="0"></simple-list>
    </section>
    <section hidden>
        <h3>1st</h3>
        <simple-list data-name="spells" data-subfield="1"></simple-list>
    </section>
    <section hidden>
        <h3>2nd</h3>
        <simple-list data-name="spells" data-subfield="2"></simple-list>
    </section>
    <section hidden>
        <h3>3rd</h3>
        <simple-list data-name="spells" data-subfield="3"></simple-list>
    </section>
    <section hidden>
        <h3>4th</h3>
        <simple-list data-name="spells" data-subfield="4"></simple-list>
    </section>
    <section hidden>
        <h3>5th</h3>
        <simple-list data-name="spells" data-subfield="5"></simple-list>
    </section>
    <section hidden>
        <h3>6th</h3>
        <simple-list data-name="spells" data-subfield="6"></simple-list>
    </section>
    <section hidden>
        <h3>7th</h3>
        <simple-list data-name="spells" data-subfield="7"></simple-list>
    </section>
    <section hidden>
        <h3>8th</h3>
        <simple-list data-name="spells" data-subfield="8"></simple-list>
    </section>
    <section hidden>
        <h3>9th</h3>
        <simple-list data-name="spells" data-subfield="9"></simple-list>
    </section>
</section>

<section id="pane-notes" role="tabpanel" aria-labelledby="tab-notes" hidden class="grid">
    <section>
        <h2>NPCs</h2>
        <note-list data-name="npcs"></note-list>
    </section>
    <section>
        <h2>Factions</h2>
        <note-list data-name="factions"></note-list>
    </section>
    <section>
        <h2>Party Members</h2>
        <note-list data-name="partymembers"></note-list>
    </section>

    <section>
        <h2>Personality</h2>
        <h3>Traits</h3>
        <field-editable class="smallarea" data-name="traits"></field-editable>
        <h3>Ideals</h3>
        <field-editable class="smallarea" data-name="ideals"></field-editable>
        <h3>Bonds</h3>
        <field-editable class="smallarea" data-name="bonds"></field-editable>
        <h3>Flaws</h3>
        <field-editable class="smallarea" data-name="flaws"></field-editable>
        <h3>Appearance</h3>
        <field-editable class="smallarea" data-name="appearance"></field-editable>
        <h2>Languages</h2>
        <field-editable class="smallarea" data-name="languages"></field-editable>
    </section>

    <section>
        <h2 id="page-notes_adv">Adventure Notes</h2>
        <note-list data-name="notes_adv"></note-list>
    </section>
    <section>
        <h2>Campaign Notes</h2>
        <note-list data-name="notes_cam"></note-list>
    </section>

    <section>
        <h2>Character Notes</h2>
        <field-editable class="largearea" data-name="notes"></field-editable>
    </section>
</section>
`;
class SheetView extends HTMLElement {
    /**
     * @param {EventEmitter} emitter
     */
    constructor (emitter) {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.emitter = emitter;
        this.mainTabs = new Tabs(this.shadowRoot.querySelector('ul[role=tablist]'));
    }

    connectedCallback () {
        Array.from(this.shadowRoot.querySelectorAll('input[type=number]')).forEach((el) => {
            el.addEventListener('change', this._numberInputChange.bind(this));
        });
        // Listen for events emitted from the components
        this.shadowRoot.addEventListener('fieldChange', this._handleFieldChange.bind(this));
        this.shadowRoot.addEventListener('attributeChange', this._handleAttributeChange.bind(this));
        this.shadowRoot.addEventListener('saveChange', this._handleSaveChange.bind(this));

        this.emitter.on('character:skill:update', this._updateSkillMod, this);
        this.emitter.on('character:proficiency:update', this._updateProficiency, this);
        this.emitter.on('character:attribute:update', this._updateAttributeMods, this);
        this.emitter.on('character:save:update', this._updateSaveMods, this);
        this.emitter.on('tab:switch', this.switchToPane, this);
    }

    disconnectedCallback () {
        Array.from(this.shadowRoot.querySelectorAll('input[type=number]')).forEach((el) => {
            el.removeEventListener('change', this._numberInputChange.bind(this));
        });
        // Listen for events emitted from the components
        this.shadowRoot.removeEventListener('fieldChange', this._handleFieldChange.bind(this));
        this.shadowRoot.removeEventListener('attributeChange', this._handleAttributeChange.bind(this));
        this.shadowRoot.removeEventListener('saveChange', this._handleSaveChange.bind(this));

        this.emitter.off('character:skill:update', this._updateSkillMod, this);
        this.emitter.off('character:proficiency:update', this._updateProficiency, this);
        this.emitter.off('character:attribute:update', this._updateAttributeMods, this);
        this.emitter.off('character:save:update', this._updateSaveMods, this);
        this.emitter.off('tab:switch', this.switchToPane, this);
    }
    /**
     * @param {Character5e}
     */
    set character (character) {
        this.cur_character = character;
        // render character.
        this.renderCharacter();
    }
    /**
     * @returns {Character5e}
     */
    get character () {
        return this.cur_character;
    }
    /**
     * Change the main tab pane.
     * @param {String} targetPane
     */
    switchToPane (targetPane) {
        this.mainTabs.switchToPane(targetPane);
    }
    /**
     * Take character data and fill it into the page
     */
    renderCharacter () {
        if (this.cur_character === null) {
            return;
        }

        this.shadowRoot.querySelector('[data-name="charname"]').content = this.cur_character.charname;

        const fields = Array.from(this.shadowRoot.querySelectorAll('*[data-name]'));
        fields.forEach((el) => {
            const f = el.getAttribute('data-name');
            if (typeof this.cur_character[f] === 'undefined') {
                return;
            }
            const subf = el.getAttribute('data-subfield');
            const charValue = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
            switch (el.tagName) {
                case 'INPUT':
                    // Make sure numbers default to 0.
                    // this is especially relevant for spell slots.
                    if (el.getAttribute('type') === 'number') {
                        el.value = charValue || 0;
                    } else {
                        el.value = charValue || '';
                    }
                    // For spell slot input we need to trigger the display or not of spells
                    const event = new Event('change');
                    el.dispatchEvent(event);
                    break;
                case 'SIMPLE-LIST':
                    el.clear();
                    const listItems = charValue || [];
                    if (listItems.length > 0) {
                        listItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addItem(item);
                        });
                    }
                    el.addItem();
                    break;
                case 'NOTE-LIST':
                    el.clear();
                    const noteItems = charValue || [];
                    if (noteItems.length > 0) {
                        noteItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addItem(item);
                        });
                    }
                    el.addItem();
                    break;
                case 'TABLE-EDITABLE':
                    el.clear();
                    const rowItems = charValue || [];
                    if (rowItems.length > 0) {
                        rowItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addRow(item);
                        });
                    }
                    el.addRow();
                    break;
                case 'SKILL-LISTING':
                    el.skillValue = charValue || 0;
                    el.skillMod = this.cur_character.getSkillMod(subf);
                    break;
                case 'ATTR-LISTING':
                    el.attributeScore = charValue || 10;
                    el.attributeMod = this.cur_character.attributeMod(f);
                    el.saveProficiency = this.cur_character.saves[f];
                    el.saveMod = this.cur_character.saveMod(f);
                    break;

                case 'FIELD-EDITABLE':
                    el.content = charValue || '';
                    break;
            }
        });

        this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML = this.cur_character.proficiency;

        this.emitter.trigger('dialog:save:hide');
    }
    /**
     * Update a skill's modifier in the UI.
     * @param {String} skill
     * @param {String} modifier
     */
    _updateSkillMod (skill, modifier) {
        const el = this.shadowRoot.querySelector(`skill-listing[data-subfield="${skill}"]`);
        if (!el) {
            return;
        }
        el.skillMod = modifier;
    }
    /**
     * Update the proficiency modifier in the UI.
     */
    _updateProficiency () {
        const proficiency = this.cur_character.proficiency;
        this.shadowRoot.querySelector('[data-name="proficiency"]').innerHTML = proficiency;

        Array.from(this.shadowRoot.querySelectorAll('skill-listing')).forEach((el) => {
            const skill = el.skillName;
            el.skillMod = this.cur_character.getSkillMod(skill);
        });

        Array.from(this.shadowRoot.querySelectorAll('attr-listing')).forEach((el) => {
            const attr = el.attributeName;
            el.saveMod = this.cur_character.saveMod(attr);
        });
    }
    /**
     * Update an attribute's modifier in the UI.
     * @param {String} attribute
     */
    _updateAttributeMods (attribute) {
        const el = this.shadowRoot.querySelector(`attr-listing[data-name=${attribute}]`);
        if (!el) {
            return;
        }
        el.attributeMod = this.cur_character.attributeMod(attribute);
        el.saveMod = this.cur_character.saveMod(attribute);
    }
    /**
     * Update a save modifier in the UI.
     * @param {String} attribute
     */
    _updateSaveMods (attribute) {
        const el = this.shadowRoot.querySelector(`attr-listing[data-name=${attribute}]`);
        if (!el) {
            return;
        }
        el.saveMod = this.cur_character.saveMod(attribute);
    }
    /**
     * Handle input[name=number] changes.
     * @param {Event} ev
     */
    _numberInputChange (ev) {
        const field = ev.target.dataset.name;
        const subfield = ev.target.dataset.subfield;
        if (typeof this.cur_character[field][subfield] === 'undefined') {
            return;
        }
        const newValue = parseInt(ev.target.value, 10);
        this.cur_character[field][subfield] = newValue;
        this.emitter.trigger('dialog:save:show');
        if (field === 'spell_slots') {
            const spellList = this.shadowRoot.querySelector(`[data-name="spells"][data-subfield="${subfield}"]`);
            if (!newValue) {
                // this covers 0 and NaN
                spellList.parentNode.hidden = true;
            } else {
                spellList.parentNode.hidden = false;
            }
        }
    }
    /**
     * Trigger the event to show there are unsaved changes.
     */
    _showUnsavedDialog () {
        this.emitter.trigger('dialog:save:show');
    }
    /**
     * Compare two properties to see if they are different
     * For objects/arrays we need to account for them being different objects
     * that have the same properties and values.
     * @param {String|Number|Array|Object|Boolean} valold Existing property value
     * @param {String|Number|Array|Object|Boolean} valnew New property value
     * @return {Boolean}
     */
    _sameValues (valold, valnew) {
        // for efficiency we could do typeof checks
        // and only use JSON for objects...
        return JSON.stringify(valold) === JSON.stringify(valnew);
    }
    /**
     * When a field is changed in the UI.
     * Update the character and trigger save dialog
     * Only if the value is actually different.
     * @param {CustomEvent} ev
     */
    _handleFieldChange (ev) {
        const field = ev.detail.field || '';
        const subfield = ev.detail.subfield || '';
        if (!field) {
            return;
        }
        const cur_character = this.cur_character;
        if (typeof cur_character[field] === 'undefined') {
            return;
        }
        let newValue = ev.detail.value;
        if (field === 'skills') {
            const currentVal = cur_character.getSkill(subfield);
            if (!this._sameValues(currentVal, newValue)) {
                cur_character.setSkill(subfield, ev.detail.value);
                this._showUnsavedDialog();
            }
            return;
        }
        if (subfield) {
            if (typeof cur_character[field] !== 'object' || Array.isArray(cur_character[field])) {
                return;
            }
            const currentVal = cur_character[field][subfield];
            if (!this._sameValues(currentVal, newValue)) {
                cur_character[field][subfield] = ev.detail.value;
                this._showUnsavedDialog();
            }
            return;
        }
        const currentVal = cur_character[field];
        if (field === 'weapons') {
            newValue = newValue.map((object) => {
                return new Weapon(object);
            });
        }
        if (!this._sameValues(currentVal, newValue)) {
            cur_character[field] = newValue;
            this._showUnsavedDialog();
        }
    }
    /**
     * When an attribute is changed in the UI.
     * @param {CustomEvent} ev
     */
    _handleAttributeChange (ev) {
        const field = ev.detail.field || '';
        if (!field) {
            return;
        }
        this.cur_character.setAttribute(field, ev.detail.value);
        this._showUnsavedDialog();
    }
    /**
     * When a save is (un)checked in the UI.
     * @param {CustomEvent} ev
     */
    _handleSaveChange (ev) {
        const field = ev.detail.field || '';
        if (!field) {
            return;
        }
        this.cur_character.setSaveProficiency(field, ev.detail.value);
        this._showUnsavedDialog();
    }

    navigateTo (id) {
        const el = this.shadowRoot.querySelector(id);
        if (el) {
            el.scrollIntoView();
            // Focus only works sometimes depending on the element...
            // @todo fix that.
            el.focus();
        }
    }
}

if (!window.customElements.get('sheet-view')) {
    window.customElements.define('sheet-view', SheetView);
}

export default SheetView;
