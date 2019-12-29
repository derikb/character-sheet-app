/**
 * 5e specific UI events and functions
 */
const ui = {
    /**
     * Attribute inputs
     */
    attribute_fields: Array.from(document.querySelectorAll('.pc-attributes input[type=number]')),
    /**
     * Saving throw checkboxes
     */
    attribute_saves: Array.from(document.querySelectorAll('.pc-attributes input[type=checkbox]')),
    /**
     * Skill checkboxes
     */
    skill_checks: Array.from(document.querySelectorAll('input[data-name="skills"]')),
    /**
     * Unsaved data alert
     */
    dialog_unsaved: document.querySelector('.alert-unsaved'),
    /**
     * Spell Slots
     */
    spell_slots: Array.from(document.querySelectorAll('input[data-name=spell_slots]')),
    /**
     * Spell Lists
     */
    spell_lists: Array.from(document.querySelectorAll('ul[data-name=spells]')),
    /**
     * Calculate the attribute modifier based on the score
     * @return {String} 0, a negative number, or a positive number preceded by a +
     */
    calcAttrMod: function (val) {
        const raw = Math.floor((val - 10) / 2);
        return (raw > 0) ? `+${raw}` : raw.toString();
    },
    /**
     * Calculate the save modifier based on the score, proficiency, and prof bonus
     * and set it
     * @param {String} attr attribute name
     */
    calcSaveMod: function (attr) {
        let prof = 0;
        const attr_field = document.querySelector(`[data-name=${attr}]`).parentNode;
        const attr_mod = parseInt(attr_field.querySelector('.pc-attribute-mod').innerHTML, 10) || 0;
        const save_mod = attr_field.querySelector('.pc-save-mod');
        const checked = attr_field.querySelector('input[type=checkbox]').checked;
        if (checked) {
            prof = parseInt(document.querySelector('[data-name="proficiency"]').innerHTML, 10) || 0;
        }
        const raw = 0 + prof + attr_mod;
        save_mod.innerHTML = (raw > 0) ? `+${raw}` : raw.toString();
    },
    /**
     * Calculate the modifier for a skill based on proficiency and attribute
     * @param {Element} el the skill checkbox element
     */
    calcSkillMod: function (el) {
        const skill_checked = el.checked;
        const attribute = el.getAttribute('data-attr');
        const mod_field = el.parentNode.nextElementSibling;

        let prof = 0;
        if (skill_checked) {
            prof = parseInt(document.querySelector('[data-name="proficiency"]').innerHTML, 10) || 0;
        }
        const attr = document.querySelector(`[data-name=${attribute}]`);
        const attr_mod = parseInt(this.calcAttrMod(attr.value), 10);
        const raw = 0 + prof + attr_mod;
        mod_field.innerText = (raw > 0) ? `+${raw}` : raw;
    },
    /**
     * Calculate proficiency modifier based on level
     */
    calcProfMod: function () {
        const prof = document.querySelector(`[data-name=proficiency]`);
        const before = prof.innerHTML;
        const level = parseInt(document.querySelector(`[data-name=level]`).innerHTML, 10);
        const bonus = Math.ceil(level / 4) + 1;
        const after = `+${bonus}`;
        // did it change?
        if (before !== after) {
            prof.innerHTML = `+${bonus}`;
            // recalculate saves and skills
            this.attribute_fields.forEach((el) => {
                this.calcSaveMod(el.getAttribute('data-name'));
            });
            this.skill_checks.forEach((el) => {
                this.calcSkillMod(el);
            });
        }
    },
    /**
     * Save current data on contenteditable focus
     * @param {Object} e event object
     */
    contentEditableFocus: function (e) {
        if (e.target.getAttribute('contenteditable') === 'true') {
            e.target.setAttribute('data-before', e.target.innerHTML);
        }
    },
    /**
     * Contenteditable blue, check for change, update anything necessary
     * @param {Object} e event object
     */
    contentEditableBlur: function (e) {
        if (e.target.getAttribute('contenteditable') === 'true') {
            const before = e.target.getAttribute('data-before');
            // trim out spaces and ending linebreaks
            const cur_val = e.target.innerHTML;
            let trimmed_cur_val = cur_val.trim();
            trimmed_cur_val = trimmed_cur_val.replace(/(<br\/?>)+$/, '');
            if (trimmed_cur_val !== cur_val) {
                e.target.innerHTML = trimmed_cur_val;
            }

            if (before !== e.target.innerHTML) {
                e.target.removeAttribute('data-before');
                this.dialog_unsaved.hidden = false;

                // if level then update proficiency
                if (e.target.getAttribute('data-name') === 'level') {
                    this.calcProfMod();
                    return;
                }
                // Do something here... Save?
            }
        }
    },
    /**
     * When attributes change
     * @param {Object} e event object
     */
    attributeChange: function (e) {
        const field = e.target.parentNode;
        const mod_field = field.querySelector('.pc-attribute-mod');

        mod_field.innerText = this.calcAttrMod(e.currentTarget.value);
        const attr = e.target.getAttribute('data-name');
        this.calcSaveMod(attr);
        const skills = Array.from(document.querySelectorAll(`[data-attr=${attr}]`));
        skills.forEach((el) => {
            this.calcSkillMod(el);
        });
        this.dialog_unsaved.hidden = false;
    },
    /**
     * When a save is checked
     * @param {Object} e event object
     */
    saveChange: function (e) {
        const attr = e.currentTarget.getAttribute('data-subfield');
        this.calcSaveMod(attr);
        this.dialog_unsaved.hidden = false;
    },
    /**
     * When a skill is checked
     * @param {Object} e event object
     */
    skillChange: function (e) {
        this.calcSkillMod(e.currentTarget);
        this.dialog_unsaved.hidden = false;
    },
    /**
     * When a spell slot changes
     *  * @param {Object} e Change event object
     */
    spellSlotChange: function (e) {
        const spellLevel = e.target.getAttribute('data-subfield');
        const slots = parseInt(e.target.value, 10);
        const spellList = document.querySelector(`[data-name="spells"][data-subfield="${spellLevel}"]`);
        if (!slots) {
            // this covers 0 and NaN
            spellList.parentNode.hidden = true;
        } else {
            spellList.parentNode.hidden = false;
        }
        this.dialog_unsaved.hidden = false;
    },
    /**
     * Check for enter in a list to add a new LI
     * @param {Object} ev event object
     */
    listKeyPress: function (ev) {
        if (ev.key !== 'Enter' || ev.shiftKey) {
            return;
        }
        const currentItem = ev.target.tagName === 'LI' ? ev.target : ev.target.closest(`li`);
        if (!currentItem) {
            return;
        }
        ev.preventDefault();
        if (ev.currentTarget.lastElementChild === currentItem) {
            // If it's the list item we add another item.
            const newItem = document.createElement('li');
            newItem.setAttribute('contenteditable', 'true');
            ev.currentTarget.appendChild(newItem);
            newItem.focus();
        } else {
            // Focus on next element.
            const nextItem = currentItem.nextElementSibling;
            if (nextItem) {
                nextItem.focus();
            }
        }
    },
    /**
     * Check for enter in a def list to add a new div with dt/dd elements.
     * @param {Event} ev Keypress event
     */
    defListKeyPress: function(ev) {
        if (ev.key !== 'Enter' || ev.shiftKey) {
            return;
        }
        if (ev.target.tagName === 'DD' || ev.target.closest(`dd`)) {
            ev.preventDefault();
            const dd = ev.target.tagName === 'DD' ? ev.target : ev.target.closest(`dd`);
            const parent = dd.parentElement;
            if (parent === ev.currentTarget.lastElementChild) {
                const template = document.getElementById('defListItem');
                const div = document.importNode(template.content, true);
                // we have to get this element BEFORE we put it in the DOM for some reason.
                var dt = div.querySelector('dt');
                ev.currentTarget.appendChild(div);
                dt.focus();
            } else {
                const div = parent.nextElementSibling
                if (div) {
                    div.querySelector('dt').focus();
                }
            }
            return;
        }
        if (ev.target.tagName === 'DT' || ev.target.closest(`dt`)) {
            ev.preventDefault();
            // focus on the sibling DD
            const parent = ev.target.closest('div.defListPair');
            if (parent) {
                parent.querySelector('dd').focus();
            }
        }
    },
    /**
     * Run after the Manager renders a loaded/restored character
     */
    postRender: function () {
        this.calcProfMod();
        this.attribute_fields.forEach((el) => {
            const event = new Event('change');
            el.dispatchEvent(event);
        });
        this.dialog_unsaved.hidden = true;
    },
    /**
     * Add all the event handlers
     */
    initialize: function () {
        /**
         * Event: Listen for contenteditable changes
         * delegate focus/blur from container (body didn't seem to work)
         * use a temporary data-before attribute to check for change
         */
        document.querySelector('.container').addEventListener('focus', this.contentEditableFocus.bind(this), true);
        document.querySelector('.container').addEventListener('blur', this.contentEditableBlur.bind(this), true);
        /**
         * Event: When attributes change update the related modifier
         */
        this.attribute_fields.forEach((el) => {
            el.addEventListener('change', this.attributeChange.bind(this));
        });
        /**
         * Event: When save is checked recalc save mod
         */
        this.attribute_saves.forEach((el) => {
            el.addEventListener('change', this.saveChange.bind(this));
        });
        /**
         * Event: When a skill is un/checked adjust the modifier
         */
        this.skill_checks.forEach((el) => {
            el.addEventListener('change', this.skillChange.bind(this));
        });
        /**
         * Event: If spell slot changes, show show/hide spell list.
         */
        this.spell_slots.forEach((el) => {
            el.addEventListener('change', this.spellSlotChange.bind(this));
        });
        /**
         * Event: Add new li to spell lists when adding to the last item in the list
         */
        this.spell_lists.forEach((el) => {
            el.addEventListener('keypress', this.listKeyPress.bind(this));
        });

        Array.prototype.forEach.call(document.querySelectorAll('dl.list-vertical'), (el) => {
            el.addEventListener('keypress', this.defListKeyPress.bind(this));
        });
    }
};

export default ui;
