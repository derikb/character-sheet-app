/**
 * Matching attribute full names to the character properties.
 */
export const attributes = Object.freeze({
    STRENGTH: 'str',
    DEXTERITY: 'dex',
    CONSTITUTION: 'con',
    INTELLIGENCE: 'intel',
    WISDOM: 'wis',
    CHARISMA: 'cha'
});

/**
 * Matching skills to attributes.
 */
export const skillAttributes = Object.freeze({
    acrobatics: attributes.DEXTERITY,
    animal_handling: attributes.WISDOM,
    arcana: attributes.INTELLIGENCE,
    athletics: attributes.STRENGTH,
    deception: attributes.CHARISMA,
    history: attributes.INTELLIGENCE,
    insight: attributes.WISDOM,
    intimidation: attributes.CHARISMA,
    investigation: attributes.INTELLIGENCE,
    medicine: attributes.WISDOM,
    nature: attributes.INTELLIGENCE,
    perception: attributes.WISDOM,
    performance: attributes.CHARISMA,
    persuasion: attributes.CHARISMA,
    religion: attributes.INTELLIGENCE,
    sleight_of_hand: attributes.DEXTERITY,
    stealth: attributes.DEXTERITY,
    survival: attributes.WISDOM
});

export const skillLevels = Object.freeze({
    UNSKILLED: 0,
    PROFICIENT: 1,
    EXPERT: 2
});
