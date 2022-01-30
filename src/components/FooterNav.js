/**
 * Navigation links for page/tabs.
 * Dynamically updates depending on SheetView type.
 */
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
    :host {
        position: fixed;
        bottom: 0;
        background-color: rgb(238, 238, 238);
        width: 100%;
        left: 0;
        padding: 0;
        text-align: center;
    }
    :host ol {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    :host ol li {
        display: inline-block;
    }
    :host ol li:last-of-type {
        margin-bottom: 0;
    }
    :host a {
        display: inline-block;
        margin: 0;
        border-right: 1px solid rgb(51, 51, 51);
        padding: 0 1rem;
        font-size: 0.75rem;
        line-height: 1rem;
    }
    :host ol li:last-of-type a {
        border-right: 0;
    }
    @media (min-width: 50.0rem) {
        :host a {
            margin: .5rem 0;
            font-size: 1.25rem;
            line-height: 1.75rem;
        }
    }
</style>
<ol>
    <li><a href="#page-top">Top</a></li>
</ol>
`;

class FooterNav extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Character sheet tab/section navigation');
        this.list = this.shadowRoot.querySelector('ol');
        this.topLink = this.shadowRoot.querySelector('li:first-child');

        this.shadowRoot.addEventListener('click', this._handleClicks.bind(this));
    }

    _handleClicks (ev) {
        if (ev.target.tagName === 'A') {
            ev.preventDefault();
            const link = ev.target;
            const targetPane = link.dataset.tab;

            const sheetView = document.querySelector('[data-sheetview]');
            if (targetPane) {
                sheetView.switchToPane(targetPane);
            }
            const target_id = link.getAttribute('href');
            sheetView.navigateTo(target_id);
        }
    }
    /**
     * Set links in header.
     * @param {Object[]} links
     */
    setLinks (links) {
        links.forEach((link) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href || '';
            a.innerText = link.label || '';
            a.dataset.tab = link.tab || '';
            li.appendChild(a);
            this.list.appendChild(li);
        });
    }
    /**
     * Remove all but the top link.
     */
    removeLinks () {
        this.shadowRoot.querySelectorAll('li').forEach((el) => {
            if (el === this.topLink) {
                return;
            }
            el.parentNode.removeChild(el);
        });
    }
}

if (!window.customElements.get('footer-nav')) {
    window.customElements.define('footer-nav', FooterNav);
}

export default FooterNav;
