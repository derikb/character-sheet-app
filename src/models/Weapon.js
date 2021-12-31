/** Weapon object */
export default class Weapon {
    constructor ({
        name = '',
        attack = '',
        damage = '',
        notes = ''
    }) {
        this.name = name;
        this.attack = attack;
        this.damage = damage;
        this.notes = notes;
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
