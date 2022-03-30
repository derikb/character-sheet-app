/**
 * Data definitions for character classes.
 */

/**
 * Description of a class or subclass.
 */
class ClassDescription {
    /**
     * @param {String} name_
     * @param {Book} source
     */
    constructor ({ name_, source }) {
        this.name_ = name_;
        this.source = source;
    }
};

/**
 * Full definition of a class with possible subclass.
 */
class Class {
    /**
     * @param {ClassDescription} main_class
     * @param {ClassDescription} sub_class
     * @param {String} sub_sub_class
     */
    constructor ({ main_class, sub_class = null, sub_sub_class = null }) {
        this.main_class = main_class;
        this.sub_class = sub_class;
        this.sub_sub_class = sub_sub_class;
    }
};

export { ClassDescription, Class };
