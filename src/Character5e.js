/**
 * Exports:
 * model: Model for 5e character data
 * ui: events/handlers/functions
 */
const character_model = {
	app: 'character-sheet-5e',
	key: '',
	charname: '',
	charclass: '',
	race: '',
	background: '',
	alignment: '',
	level: 1,
	experience: 0,
	inspiration: '',
	proficiency: '+2',
	armor_class: '',
	speed: 30,
	hp_cur: '',
	hp_max: '',
	hd_cur: '',
	hd_max: '',
	str: 10,
	dex: 10,
	con: 10,
	intel: 10,
	wis: 10,
	cha: 10,
	saves: {
		'str': 0,
		'dex': 0,
		'con': 0,
		'intel': 0,
		'wis': 0,
		'cha': 0
	},
	skills: {
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
	weapons: '',
	proficiencies_other: '',
	languages: '',
	traits: '',
	ideals: '',
	bonds: '',
	flaws: '',
	appearance: '',
	equipment: '',
	cp: '',
	sp: '',
	gp: '',
	pp: '',
	features: '',
	notes: '',
	spell_ability: '',
	spell_save: '',
	spell_attack: '',
	spell_slots: {
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
	spells: {
		0: [],
		1: '',
		2: '',
		3: '',
		4: '',
		5: '',
		6: '',
		7: '',
		8: '',
		9: ''
	},
	updated: ''
};

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
	 * Spell Lists
	 */
	spell_lists: Array.from(document.querySelectorAll('ul[data-name=spells]')),
	/**
	 * Calculate the attribute modifier based on the score
	 * @return {String|Number} 0, a negative number, or a positive number preceded by a +
	 */
	calcAttrMod: function (val) {
		const raw = Math.floor((val - 10) / 2);
		return (raw > 0) ? `+${raw}` : raw;
	},
	/**
	 * Calculate the save modifier based on the score, proficiency, and prof bonus
	 * and set it
	 * @param {String} attr attribute name
	 */
	calcSaveMod: function (attr) {
		let prof = 0;
		const attr_field = document.querySelector(`[data-name=${attr}]`).parentNode;
		const attr_mod = attr_field.querySelector('.pc-attribute-mod').innerHTML;
		const save_mod = attr_field.querySelector('.pc-save-mod');
		const checked = attr_field.querySelector('input[type=checkbox]').checked;
		if (checked) {
			prof = document.querySelector('[data-name="proficiency"]').innerHTML;
			if (prof === '') {
				prof = 0;
			} else {
				prof = parseInt(prof, 10);
			}
		}
		const raw = 0 + parseInt(prof, 10) + parseInt(attr_mod, 10);
		save_mod.innerHTML = (raw > 0) ? `+${raw}` : raw;
	},
	/**
	 * Calculate the modifier for a skill based on proficiency and attribute
	 * @param {DOMElement} el the skill checkbox element
	 */
	calcSkillMod: function (el) {
		const skill_checked = el.checked;
		const attribute = el.getAttribute('data-attr');
		const mod_field = el.parentNode.nextElementSibling;
		
		let prof = 0;
		if (skill_checked) {
			prof = document.querySelector('[data-name="proficiency"]').innerHTML;
			if (prof === '') {
				prof = 0;
			} else {
				prof = parseInt(prof, 10);
			}
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
				this.dialog_unsaved.classList.add('open');
				
				// if level then update proficiency
				if (e.target.getAttribute('data-name') === 'level') {
					this.calcProfMod();
					return;
				}
				// if spell slot changes then show/hide spell level list
				if (e.target.getAttribute('data-name') === 'spell_slots') {
					const slevel = e.target.getAttribute('data-subfield');
					const slots = parseInt(e.target.innerHTML, 10);
					const spelllist = document.querySelector(`[data-name="spells"][data-subfield="${slevel}"]`);
					if (!slots) {
						// this covers 0 and NaN
						spelllist.parentNode.classList.add('hidden');
					} else {
						spelllist.parentNode.classList.remove('hidden');
					}
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
		this.dialog_unsaved.classList.add('open');
	},
	/**
	 * When a save is checked
	 * @param {Object} e event object
	 */
	saveChange: function (e) {
		const attr = e.currentTarget.getAttribute('data-subfield');
		this.calcSaveMod(attr);
		this.dialog_unsaved.classList.add('open');
	},
	/**
	 * When a skill is checked
	 * @param {Object} e event object
	 */
	skillChange: function (e) {
		this.calcSkillMod(e.currentTarget);
		this.dialog_unsaved.classList.add('open');
	},
	/**
	 * Check for enter in spell list to add a new LI
	 * @param {Object} e event object
	 */
	spellKeyPress: function (e) {
		if (e.target.tagName === 'LI' || e.target.closest(`li`)) {
			if (e.which === 13) {
				e.preventDefault();
				const li = document.createElement('li');
				li.setAttribute('contenteditable', 'true');
				e.currentTarget.appendChild(li);
				li.focus();
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
		this.dialog_unsaved.classList.remove('open');
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
		 * Event: Add new li to spell lists when adding to the last item in the list
		 */
		this.spell_lists.forEach((el) => {
			el.addEventListener('keypress', this.spellKeyPress.bind(this));
		});
	}
};

module.exports = {
	model: character_model,
	ui: ui
};
