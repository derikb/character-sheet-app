/** Menus */

/**
 * Load Menu
 */
const LoadMenu = {
    /**
     * DOMELement
     */
    el: document.querySelector('#character_list'),
    /**
     * Toggle menu
     */
    toggle: function () {
        this.el.classList.toggle('open');
    },
    /**
     * Close menu
     */
    close: function () {
        this.el.classList.remove('open');
    },
    /**
     * Add character to list
     * @param {Object} char_obj Character object or JSON string
     */
    addCharacter: function (char_obj) {
        if (typeof char_obj === 'undefined' || char_obj === '') {
            return;
        }
        try {
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
     * Add character to load menu.
     * @param {Character5e} character
     */
    addCharacter: function (character) {
        LoadMenu.addCharacter(character);
    },
    /**
     * Remove character from load menu.
     * @param {String} key
     */
    removeCharacter: function (key) {
        LoadMenu.removeCharacter(key);
    },
    /**
     * Are there any existing characters saved.
     */
    hasCharacters: function () {
        return !LoadMenu.isEmpty();
    },
    /**
     * Close any associated menus/alerts/etc.
     */
    close: function () {
        LoadMenu.close();
    },
    /**
     * Add event handlers, etc.
     * @param {EventEmitter} emitter
     */
    initialize: function (emitter) {
        this.emitter = emitter;
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
        const action_btn_backup = this.el.querySelector('.btn-backup');
        action_btn_backup.addEventListener('click', (e) => {
            this.emitter.trigger('backup:open:download');
        });
        const action_btn_save = this.el.querySelector('.btn-save');
        action_btn_save.addEventListener('click', (e) => {
            this.emitter.trigger('character:save');
        });
        const action_btn_new = this.el.querySelector('.btn-new-character');
        action_btn_new.addEventListener('click', (e) => {
            this.emitter.trigger('character:new');
        });
        const action_btn_restore = this.el.querySelector('.btn-restore-backup');
        action_btn_restore.addEventListener('click', (e) => {
            this.emitter.trigger('backup:open:restore');
        });
        const action_btn_load = this.el.querySelector('.btn-load');
        action_btn_load.addEventListener('click', (e) => {
            LoadMenu.toggle();
        });

        this.el.addEventListener('click', (ev) => {
            const link = ev.target.closest('a');
            if (link === null) {
                return;
            }
            if (link.classList.contains('delete')) {
                ev.preventDefault();
                this.emitter.trigger('character:delete:confirm', ev.target.getAttribute('data-key'));
                this.close();
            }
        });

        this.emitter.on('loadmenu:add', this.addCharacter, this);
        this.emitter.on('loadmenu:remove', this.removeCharacter, this);
        this.emitter.on('character:load', this.close, this)
;    }
};

export default ActionMenu;
