/** Note object */
export default class CharacterNote {
    constructor ({
        header = '',
        text = ''
    }) {
        this.header = header;
        this.text = text;
    }
    toJSON () {
        const obj = {};
        const props = Object.getOwnPropertyNames(this);
        props.forEach((prop) => {
            obj[prop] = this[prop];
        });
        return obj;
    }
};
