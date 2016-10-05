
/**
 * Confirm browser supports features we need
 * @return {boolean}
 */
const checkFeatures = function () {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// Ok for localstorage
	} else {
		return false;
	}
};

/**
 * Register service worker if it's supported
 */
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service_worker.js', {
		scope: '/'
	});
}

/**
 * Alert:
 * Main method for showing warnings and other interactions that need prominent placement/attention
 */
const Alert = {
	/**
	 * The DOMElement for the alert
	 */
	el: document.querySelector('.alert-main'),
	/**
	 * Add content to alert
	 * @param {Array|DOMElement} content single DOMElement or Array of DOMElements
	 */
	setContent: function (content) {
		if (!Array.isArray(content)) {
			content = [content];
		}
		this.clear(); // make sure we start with an empty alert
		const f = document.createDocumentFragment();
		content.forEach((el) => {
			f.appendChild(el);
		});
		const btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		btn.classList.add('close');
		btn.textContent = 'Close';
		f.appendChild(btn);
		this.el.appendChild(f);
	},
	/**
	 * Clear the alert (which makes it disappear)
	 */
	clear: function () {
		while (this.el.firstChild) {
			this.el.removeChild(this.el.firstChild);
		}
	},
	/**
	 * Setup some events, etc.
	 */
	initialize: function () {
		this.el.addEventListener('click', (e) => {
			if (e.target.classList.contains('close')) {
				// close button click
				e.preventDefault();
				this.clear();
			} else if (e.target.classList.contains('delete-conf')) {
				// delete confirmation
				const key = e.target.getAttribute('data-key');
				this.clear();
				Manager.deleteCharacter(key);
			}
		});
	}
};
Alert.initialize();

if (checkFeatures() === false) {
	// display some kind of alert at the top of the page.
	const p = document.createElement('p');
	p.textContent = `Sorry, your browser does not supported the required features for this app to work. Try using the latest Chrome or Firefox for best results.`;
	Alert.setContent(p);
}

/**
 * If AppCache is supported and used, this prompts for reloa
 */
if ('applicationCache' in window) {
	const updateAppCache = function (event) {
		const p = document.createElement('p');
		p.textContent = `Character Sheet has been updated with new features or bug fixes. Please reload the page to get the newest code. If you have this site open in multiple tabs/windows please close them all.`;
		Alert.setContent(p);
	}
	window.applicationCache.addEventListener('updateready', updateAppCache, false);
	if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
		updateAppCache();
	}
}

/**
 * Restore backup dialog
 */
const backup_dialog = document.querySelector('.dialog-backup');
backup_dialog.querySelector('button[type=button]').addEventListener('click', (e) => {
	backup_dialog.querySelector('form').reset();
	backup_dialog.classList.remove('open');
});
backup_dialog.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	const input_file = e.target.querySelector('input[type=file]');
	console.log(input_file.files);
	if (input_file.files && input_file.files.length > 0) {
		Array.from(input_file.files).forEach((f) => {
			const reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function (theFile) {
				return function (e) {
					Manager.restoreCharacter(e.target.result);
				};
			})(f);
			reader.readAsText(f);
		});
	} else {
		const input = e.target.querySelector('textarea');
		if (input.value === '') {
			return;
		}
		Manager.restoreCharacter(input.value);
	}
	backup_dialog.classList.remove('open');
	e.target.reset();
});

/**
 * Actions menu and button events
 */
const action_menu = document.querySelector('.app-actions');
const action_opener = document.querySelector('.btn-open-actions');
action_opener.addEventListener('click', (e) => {
	if (action_menu.classList.contains('open')) {
		// set menu to hide overflow BEFORE it closes
		action_menu.style.overflow = 'hidden';
	}
	action_menu.classList.toggle('open');
});
/**
 * When the menu transitions to open we want to set overflow to visible so the Load dropdown can be visible
 */
action_menu.addEventListener('transitionend', (e) => {
	console.log(e);
	const style = window.getComputedStyle(action_menu);
	if (style.getPropertyValue('max-height') !== '0px') {
		action_menu.style.overflow = 'visible';
	}
});
const action_btn_backup = action_menu.querySelector('.btn-file-backup');
if (typeof window.Blob !== 'function') {
	action_btn_backup.style.display = 'none';
}
action_btn_backup.addEventListener('click', (e) => {
	Manager.downloadBackup();
});
const action_btn_email = action_menu.querySelector('.btn-email-backup');
action_btn_email.addEventListener('click', (e) => {
	Manager.emailBackup();
});
const action_btn_save = action_menu.querySelector('.btn-save');
action_btn_save.addEventListener('click', (e) => {
	Manager.saveCharacter();
});
const action_btn_new = action_menu.querySelector('.btn-new-character');
action_btn_new.addEventListener('click', (e) => {
	// change hash to trigger new character?
	window.location.hash = `#${Manager.generateKey()}`;
});
const action_btn_restore = action_menu.querySelector('.btn-restore-backup');
action_btn_restore.addEventListener('click', (e) => {
	backup_dialog.classList.add('open');
});
const action_btn_load = action_menu.querySelector('.btn-load');
action_btn_load.addEventListener('click', (e) => {
	e.currentTarget.nextElementSibling.classList.toggle('open');
});

/**
 * Load Menu
 */
const LoadMenu = {
	/**
	 * DOMELement
	 */
	el: document.querySelector('#character_list'),
	/**
	 * Open menu
	 */
	open: function () {
		this.el.classList.add('open');
	},
	/**
	 * Close menu
	 */
	close: function () {
		this.el.classList.remove('open');
	},
	/**
	 * Add character to list
	 * @param {String} key
	 */
	addCharacter: function (key) {
		let data = Storage.get(key);
		
		if (data === '') {
			return;
		}
		try {
			data = JSON.parse(data);
			
			if (data.key && data.key !== '') {
				// check if it's already there
				const existing = this.el.querySelector(`a[href="#${data.key}"]`);
				if (existing !== null) {
					// update the text as appropriate
					existing.textContent = `${data.charname} (${data.charclass} ${data.level})`;
					return;
				}
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.textContent = `${data.charname} (${data.charclass} ${data.level})`;
				a.setAttribute('href', `#${data.key}`);
				li.appendChild(a);
				const del = document.createElement('a');
				del.classList.add('delete');
				del.innerHTML = '❌';
				del.setAttribute('href', '#');
				del.setAttribute('data-key', data.key);
				li.appendChild(del);
				this.el.querySelector('#saved_characters').appendChild(li);
			}
		} catch (e) {
			console.log(e.message);
		}
	},
	/**
	 * Remove character from list
	 * @param {String} key
	 */
	removeCharacter: function (key) {
		const loadlink = this.el.querySelector(`a[href="#${key}"]`);
		const li = loadlink.parentNode;
		li.parentNode.removeChild(li);
	},
	/**
	 * Do we have any saved characters here?
	 * @return {Boolean}
	 */
	isEmpty: function () {
		return this.el.querySelector('li') === null;
	},
	/**
	 * Set up event handlers
	 */
	initialize: function () {
		document.body.addEventListener('click', (e) => {
			const close = e.target.closest(`#${this.el.id}`);
			if (close === null) {
				// Ignore the load button (it's already handled elsewhere)
				if (e.target.classList.contains('btn-load')) { return; }
				// Hide the menus.
				this.close();
			} else {
				// delete link in load menu
				if (e.target.classList.contains('delete')) {
					e.preventDefault();
					console.log('delete!');
					Manager.deletePrompt(e.target.getAttribute('data-key'));
					this.close();
				}
			}
		});
	}
};
LoadMenu.initialize();

/**
 * Grab some arrays of DOM elements we might need multiple times
 */
const attribute_fields = Array.from(document.querySelectorAll('.pc-attributes input[type=number]'));
const attribute_saves = Array.from(document.querySelectorAll('.pc-attributes input[type=checkbox]'));
const skill_checks = Array.from(document.querySelectorAll('input[data-name="skills"]'));
const dialog_unsaved = document.querySelector('.alert-unsaved');

/**
 * Calculate the attribute modifier based on the score
 * @return {String|Number} 0, a negative number, or a positive number preceded by a +
 */
const calcAttrMod = function (val) {
	const raw = Math.floor((val - 10) / 2);
	return (raw > 0) ? `+${raw}` : raw;
};
/**
 * Calculate the save modifier based on the score, proficiency, and prof bonus
 * and set it
 * @param {String} attr attribute name
 */
const calcSaveMod = function (attr) {
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
};
/**
 * Calculate the modifier for a skill based on proficiency and attribute
 * @param {DOMElement} el the skill checkbox element
 */
const calcSkillMod = function (el) {
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
	const attr_mod = parseInt(calcAttrMod(attr.value), 10);
	const raw = 0 + prof + attr_mod;
	mod_field.innerText = (raw > 0) ? `+${raw}` : raw;
};

/**
 * Event: Listen for contenteditable changes
 * delegate focus/blur from container (body didn't seem to work)
 * use a temporary data-before attribute to check for change
 */
document.querySelector('.container').addEventListener('focus', (e) => {
	if (e.target.getAttribute('contenteditable') === 'true') {
		e.target.setAttribute('data-before', e.target.innerHTML);
	}
}, true);
document.querySelector('.container').addEventListener('blur', (e) => {
	if (e.target.getAttribute('contenteditable') === 'true') {
		const before = e.target.getAttribute('data-before');
		if (before !== e.target.innerHTML) {
			console.log('Changed');
			e.target.removeAttribute('data-before');
			dialog_unsaved.classList.add('open');
			
			// if proficiency then update saves and skills
			if (e.target.getAttribute('data-name') === 'proficiency') {
				const attribute_fields = Array.from(document.querySelectorAll('.pc-attributes input[type=number]'));
				attribute_fields.forEach((el) => {
					calcSaveMod(el.getAttribute('data-name'));
				});
				const skill_checks = Array.from(document.querySelectorAll('input[data-name="skills"]'));
				skill_checks.forEach((el) => {
					calcSkillMod(el);
				});
			}
			
			// Do something here... Save?
		}
	}
}, true);
/**
 * Event: When attributes change update the related modifier
 */
attribute_fields.forEach((el) => {
	const field = el.parentNode;
	const mod_field = field.querySelector('.pc-attribute-mod');
	el.addEventListener('change', (e) => {
		mod_field.innerText = calcAttrMod(e.currentTarget.value);
		const attr = el.getAttribute('data-name');
		calcSaveMod(attr);
		const skills = Array.from(document.querySelectorAll(`[data-attr=${attr}]`));
		skills.forEach((el) => {
			calcSkillMod(el);
		});
		dialog_unsaved.classList.add('open');
	});
});
/**
 * Event: When save is checked recalc save mod
 */
attribute_saves.forEach((el) => {
	el.addEventListener('change', (e) => {
		const attr = e.currentTarget.getAttribute('data-subfield');
		calcSaveMod(attr);
		dialog_unsaved.classList.add('open');
	});
});
/**
 * Event: When a skill is un/checked adjust the modifier
 */
skill_checks.forEach((el) => {
	el.addEventListener('change', (e) => {
		console.log('check change');
		calcSkillMod(e.currentTarget);
		dialog_unsaved.classList.add('open');
	});
});

/**
 * Model for character data
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
	armor_class: 10,
	speed: 30,
	hp_cur: 0,
	hp_max: 0,
	hd_cur: 1,
	hd_max: 1,
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
	equipment: '',
	cp: 0,
	sp: 0,
	gp: 0,
	pp: 0,
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
		0: '',
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
 * Storage:
 * Interface for localStorage
 */
const Storage = {
	/**
	 * Returns blank or the value for the key
	 * @param {String} key
	 * @return {String}
	 */
	get: function (key) {
		const txt = localStorage.getItem(key);
		return (txt !== null) ? txt : '';
	},
	/**
	 * Store a value for the key
	 * Warning: browsers vary for the amount of data you can store (usually ~5mb)
	 * @param {String} key
	 * @param {String} txt
	 * @return {Boolean} returns false on error
	 */
	set: function (key, txt) {
		try {
			localStorage.setItem(key, txt);
		} catch (e) {
			// Should only happen when over quota
			return false;
		}
		return true;
	},
	/**
	 * Remove a key
	 * @param {String} key
	 * @return void
	 */
	remove: function (key) {
		localStorage.removeItem(key);
	},
	/**
	 * Get an array of all keys
	 * @return {Array}
	 */
	getAllKeys: function () {
		const keys = [];
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length; i++) {
				keys.push(localStorage.key(i));
			}
		}
		return keys;
	}
};

/**
 * If we save based on character name key then we have to account for name changes to change the localStorage key..
 */

/**
 * Manager:
 * Interface for save/backup/restore of data...
 */
const Manager = exports.manager = {
	/**
	 * Currently loaded character data is here
	 */
	cur_character: null,
	/**
	 * Get a json string as a character backup of the current character
	 * In this way we make sure any new properties are included in the backup when saving
	 * @return {String}
	 */
	characterJSON: function () {
		const obj = {};
		for (const prop in this.cur_character) {
			obj[prop] = this.cur_character[prop];
		}
		return JSON.stringify(obj);
	},
	/**
	 * Return UTC datetime string for right now
	 * @return {String}
	 */
	currentTimestamp: function () {
		const d = new Date();
		return d.toUTCString();
	},
	/**
	 * Generate a random key for character storage
	 * make sure key is not already existing
	 * @return {String}
	 */
	generateKey: function () {
		let key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
		while (Storage.get(key) !== '') {
			key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
		}
		return key;
	},
	/**
	 * Set data on character object
	 */
	setCurCharacterData: function (data) {
		if (typeof data !== 'object') { return; }
		const props = Object.keys(data);
		props.forEach((prop) => {
			if (typeof this.cur_character[prop] !== 'undefined') {
				this.cur_character[prop] = data[prop];
			}
		});
	},
	/**
	 * Change the character based on a hash change
	 * or maybe I should process the event in the handler and pass it here if necessary...
	 * @param {Object} e event object from hash change
	 */
	changeCharacter: function () {
		const urlhash = window.location.hash.substr(1);
		console.log('changecharacter');
		this.loadCharacter(urlhash);
		LoadMenu.close();
	},
	/**
	 * Load character data based on a key
	 * @param {String} key character identifier...????
	 */
	loadCharacter: function (key) {
		console.log(`loadcharacter ${key}`);
		dialog_unsaved.classList.remove('open');
		const json = Storage.get(key);
		if (json === '') {
			console.log('no character found');
			// prompt to load backup?
			this.cur_character = Object.create(character_model);
			this.cur_character.key = key;
			this.renderCharacter();
			return;
		}
		const data = JSON.parse(json);
		
		this.cur_character = Object.create(character_model);
		this.setCurCharacterData(data);
		this.renderCharacter();
	},
	/**
	 * Take character data and fill it into the page
	 */
	renderCharacter: function () {
		if (this.cur_character === null) { return; }
		const fields = Array.from(document.querySelectorAll('*[data-name]'));
		fields.forEach((el) => {
			const f = el.getAttribute('data-name');
			if (typeof this.cur_character[f] === 'undefined') {
				return;
			}
			const subf = el.getAttribute('data-subfield');
			if (subf !== null) {
				if (typeof this.cur_character[f][subf] === 'undefined') {
					return;
				}
			}
			if (typeof this.cur_character[f] !== 'undefined') {
				switch (el.tagName) {
					case 'INPUT':
					case 'SELECT':
					case 'TEXTAREA':
						if (el.getAttribute('type') === 'checkbox') {
							const checked = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
							if (checked === 1) {
								el.checked = true;
							} else {
								el.checked = false;
							}
							break;
						}
						el.value = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
						const event = new Event('change');
						el.dispatchEvent(event);
						break;
					default:
						el.innerHTML = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
						break;
				}
			}
		});
		// Update attr/save/skill modifiers
		attribute_fields.forEach((el) => {
			const field = el.parentNode;
			const mod_field = field.querySelector('.pc-attribute-mod');
			mod_field.innerText = calcAttrMod(el.value);
			const attr = el.getAttribute('data-name');
			calcSaveMod(attr);
			const skills = Array.from(document.querySelectorAll(`[data-attr=${attr}]`));
			skills.forEach((el) => {
				calcSkillMod(el);
			});
		});
		dialog_unsaved.classList.remove('open');
	},
	/**
	 * Save character data to localStorage
	 */
	saveCharacter: function () {
		console.log('save');
		if (this.cur_character === null) {
			this.cur_character = Object.create(character_model);
		}
		const fields = Array.from(document.querySelectorAll('*[data-name]'));
		fields.forEach((el) => {
			const f = el.getAttribute('data-name');
			if (typeof this.cur_character[f] === 'undefined') {
				return;
			}
			const subf = el.getAttribute('data-subfield');
			if (subf !== null) {
				if (typeof this.cur_character[f][subf] === 'undefined') {
					return;
				}
				// for some reason trying to set the property of an object that is a property on the prototype
				// does not get the object to exist as an own property...
				if (!this.cur_character.hasOwnProperty(f)) {
					this.cur_character[f] = character_model[f];
				}
			}
			switch (el.tagName) {
				case 'INPUT':
				case 'SELECT':
				case 'TEXTAREA':
					if (el.getAttribute('type') === 'checkbox') {
						const checked = el.checked ? 1 : 0;
						if (subf) {
							this.cur_character[f][subf] = checked;
						} else {
							this.cur_character[f] = checked;
						}
						break;
					}
					if (subf) {
						this.cur_character[f][subf] = el.value;
					} else {
						this.cur_character[f] = el.value;
					}
					break;
				default:
					if (subf) {
						this.cur_character[f][subf] = el.innerHTML;
					} else {
						this.cur_character[f] = el.innerHTML;
					}
					break;
			}
		});
		this.cur_character.updated = this.currentTimestamp();
		Storage.set(this.cur_character.key, JSON.stringify(this.cur_character));
		dialog_unsaved.classList.remove('open');
		LoadMenu.addCharacter(this.cur_character.key);
	},
	/**
	 * Save a file of the current character
	 * Falls back to showing the data for copy/pasting
	 */
	downloadBackup: function () {
		const data = this.characterJSON();
		if (typeof window.Blob !== 'function') {
			// fallback to displaying the data for copy/pasting
			const content = [];
			const p = document.createElement('p');
			p.innerHTML = `Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.`;
			const text = document.createElement('textarea');
			text.classList.add('large');
			text.value = data;
			content.push(p);
			content.push(text);
			Alert.setContent(content);
			text.focus();
			text.select();
			return;
		}
		// for env that support it, create a file for download
		const a = document.createElement('a');
		const file = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(file);
		a.href = url;
		a.download = `character_${this.cur_character.charname}`;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	},
	/**
	 * Open an email with the character data and instructions
	 */
	emailBackup: function () {
		const data = this.characterJSON();
		const body = `Below is the backup data for your character ${this.cur_character.charname}.
		
To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.
		
---
		
${data}`;
		
		const url = `mailto:?subject=${encodeURIComponent(`Character backup ${this.cur_character.charname}`)}&body=${encodeURIComponent(body)}`;
		
		// Sadly this simple solution doesn't work in iOS
		// document.location.href = url;
		const content = [];
		const a = document.createElement('a');
		a.href = url;
		a.innerHTML = 'Open new message in default email client';
		a.addEventListener('click', (e) => {
			Alert.clear();
		});
		content.push(a);
		Alert.setContent(content);
	},
	/**
	 * Take json backup data and load the character
	 * @param {String} data JSON data (we hope)
	 */
	restoreCharacter: function (data) {
		console.log('restoreCharacter');
		try {
			// strip out everything before the first "{" and after the last "}"
			data = data.substring(data.indexOf('{'));
			data = data.substring(0, data.lastIndexOf('}')+1);
			data = data.trim(); // just in case
			// convert linebreaks to html br else JSON.parse breaks
			data = data.replace(/(?:\r\n|\r|\n)/g, '<br/>');
			const char_obj = JSON.parse(data);
			if (!char_obj.key || char_obj.app !== 'character-sheet-5e') {
				throw new Error('Data appears to be invalid.');
			}
			const ex_char = Storage.get(char_obj.key);
			if (ex_char !== '' && ex_char.charname !== char_obj.charname) {
				// existing key but different name
				if (!char_obj.key_prev) {
					char_obj.key_prev = char_obj.key;
					char_obj.key = this.generateKey();
				} else {
					const temp_key = char_obj.key_prev;
					char_obj.key_prev = char_obj.key;
					char_obj.key = temp_key;
				}
			}
			
			Storage.set(char_obj.key, JSON.stringify(char_obj));
			LoadMenu.addCharacter(char_obj.key);
			// if its the current character we should reload them
			if (char_obj.key === this.cur_character.key) {
				this.loadCharacter(char_obj.key);
			}
		} catch (e) {
			const p = document.createElement('p');
			p.innerHTML = `Error processing backup data: ${e.message}`;
			Alert.setContent(p);
		}
	},
	/**
	 * Prompt to confirm deletion of character
	 * @param {String} key character key
	 */
	deletePrompt: function (key) {
		let data = Storage.get(key);
		if (data === '') {
			return;
		}
		try {
			data = JSON.parse(data);
		} catch (e) {
			return;
		}
		const content = [];
		const p = document.createElement('p');
		p.innerHTML = `Are you sure you want to delete the character: ${(data.charname) ? data.charname : '[Unnamed]'}`;
		content.push(p);
		const btn = document.createElement('button');
		btn.innerHTML = 'Yes, Delete.';
		btn.setAttribute('data-key', data.key);
		btn.classList.add('delete-conf');
		content.push(btn);
		Alert.setContent(content);
	},
	/**
	 * Delete a character from local storage
	 * @param {String} key character key
	 */
	deleteCharacter: function (key) {
		if (key === '' || key === 'settings') { return; }
		Storage.remove(key);
		if (Storage.get(key) !== '') {
			// error
			const p = document.createElement('p');
			p.innerHTML = `Error deleting the character...`;
			Alert.setContent(p);
		} else {
			// success
			// remove from load list
			LoadMenu.removeCharacter(key);
			// if its the current character we should trigger "new character" action
			if (this.cur_character !== null && this.cur_character.key === key) {
				window.location.hash = `#${Manager.generateKey()}`;
			}
		}
	}
};

/**
 * Load the saved characters into the dropdown
 */
Storage.getAllKeys().forEach((key) => {
	LoadMenu.addCharacter(key);
});

/**
 * If there are no saved characters, display a first time user message
 */
if (LoadMenu.isEmpty()) {
	const content = [];
	const h = document.createElement('h2');
	h.innerHTML = 'Character Sheet. 5e.';
	content.push(h);
	const p1 = document.createElement('p');
	p1.innerHTML = `An online character sheet for 5th edition D&D, usable offline (in some browsers).`;
	content.push(p1);
	const p4 = document.createElement('p');
	p4.innerHTML = `Designed for modern browsers, if all else fails Chrome is your best bet and IE is your worst bet.`;
	content.push(p4);
	const p2 = document.createElement('p');
	p2.innerHTML = `<strong>Warning:</strong> Character data is saved to your browser's local storage. This means it can be erased if you delete browser data and will not automatically transfer between browsers even on the same computer. Please Save and Backup often (or at least at the end of every gaming session)!`;
	content.push(p2);
	const p3 = document.createElement('p');
	p3.innerHTML = `This message will only appear until you save your first character.`;
	content.push(p3);
	Alert.setContent(content);
}

/**
 * Event: Listen for hashchange and change the current character
 */
window.addEventListener('hashchange', (e) => { Manager.changeCharacter(); }, false);

/**
 * Check the hash to see if we need to load a specific character
 */
const urlhash = window.location.hash.substr(1);
if (urlhash !== '') {
	Manager.loadCharacter(urlhash);
} else {
	window.location.hash = `#${Manager.generateKey()}`;
}

/**
 * Help
 */
const dialog_help = document.getElementById('dialog_help');
const help_open = document.querySelector('.btn-help');
help_open.addEventListener('click', (e) => {
	dialog_help.classList.add('open');
	dialog_help.querySelector('h1').focus();
});
dialog_help.querySelector('.close').addEventListener('click', (e) => {
	dialog_help.classList.remove('open');
});
document.body.addEventListener('click', (e) => {
	const close = e.target.closest('#dialog_help');
	if (close === null) {
		if (e.target.classList.contains('btn-help')) { return; }
		// Hide the help.
		dialog_help.classList.remove('open');
	}
});
