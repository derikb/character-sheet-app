import CharacterVagabonds from '../models/CharacterVagabonds.js';
import SheetView from './SheetView';

const template = document.createElement('template');
template.innerHTML = `
<style>
dl.field-horizontal > div {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 1rem;
}
dl.field-horizontal dt {
    font-weight: bold;
}
</style>

<ul id="toptabs" role="tablist">
    <li role="presentation"><a role="tab" id="tab-stats" href="#pane-stats" aria-selected="true">Statistics, Abilities, Equipment, etc.</a></li>
    <li role="presentation"><a role="tab" id="tab-notes" href="#pane-notes" aria-selected="false">Notes, Personality, NPCs, etc.</a></li>
</ul>

<section id="pane-stats" class="grid" role="tabpanel" aria-labelledby="tab-stats">
    <section class="grid-span-col-2">
        <dl class="field-horizontal">
            <div>
                <dt>Conflict Approach</dt><dd><field-editable data-name="conflict_approach"></field-editable></dd>
            </div>
            <div>
                <dt>Goal</dt><dd><field-editable data-name="goal"></field-editable></dd>
            </div>
            <div>
                <dt>Gimmick</dt><dd><field-editable data-name="gimmick"></field-editable></dd>
            </div>
            <div>
                <dt>Background</dt><dd><field-editable data-name="background"></field-editable></dd>
            </div>
            <div>
                <dt>Foreground</dt><dd><field-editable data-name="foreground"></field-editable></dd>
            </div>
            <div>
                <dt>Weakness</dt><dd><field-editable data-name="weakness"></field-editable></dd>
            </div>
            <div>
                <dt>Core Flaw</dt><dd><field-editable data-name="core_flaw"></field-editable></dd>
            </div>
            <div>
                <dt>Level</dt><dd><field-editable data-name="level" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Experience</dt><dd><field-editable data-name="experience" class="small"></field-editable></dd>
            </div>
            <div>
                <dt>Speed</dt><dd><field-editable data-name="speed" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Armor</dt><dd><field-editable data-name="armor" placeholder="0" class="small"></field-editable></dd>
            </div>
            <div class="with_icon">
                <dt>Hit Points</dt>
                <dd>
                    <field-editable class="smallinline" data-name="hp_cur" placeholder="0" aria-label="Current Hit Points"></field-editable> <strong>/</strong> <field-editable class="smallinline" data-name="hp_max" placeholder="0" aria-label="Maximum Hit Points"></field-editable>
                </dd>
            </div>
            <div>
                <dt>Coins</dt><dd><field-editable data-name="coins" class="small" placeholder="0"></field-editable></dd>
            </div>
            <div>
                <dt>Lineage</dt><dd><simple-list data-name="lineage"></simple-list></dd>
            </div>
        </dl>
    </section>

    <section class="grid-span-col-1">
        <h2>Techniques</h2>
        <simple-list data-name="techniques"></simple-list>

        <h2>Inventory</h2>
        <simple-list data-name="inventory" data-number="true"></simple-list>
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
        <field-editable class="smallarea" data-name="personality"></field-editable>
        <h2>Appearance</h2>
        <field-editable class="smallarea" data-name="appearance"></field-editable>
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

class CharacterVagabondsSheet extends SheetView {
    /**
     * @param {EventEmitter} emitter
     */
    constructor ({
        emitter
    }) {
        super({
            emitter,
            templateNode: template.content.cloneNode(true)
        });
    }

    connectedCallback () {
        super.connectedCallback();
    }

    disconnectedCallback () {
        super.disconnectedCallback();
    }
    /**
     * Override in child to check correct class is set.
     * @param {CharacterVagabonds} character
     */
    _validateCharacter (character) {
        if (!(character instanceof CharacterVagabonds)) {
            throw new Error('Invalid character type for this view.');
        }
    }
}

if (!window.customElements.get('sheet-view-vagabonds')) {
    window.customElements.define('sheet-view-vagabonds', CharacterVagabondsSheet);
}

export default CharacterVagabondsSheet;
