import { StringLookup } from "@models/ParsingFormatObject";

export interface OTVerboseParsingFormatStrings extends StringLookup {
    noun: string;
    interrogative: string;
    pronominal_suffix: string;
    passive: string;
    qal: string;
    piel: string;
    hiphil: string;
    niphal: string;
    hithpael: string;
    hishtaphel: string;
    nithpael: string;
    hithpeel: string;
    shafel: string;
    retentive: string;

    active: string;
    construct: string;
    emphatic: string;

    masculine: string;
    feminine: string;

    singular: string;
    plural: string;
    dual: string;

    suffix: string;
    first_person: string;
    second_person: string;
    third_person: string;

    perfect: string;
    active_participle: string;
    wayyiqtol: string;
    imperfect: string;
    infinitive_construct: string;
    imperative: string;
    infinitive_absolute: string;
    passive_participle: string;
}

export const OTVerboseStringLabels = {
    noun: 'Noun',
    interrogative: 'Interrogative',
    pronominal_suffix: 'Suffix',
    passive: 'Passive',
    qal: 'Qal',
    piel: 'Piel',
    hiphil: 'Hiphil',
    niphal: 'Niphal',
    hithpael: 'Hithpael',
    hishtaphel: 'Hishtaphel',
    nithpael: 'Nithpael',
    hithpeel: 'Hithpeel',
    shafel: 'Shafel',
    retentive: 'Retentive',

    active: 'Active',
    construct: 'Construct',
    emphatic: 'Emphatic',

    masculine: 'Masculine',
    feminine: 'Feminine',

    singular: 'Singular',
    plural: 'Plural',
    dual: 'Dual',

    suffix: 'Pron Suff',
    first_person: '1st',
    second_person: '2nd',
    third_person: '3rd',

    perfect: 'Perfect',
    active_participle: 'Active Participle',
    wayyiqtol: 'Wayyiqtol',
    imperfect: 'Imperfect',
    infinitive_construct: 'Infinitive Construct',
    imperative: 'Imperative',
    infinitive_absolute: 'Infinitive Absolute',
    passive_participle: 'Passive Participle',
};

export const OTVerboseEnglish: OTVerboseParsingFormatStrings = {
    noun: 'nominal',
    interrogative: 'interrogative',
    pronominal_suffix: 'suffix',
    passive: 'passive',
    qal: 'qal',
    piel: 'piel',
    hiphil: 'hiphil',
    niphal: 'niphal',
    hithpael: 'hithpael',
    hishtaphel: 'hishtaphel',
    nithpael: 'nithpael',
    hithpeel: 'hithpeel',
    shafel: 'shafel',
    retentive: 'retentive',

    active: 'active',
    construct: 'construct',
    emphatic: 'emphatic',

    masculine: 'masculine',
    feminine: 'feminine',

    singular: 'singular',
    plural: 'plural',
    dual: 'dual',

    suffix: 'pron suff',
    first_person: '1st',
    second_person: '2nd',
    third_person: '3rd',

    perfect: 'perfect',
    active_participle: 'active participle',
    wayyiqtol: 'wayyiqtol',
    imperfect: 'imperfect',
    infinitive_construct: 'infinitive construct',
    imperative: 'imperative',
    infinitive_absolute: 'infinitive absolute',
    passive_participle: 'passive participle',

};
