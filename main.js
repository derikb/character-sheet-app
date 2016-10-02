(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.charsheet = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Confirm browser supports features we need
 * @return {boolean}
 */
var checkFeatures = function checkFeatures() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// Ok for localstorage
	} else {
		return false;
	}
};

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service_worker.js', {
		scope: '/pc/'
	});
}

/**
 * Alert:
 * Main method for showing warnings and other interactions that need prominent placement/attention
 */
var Alert = {
	/**
  * The DOMElement for the alert
  */
	el: document.querySelector('.alert-main'),
	/**
  * Add content to alert
  * @param {Array|DOMElement} content single DOMElement or Array of DOMElements
  */
	setContent: function setContent(content) {
		if (!Array.isArray(content)) {
			content = [content];
		}
		this.clear(); // make sure we start with an empty alert
		var f = document.createDocumentFragment();
		content.forEach(function (el) {
			f.appendChild(el);
		});
		var btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		btn.classList.add('close');
		btn.textContent = 'Close';
		f.appendChild(btn);
		this.el.appendChild(f);
	},
	/**
  * Clear the alert (which makes it disappear)
  */
	clear: function clear() {
		while (this.el.firstChild) {
			this.el.removeChild(this.el.firstChild);
		}
	},
	/**
  * Setup some events, etc.
  */
	initialize: function initialize() {
		var _this = this;

		this.el.addEventListener('click', function (e) {
			if (e.target.classList.contains('close')) {
				// close button click
				e.preventDefault();
				_this.clear();
			} else if (e.target.classList.contains('delete-conf')) {
				// delete confirmation
				var key = e.target.getAttribute('data-key');
				_this.clear();
				Manager.deleteCharacter(key);
			}
		});
	}
};
Alert.initialize();

if (checkFeatures() === false) {
	// display some kind of alert at the top of the page.
	var p = document.createElement('p');
	p.textContent = 'Sorry, your browser does not supported the required features for this app to work. Try using the latest Chrome or Firefox for best results.';
	Alert.setContent(p);
}

/**
 * Restore backup dialog
 */
var backup_dialog = document.querySelector('.dialog-backup');
backup_dialog.querySelector('button[type=button]').addEventListener('click', function (e) {
	backup_dialog.querySelector('form').reset();
	backup_dialog.classList.remove('open');
});
backup_dialog.querySelector('form').addEventListener('submit', function (e) {
	e.preventDefault();
	var input_file = e.target.querySelector('input[type=file]');
	console.log(input_file.files);
	if (input_file.files && input_file.files.length > 0) {
		Array.from(input_file.files).forEach(function (f) {
			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = function (theFile) {
				return function (e) {
					Manager.restoreCharacter(e.target.result);
				};
			}(f);
			reader.readAsText(f);
		});
	} else {
		var input = e.target.querySelector('textarea');
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
var action_menu = document.querySelector('.app-actions');
var action_opener = document.querySelector('.btn-open-actions');
action_opener.addEventListener('click', function (e) {
	if (action_menu.classList.contains('open')) {
		// set menu to hide overflow BEFORE it closes
		action_menu.style.overflow = 'hidden';
	}
	action_menu.classList.toggle('open');
});
/**
 * When the menu transitions to open we want to set overflow to visible so the Load dropdown can be visible
 */
action_menu.addEventListener('transitionend', function (e) {
	console.log(e);
	var style = window.getComputedStyle(action_menu);
	if (style.getPropertyValue('max-height') !== '0px') {
		action_menu.style.overflow = 'visible';
	}
});
var action_btn_backup = action_menu.querySelector('.btn-file-backup');
if (typeof window.Blob !== 'function') {
	action_btn_backup.style.display = 'none';
}
action_btn_backup.addEventListener('click', function (e) {
	Manager.downloadBackup();
});
var action_btn_email = action_menu.querySelector('.btn-email-backup');
action_btn_email.addEventListener('click', function (e) {
	Manager.emailBackup();
});
var action_btn_save = action_menu.querySelector('.btn-save');
action_btn_save.addEventListener('click', function (e) {
	Manager.saveCharacter();
});
var action_btn_new = action_menu.querySelector('.btn-new-character');
action_btn_new.addEventListener('click', function (e) {
	// change hash to trigger new character?
	window.location.hash = '#' + Manager.generateKey();
});
var action_btn_restore = action_menu.querySelector('.btn-restore-backup');
action_btn_restore.addEventListener('click', function (e) {
	backup_dialog.classList.add('open');
});
var action_btn_load = action_menu.querySelector('.btn-load');
action_btn_load.addEventListener('click', function (e) {
	e.currentTarget.nextElementSibling.classList.toggle('open');
});

/**
 * Load Menu
 */
var LoadMenu = {
	/**
  * DOMELement
  */
	el: document.querySelector('#character_list'),
	/**
  * Open menu
  */
	open: function open() {
		this.el.classList.add('open');
	},
	/**
  * Close menu
  */
	close: function close() {
		this.el.classList.remove('open');
	},
	/**
  * Add character to list
  * @param {String} key
  */
	addCharacter: function addCharacter(key) {
		var data = Storage.get(key);

		if (data === '') {
			return;
		}
		try {
			data = JSON.parse(data);

			if (data.key && data.key !== '') {
				// check if it's already there
				var existing = this.el.querySelector('a[href="#' + data.key + '"]');
				if (existing !== null) {
					// update the text as appropriate
					existing.textContent = data.charname + ' (' + data.charclass + ' ' + data.level + ')';
					return;
				}
				var li = document.createElement('li');
				var a = document.createElement('a');
				a.textContent = data.charname + ' (' + data.charclass + ' ' + data.level + ')';
				a.setAttribute('href', '#' + data.key);
				li.appendChild(a);
				var del = document.createElement('a');
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
	removeCharacter: function removeCharacter(key) {
		var loadlink = this.el.querySelector('a[href="#' + key + '"]');
		var li = loadlink.parentNode;
		li.parentNode.removeChild(li);
	},
	/**
  * Do we have any saved characters here?
  * @return {Boolean}
  */
	isEmpty: function isEmpty() {
		return this.el.querySelector('li') === null;
	},
	/**
  * Set up event handlers
  */
	initialize: function initialize() {
		var _this2 = this;

		document.body.addEventListener('click', function (e) {
			var close = e.target.closest('#' + _this2.el.id);
			if (close === null) {
				// Ignore the load button (it's already handled elsewhere)
				if (e.target.classList.contains('btn-load')) {
					return;
				}
				// Hide the menus.
				_this2.close();
			} else {
				// delete link in load menu
				if (e.target.classList.contains('delete')) {
					e.preventDefault();
					console.log('delete!');
					Manager.deletePrompt(e.target.getAttribute('data-key'));
					_this2.close();
				}
			}
		});
	}
};
LoadMenu.initialize();

/**
 * Grab some arrays of DOM elements we might need multiple times
 */
var attribute_fields = Array.from(document.querySelectorAll('.pc-attributes input[type=number]'));
var attribute_saves = Array.from(document.querySelectorAll('.pc-attributes input[type=checkbox]'));
var skill_checks = Array.from(document.querySelectorAll('input[data-name="skills"]'));

/**
 * Calculate the attribute modifier based on the score
 * @return {String|Number} 0, a negative number, or a positive number preceded by a +
 */
var calcAttrMod = function calcAttrMod(val) {
	var raw = Math.floor((val - 10) / 2);
	return raw > 0 ? '+' + raw : raw;
};
/**
 * Calculate the save modifier based on the score, proficiency, and prof bonus
 * and set it
 * @param {String} attr attribute name
 */
var calcSaveMod = function calcSaveMod(attr) {
	var prof = 0;
	var attr_field = document.querySelector('[data-name=' + attr + ']').parentNode;
	var attr_mod = attr_field.querySelector('.pc-attribute-mod').innerHTML;
	var save_mod = attr_field.querySelector('.pc-save-mod');
	var checked = attr_field.querySelector('input[type=checkbox]').checked;
	if (checked) {
		prof = document.querySelector('[data-name="proficiency"]').innerHTML;
		if (prof === '') {
			prof = 0;
		} else {
			prof = parseInt(prof, 10);
		}
	}
	var raw = 0 + parseInt(prof, 10) + parseInt(attr_mod, 10);
	save_mod.innerHTML = raw > 0 ? '+' + raw : raw;
};
/**
 * Calculate the modifier for a skill based on proficiency and attribute
 * @param {DOMElement} el the skill checkbox element
 */
var calcSkillMod = function calcSkillMod(el) {
	var skill_checked = el.checked;
	var attribute = el.getAttribute('data-attr');
	var mod_field = el.parentNode.nextElementSibling;

	var prof = 0;
	if (skill_checked) {
		prof = document.querySelector('[data-name="proficiency"]').innerHTML;
		if (prof === '') {
			prof = 0;
		} else {
			prof = parseInt(prof, 10);
		}
	}
	var attr = document.querySelector('[data-name=' + attribute + ']');
	var attr_mod = parseInt(calcAttrMod(attr.value), 10);
	var raw = 0 + prof + attr_mod;
	mod_field.innerText = raw > 0 ? '+' + raw : raw;
};

/**
 * Event: Listen for contenteditable changes
 * delegate focus/blur from container (body didn't seem to work)
 * use a temporary data-before attribute to check for change
 */
document.querySelector('.container').addEventListener('focus', function (e) {
	if (e.target.getAttribute('contenteditable') === 'true') {
		e.target.setAttribute('data-before', e.target.innerHTML);
	}
}, true);
document.querySelector('.container').addEventListener('blur', function (e) {
	if (e.target.getAttribute('contenteditable') === 'true') {
		var before = e.target.getAttribute('data-before');
		if (before !== e.target.innerHTML) {
			console.log('Changed');
			e.target.removeAttribute('data-before');

			// if proficiency then update saves and skills
			if (e.target.getAttribute('data-name') === 'proficiency') {
				var _attribute_fields = Array.from(document.querySelectorAll('.pc-attributes input[type=number]'));
				_attribute_fields.forEach(function (el) {
					calcSaveMod(el.getAttribute('data-name'));
				});
				var _skill_checks = Array.from(document.querySelectorAll('input[data-name="skills"]'));
				_skill_checks.forEach(function (el) {
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
attribute_fields.forEach(function (el) {
	var field = el.parentNode;
	var mod_field = field.querySelector('.pc-attribute-mod');
	el.addEventListener('change', function (e) {
		mod_field.innerText = calcAttrMod(e.currentTarget.value);
		var attr = el.getAttribute('data-name');
		calcSaveMod(attr);
		var skills = Array.from(document.querySelectorAll('[data-attr=' + attr + ']'));
		skills.forEach(function (el) {
			calcSkillMod(el);
		});
	});
});
/**
 * Event: When save is checked recalc save mod
 */
attribute_saves.forEach(function (el) {
	el.addEventListener('change', function (e) {
		var attr = e.currentTarget.getAttribute('data-subfield');
		calcSaveMod(attr);
	});
});
/**
 * Event: When a skill is un/checked adjust the modifier
 */
skill_checks.forEach(function (el) {
	el.addEventListener('change', function (e) {
		console.log('check change');
		calcSkillMod(e.currentTarget);
	});
});

/**
 * Model for character data
 */
var character_model = {
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
	}
};
// @todo add an app property once we decide on the app name
// @todo add a last updated prop?

/**
 * Storage:
 * Interface for localStorage
 */
var Storage = {
	/**
  * Returns blank or the value for the key
  * @param {String} key
  * @return {String}
  */
	get: function get(key) {
		var txt = localStorage.getItem(key);
		return txt !== null ? txt : '';
	},
	/**
  * Store a value for the key
  * Warning: browsers vary for the amount of data you can store (usually ~5mb)
  * @param {String} key
  * @param {String} txt
  * @return {Boolean} returns false on error
  */
	set: function set(key, txt) {
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
	remove: function remove(key) {
		localStorage.removeItem(key);
	},
	/**
  * Get an array of all keys
  * @return {Array}
  */
	getAllKeys: function getAllKeys() {
		var keys = [];
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
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
var Manager = {
	/**
  * Currently loaded character data is here
  */
	cur_character: null,
	/**
  * Generate a random key for character storage
  * @return {String}
  */
	generateKey: function generateKey() {
		return (Math.random().toString(36) + '00000000000000000').slice(2, 9);
	},
	/**
  * Set data on character object
  */
	setCurCharacterData: function setCurCharacterData(data) {
		var _this3 = this;

		if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
			return;
		}
		var props = Object.keys(data);
		props.forEach(function (prop) {
			if (typeof _this3.cur_character[prop] !== 'undefined') {
				_this3.cur_character[prop] = data[prop];
			}
		});
	},
	/**
  * Change the character based on a hash change
  * or maybe I should process the event in the handler and pass it here if necessary...
  * @param {Object} e event object from hash change
  */
	changeCharacter: function changeCharacter() {
		var urlhash = window.location.hash.substr(1);
		console.log('changecharacter');
		this.loadCharacter(urlhash);
		LoadMenu.close();
	},
	/**
  * Load character data based on a key
  * @param {String} key character identifier...????
  */
	loadCharacter: function loadCharacter(key) {
		console.log('loadcharacter ' + key);
		var json = Storage.get(key);
		if (json === '') {
			console.log('no character found');
			// prompt to load backup?
			this.cur_character = Object.create(character_model);
			this.cur_character.key = key;
			this.renderCharacter();
			return;
		}
		var data = JSON.parse(json);

		this.cur_character = Object.create(character_model);
		this.setCurCharacterData(data);
		this.renderCharacter();
	},
	/**
  * Take character data and fill it into the page
  */
	renderCharacter: function renderCharacter() {
		var _this4 = this;

		if (this.cur_character === null) {
			return;
		}
		var fields = Array.from(document.querySelectorAll('*[data-name]'));
		fields.forEach(function (el) {
			var f = el.getAttribute('data-name');
			if (typeof _this4.cur_character[f] === 'undefined') {
				return;
			}
			var subf = el.getAttribute('data-subfield');
			if (subf !== null) {
				if (typeof _this4.cur_character[f][subf] === 'undefined') {
					return;
				}
			}
			if (typeof _this4.cur_character[f] !== 'undefined') {
				switch (el.tagName) {
					case 'INPUT':
					case 'SELECT':
					case 'TEXTAREA':
						if (el.getAttribute('type') === 'checkbox') {
							var checked = subf ? _this4.cur_character[f][subf] : _this4.cur_character[f];
							if (checked === 1) {
								el.checked = true;
							} else {
								el.checked = false;
							}
							break;
						}
						el.value = subf ? _this4.cur_character[f][subf] : _this4.cur_character[f];
						var event = new Event('change');
						el.dispatchEvent(event);
						break;
					default:
						el.innerHTML = subf ? _this4.cur_character[f][subf] : _this4.cur_character[f];
						break;
				}
			}
		});
		// Update attr/save/skill modifiers
		attribute_fields.forEach(function (el) {
			var field = el.parentNode;
			var mod_field = field.querySelector('.pc-attribute-mod');
			mod_field.innerText = calcAttrMod(el.value);
			var attr = el.getAttribute('data-name');
			calcSaveMod(attr);
			var skills = Array.from(document.querySelectorAll('[data-attr=' + attr + ']'));
			skills.forEach(function (el) {
				calcSkillMod(el);
			});
		});
	},
	/**
  * Save character data to localStorage
  */
	saveCharacter: function saveCharacter() {
		var _this5 = this;

		console.log('save');
		if (this.cur_character === null) {
			this.cur_character = Object.create(character_model);
		}
		var fields = Array.from(document.querySelectorAll('*[data-name]'));
		fields.forEach(function (el) {
			var f = el.getAttribute('data-name');
			if (typeof _this5.cur_character[f] === 'undefined') {
				return;
			}
			var subf = el.getAttribute('data-subfield');
			if (subf !== null) {
				if (typeof _this5.cur_character[f][subf] === 'undefined') {
					return;
				}
				// for some reason trying to set the property of an object that is a property on the prototype
				// does not get the object to exist as an own property...
				if (!_this5.cur_character.hasOwnProperty(f)) {
					_this5.cur_character[f] = character_model[f];
				}
			}
			switch (el.tagName) {
				case 'INPUT':
				case 'SELECT':
				case 'TEXTAREA':
					if (el.getAttribute('type') === 'checkbox') {
						var checked = el.checked ? 1 : 0;
						if (subf) {
							_this5.cur_character[f][subf] = checked;
						} else {
							_this5.cur_character[f] = checked;
						}
						break;
					}
					if (subf) {
						_this5.cur_character[f][subf] = el.value;
					} else {
						_this5.cur_character[f] = el.value;
					}
					break;
				default:
					if (subf) {
						_this5.cur_character[f][subf] = el.innerHTML;
					} else {
						_this5.cur_character[f] = el.innerHTML;
					}
					break;
			}
		});
		Storage.set(this.cur_character.key, JSON.stringify(this.cur_character));
		LoadMenu.addCharacter(this.cur_character.key);
	},
	/**
  * Save a file of the current character
  * Falls back to showing the data for copy/pasting
  */
	downloadBackup: function downloadBackup() {
		var data = JSON.stringify(this.cur_character);
		if (typeof window.Blob !== 'function') {
			// fallback to displaying the data for copy/pasting
			var content = [];
			var _p = document.createElement('p');
			_p.innerHTML = 'Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.';
			var text = document.createElement('textarea');
			text.classList.add('large');
			text.value = data;
			content.push(_p);
			content.push(text);
			Alert.setContent(content);
			text.focus();
			text.select();
			return;
		}
		// for env that support it, create a file for download
		var a = document.createElement('a');
		var file = new Blob([data], { type: 'application/json' });
		var url = URL.createObjectURL(file);
		a.href = url;
		a.download = 'character_' + this.cur_character.charname;
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
	emailBackup: function emailBackup() {
		var data = JSON.stringify(this.cur_character);
		var body = 'Below is the backup data for your character ' + this.cur_character.charname + '.\n\t\t\nTo use this data, go to: ' + window.location.href + ' and click the "Restore Backup" button. Then paste the text below into the box.\n\t\t\n---\n\t\t\n' + data;

		var url = 'mailto:?subject=' + encodeURIComponent('Character backup ' + this.cur_character.charname) + '&body=' + encodeURIComponent(body);

		// Sadly this simple solution doesn't work in iOS
		// document.location.href = url;
		var content = [];
		var a = document.createElement('a');
		a.href = url;
		a.innerHTML = 'Open new message in default email client';
		a.addEventListener('click', function (e) {
			Alert.clear();
		});
		content.push(a);
		Alert.setContent(content);
	},
	/**
  * Take json backup data and load the character
  * @param {String} data JSON data (we hope)
  */
	restoreCharacter: function restoreCharacter(data) {
		console.log('restoreCharacter');
		data = data.trim();
		try {
			// convert linebreaks to html br else JSON.parse breaks
			data = data.replace(/(?:\r\n|\r|\n)/g, '<br/>');
			var char_obj = JSON.parse(data);
			// @todo imrpove validation?
			// @todo somehow make sure we didnt end up with the same key for different characters (test against what?)
			if (!char_obj.key || !char_obj.charname) {
				throw 'Data appears to be invalid.';
			}
			Storage.set(char_obj.key, data);
			LoadMenu.addCharacter(char_obj.key);
			// if its the current character we should reload them
			if (char_obj.key === this.cur_character.key) {
				this.loadCharacter(char_obj.key);
			}
		} catch (e) {
			var _p2 = document.createElement('p');
			_p2.innerHTML = 'Error processing backup data: ' + e.message;
			Alert.setContent(_p2);
		}
	},
	/**
  * Prompt to confirm deletion of character
  * @param {String} key character key
  */
	deletePrompt: function deletePrompt(key) {
		var data = Storage.get(key);
		if (data === '') {
			return;
		}
		try {
			data = JSON.parse(data);
		} catch (e) {
			return;
		}
		var content = [];
		var p = document.createElement('p');
		p.innerHTML = 'Are you sure you want to delete the character: ' + (data.charname ? data.charname : '[Unnamed]');
		content.push(p);
		var btn = document.createElement('button');
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
	deleteCharacter: function deleteCharacter(key) {
		if (key === '' || key === 'settings') {
			return;
		}
		Storage.remove(key);
		if (Storage.get(key) !== '') {
			// error
			var _p3 = document.createElement('p');
			_p3.innerHTML = 'Error deleting the character...';
			Alert.setContent(_p3);
		} else {
			// success
			// remove from load list
			LoadMenu.removeCharacter(key);
			// if its the current character we should trigger "new character" action
			if (this.cur_character !== null && this.cur_character.key === key) {
				window.location.hash = '#' + Manager.generateKey();
			}
		}
	}
};

/**
 * Load the saved characters into the dropdown
 */
Storage.getAllKeys().forEach(function (key) {
	LoadMenu.addCharacter(key);
});

/**
 * If there are no saved characters, display a first time user message
 */
if (LoadMenu.isEmpty()) {
	var content = [];
	var h = document.createElement('h2');
	h.innerHTML = 'Character Sheet.';
	content.push(h);
	var p1 = document.createElement('p');
	p1.innerHTML = 'An online character sheet for 5th edition D&D, usable offline.';
	content.push(p1);
	var p4 = document.createElement('p');
	p4.innerHTML = 'Designed for modern browsers, if all else fails Chrome is your best bet and IE is your worst bet.';
	content.push(p4);
	var p2 = document.createElement('p');
	p2.innerHTML = '<strong>Warning:</strong> Character data is saved to your browser\'s local storage. This means it can be erased if you delete browser data and will not automatically transfer between browsers even on the same computer. Please Save and Backup often (or at least at the end of every gaming session)!';
	content.push(p2);
	var p3 = document.createElement('p');
	p3.innerHTML = 'This message will only appear until you save your first character.';
	content.push(p3);
	Alert.setContent(content);
}

/**
 * Event: Listen for hashchange and change the current character
 */
window.addEventListener('hashchange', function (e) {
	Manager.changeCharacter();
}, false);

/**
 * Check the hash to see if we need to load a specific character
 */
var urlhash = window.location.hash.substr(1);
if (urlhash !== '') {
	Manager.loadCharacter(urlhash);
} else {
	window.location.hash = '#' + Manager.generateKey();
}

/**
 * Help
 */
var dialog_help = document.getElementById('dialog_help');
var help_open = document.querySelector('.btn-help');
help_open.addEventListener('click', function (e) {
	dialog_help.classList.add('open');
	dialog_help.querySelector('h1').focus();
});
dialog_help.querySelector('.close').addEventListener('click', function (e) {
	dialog_help.classList.remove('open');
});
document.body.addEventListener('click', function (e) {
	var close = e.target.closest('#dialog_help');
	if (close === null) {
		if (e.target.classList.contains('btn-help')) {
			return;
		}
		// Hide the help.
		dialog_help.classList.remove('open');
	}
});

},{}]},{},[1])(1)
});