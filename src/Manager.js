/**
 * Manager:
 * Interface for save/backup/restore of data...
 */

/**
 * LocalStorage interface
 */
const Storage = {
	/**
	 * A prefix to attack to the random keys to differentiate them from any other storage for the current location/domain
	 */
	prefix: '',
	/**
	 * Set the prefix
	 * @param {String} prefix string to prefix the randomly generated key
	 */
	setPrefix: function (prefix) {
		this.prefix = prefix;
	},
	/**
	 * Returns blank or the value for the key
	 * @param {String} key
	 * @return {String}
	 */
	get: function (key) {
		let txt = localStorage.getItem(`${this.prefix}${key}`);
		// backward compatibile cleanup later @todo
		if (txt === null) {
			txt = localStorage.getItem(key);
			if (txt !== null) {
				this.set(key, txt);
			}
		}
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
			localStorage.setItem(`${this.prefix}${key}`, txt);
			// backwards compatible cleanup for non prefixed saved characters @todo remove
			if (localStorage.getItem(key) !== null) {
				localStorage.removeItem(key);
			}
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
		localStorage.removeItem(`${this.prefix}${key}`);
	},
	/**
	 * Get an array of all keys with the key prefix
	 * @return {Array}
	 */
	getAllKeys: function () {
		const keys = [];
		if (localStorage.length > 0) {
			const key_regex = new RegExp(`^(${this.prefix})+`, 'i');
			for (let i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
				// check for prefix
				if (key.indexOf(this.prefix) !== 0) {
					// backwards compatibility for a little while @todo remove
					if (!key.match(/^[a-z0-9]{7}$/)) {
						continue;
					}
				}
				key = key.replace(key_regex, '');
				keys.push(key);
			}
		}
		return keys;
	}
};

/**
 * Menu and associated action events
 */
const ActionMenu = {
	/**
	 * Menu element
	 */
	el: null,
	/**
	 * Menu open button
	 */
	opener: null,
	/**
	 * Add event handlers, etc.
	 * @param {Object} Manager the object
	 */
	initialize: function () {
		this.el = document.querySelector('.app-actions');
		this.opener = document.querySelector('.btn-open-actions');
		// opener click handler
		this.opener.addEventListener('click', (e) => {
			if (this.el.classList.contains('open')) {
				// set menu to hide overflow BEFORE it closes
				this.el.style.overflow = 'hidden';
			}
			this.el.classList.toggle('open');
		});
		// When the menu transitions to open we want to set overflow to visible so the Load dropdown can be visible
		this.el.addEventListener('transitionend', (e) => {
			const style = window.getComputedStyle(this.el);
			if (style.getPropertyValue('max-height') !== '0px') {
				this.el.style.overflow = 'visible';
			}
		});
		
		// event handlers for all the menu buttons
		const action_btn_backup = this.el.querySelector('.btn-file-backup');
		if (typeof window.Blob !== 'function') {
			action_btn_backup.style.display = 'none';
		}
		action_btn_backup.addEventListener('click', (e) => {
			Manager.downloadBackup();
		});
		const action_btn_email = this.el.querySelector('.btn-email-backup');
		action_btn_email.addEventListener('click', (e) => {
			Manager.emailBackup();
		});
		const action_btn_save = this.el.querySelector('.btn-save');
		action_btn_save.addEventListener('click', (e) => {
			Manager.saveCharacter();
		});
		const action_btn_new = this.el.querySelector('.btn-new-character');
		action_btn_new.addEventListener('click', (e) => {
			// change hash to trigger new character?
			window.location.hash = `#${Manager.generateKey()}`;
		});
		const action_btn_restore = this.el.querySelector('.btn-restore-backup');
		action_btn_restore.addEventListener('click', (e) => {
			backup_dialog.classList.add('open');
		});
		const action_btn_load = this.el.querySelector('.btn-load');
		action_btn_load.addEventListener('click', (e) => {
			e.currentTarget.nextElementSibling.classList.toggle('open');
		});
		
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
	}
	
};

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
	 * @param {Object|String} char_obj Character object or JSON string
	 */
	addCharacter: function (char_obj) {
		if (typeof char_obj === 'undefined' || char_obj === '') {
			return;
		}
		try {
			if (typeof char_obj === 'string') {
				char_obj = JSON.parse(char_obj);
			}
			if (char_obj.key && char_obj.key !== '') {
				// check if it's already there
				const existing = this.el.querySelector(`a[href="#${char_obj.key}"]`);
				if (existing !== null) {
					// update the text as appropriate
					existing.textContent = `${char_obj.charname} (${char_obj.charclass} ${char_obj.level})`;
					return;
				}
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.textContent = `${char_obj.charname} (${char_obj.charclass} ${char_obj.level})`;
				a.setAttribute('href', `#${char_obj.key}`);
				li.appendChild(a);
				const del = document.createElement('a');
				del.classList.add('delete');
				del.innerHTML = '❌';
				del.setAttribute('href', '#');
				del.setAttribute('data-key', char_obj.key);
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
					Manager.deletePrompt(e.target.getAttribute('data-key'));
					this.close();
				}
			}
		});
	}
};

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
		this.el.classList.add('open');
	},
	/**
	 * Clear the alert (which makes it disappear)
	 */
	clear: function () {
		this.el.classList.remove('open');
		while (this.el.firstChild) {
			this.el.removeChild(this.el.firstChild);
		}
	},
	/**
	 * Setup some events, etc.
	 * @param {Object} Manager instance of manager object
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

const HelpDialog = {
	/**
	 * Dialog element
	 */
	el: document.getElementById('dialog_help'),
	/**
	 * Help button
	 */
	opener: document.querySelector('.btn-help'),
	/**
	 * Close button
	 */
	closer: document.querySelector('#dialog_help .close'),
	/**
	 * Add events
	 */
	initialize: function () {
		// Event: click opener
		this.opener.addEventListener('click', (e) => {
			this.el.classList.add('open');
			this.el.querySelector('h1').focus();
		});
		// Event: click closer
		this.closer.addEventListener('click', (e) => {
			this.el.classList.remove('open');
		});
		// Event: click outside help dialog to close it
		document.body.addEventListener('click', (e) => {
			const close = e.target.closest('#dialog_help');
			if (close === null) {
				if (e.target.classList.contains('btn-help')) { return; }
				// Hide the help.
				this.el.classList.remove('open');
			}
		});
	}
};

const Manager = module.exports = {
	/**
	 * App/rules/game specific character model and UI handling
	 */
	character_model: null,
	/**
	 * App/rules/game specific UI handling
	 */
	rules_ui: null,
	/**
	 * Currently loaded character data is here
	 */
	cur_character: null,
	/**
	 * Unsaved dialog
	 */
	dialog_unsaved: document.querySelector('.alert-unsaved'),
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
		this.loadCharacter(urlhash);
		LoadMenu.close();
	},
	/**
	 * Load character data based on a key
	 * @param {String} key character identifier...????
	 */
	loadCharacter: function (key) {
		this.dialog_unsaved.classList.remove('open');
		const json = Storage.get(key);
		if (json === '') {
			// prompt to load backup?
			this.cur_character = Object.create(this.character_model);
			this.cur_character.key = key;
			this.renderCharacter();
			return;
		}
		const data = JSON.parse(json);
		
		this.cur_character = Object.create(this.character_model);
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
					case 'UL':
						// clear list
						while (el.firstChild) {
							el.removeChild(el.firstChild);
						}
						let items = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
						if (!Array.isArray(items)) { items = items.split(/;|<br\/?>/); }
						const li_blank = el.querySelector('li:empty');
						if (items.length > 0) {
							items.forEach((i) => {
								if (i === '') { return; }
								const li = document.createElement('li');
								li.setAttribute('contenteditable', 'true');
								li.innerHTML = i;
								el.insertBefore(li, li_blank);
							});
						}
						// add a blank one at the end
						const li = document.createElement('li');
						li.setAttribute('contenteditable', 'true');
						el.appendChild(li);
						break;
					default:
						el.innerHTML = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
						const event2 = new Event('blur');
						el.dispatchEvent(event2);
						break;
				}
			}
		});
		// Update proficiency/attr/save/skill modifiers
		this.rules_ui.postRender();
	},
	/**
	 * Save character data to localStorage
	 */
	saveCharacter: function () {
		if (this.cur_character === null) {
			this.cur_character = Object.create(this.character_model);
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
					this.cur_character[f] = this.character_model[f];
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
				case 'UL':
					const items = [];
					const lis = Array.from(el.querySelectorAll('li'));
					if (lis.length > 0) {
						lis.forEach((li) => {
							const val = li.innerHTML;
							if (val === '') { return; }
							items.push(val);
						});
					}
					if (subf) {
						this.cur_character[f][subf] = items;
					} else {
						this.cur_character[f] = items;
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
		if (this.cur_character.charname === '') {
			const p = document.createElement('p');
			p.innerHTML = 'Your character must have name to save!';
			Alert.setContent(p);
			return;
		}
		this.cur_character.updated = this.currentTimestamp();
		Storage.set(this.cur_character.key, JSON.stringify(this.cur_character));
		this.dialog_unsaved.classList.remove('open');
		LoadMenu.addCharacter(this.cur_character);
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
		const date = new Date();
		const body = `Below is the backup data for your character ${this.cur_character.charname}.
		
To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.
		
---
		
${data}`;
		
		const url = `mailto:?subject=${encodeURIComponent(`Character backup ${this.cur_character.charname} (${date.toLocaleString()})`)}&body=${encodeURIComponent(body)}`;
		
		// Sadly this simple solution doesn't work in iOS
		// document.location.href = url;
		const content = [];
		const a = document.createElement('a');
		a.href = url;
		a.innerHTML = 'Open new message in default email client';
		a.addEventListener('click', (e) => {
			Alert.clear();
		});
		const p = document.createElement('p');
		p.appendChild(a);
		content.push(p);
		Alert.setContent(content);
	},
	/**
	 * Take json backup data and load the character
	 * @param {String} data JSON data (we hope)
	 */
	restoreCharacter: function (data) {
		try {
			// strip out everything before the first "{" and after the last "}"
			data = data.substring(data.indexOf('{'));
			data = data.substring(0, data.lastIndexOf('}') + 1);
			data = data.trim(); // just in case
			// convert linebreaks to html br else JSON.parse breaks
			data = data.replace(/(?:\r\n|\r|\n)/g, '<br/>');
			const char_obj = JSON.parse(data);
			if (!char_obj.key || char_obj.app !== 'character-sheet-5e') {
				throw new Error('Data appears to be invalid.');
			}
			const ex_char = Storage.get(char_obj.key);
			if (ex_char !== '' && ex_char.charname !== '' && ex_char.charname !== char_obj.charname) {
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
			LoadMenu.addCharacter(char_obj);
			// if its the current character we should reload them
			if (char_obj.key === this.cur_character.key) {
				this.loadCharacter(char_obj.key);
			} else {
				// prompt to load them
				const p = document.createElement('p');
				p.textContent = `${char_obj.charname} has been added. `;
				const a = document.createElement('a');
				a.setAttribute('href', `#${char_obj.key}`);
				a.textContent = 'View character now.';
				a.addEventListener('click', (e) => {
					Alert.clear();
				});
				p.appendChild(a);
				Alert.setContent(p);
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
	},
	/**
	 * Check for features we need
	 * @return {Boolean}
	 */
	checkFeatures: function () {
		let fail = false;
		if ('localStorage' in window && window['localStorage'] !== null) {
			// Okay
		} else {
			fail = true;
		}
		if (fail) {
			const p = document.createElement('p');
			p.textContent = `Sorry, your browser does not supported the required features for this app to work. Try using the latest Chrome or Firefox for best results.`;
			Alert.setContent(p);
		}
		return;
	},
	/**
	 * Check for AppCache updates
	 */
	checkCache: function () {
		if ('applicationCache' in window) {
			const updateAppCache = function (event) {
				const p = document.createElement('p');
				p.textContent = `Character Sheet has been updated with new features or bug fixes. Please reload the page to get the newest code. If you have this site open in multiple tabs/windows please close them all.`;
				Alert.setContent(p);
			};
			window.applicationCache.addEventListener('updateready', updateAppCache, false);
			if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
				updateAppCache();
			}
		}
	},
	/**
	 * If no characters are saved we show an app intro dialog
	 */
	showIntroDialog: function () {
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
	},
	/**
	 * Start up the app with some events and such
	 * @param {Object} rules export object from the rules specific module
	 */
	initialize: function (rules) {
		this.character_model = rules.model;
		this.rules_ui = rules.ui;
		// set up storage
		Storage.setPrefix('charsheet-5e-');
		// set up default Alert
		Alert.initialize();
		// check for localStorage support
		this.checkFeatures();
		// check for AppCache updates
		this.checkCache();
		// set up the help dialog
		HelpDialog.initialize();
		// set up the menu
		ActionMenu.initialize();
		// Load the saved characters into the dropdown
		LoadMenu.initialize(this);
		
		Storage.getAllKeys().forEach((key) => {
			const char_obj = Storage.get(key);
			LoadMenu.addCharacter(char_obj);
		});
		
		if (LoadMenu.isEmpty()) {
			this.showIntroDialog();
		}
		// set up all the rule specific ui events (attribute modifiers and the like)
		this.rules_ui.initialize();
		
		// Event: Listen for hashchange and change the current character
		window.addEventListener('hashchange', (e) => { this.changeCharacter(); }, false);
		
		// Check the hash to see if we need to load a specific character
		const urlhash = window.location.hash.substr(1);
		if (urlhash !== '') {
			this.loadCharacter(urlhash);
		} else {
			window.location.hash = `#${this.generateKey()}`;
		}
	}
};
