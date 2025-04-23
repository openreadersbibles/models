import { StringLookup } from "@models/ParsingFormatObject";

export interface NTConciseParsingFormatStrings extends StringLookup {
    nominative: string;
    genitive: string;
    dative: string;
    accusative: string;
    NA: string;

    masculine: string;
    feminine: string;
    neuter: string;

    singular: string;
    plural: string;

    present: string;
    imperfect: string;
    future: string;
    aorist: string;
    perfect: string;
    pluperfect: string;

    active: string;
    middle: string;
    passive: string;

    indicative: string;
    imperative: string;
    subjunctive: string;
    optative: string;
    infinitive: string;
    participle: string;

    first: string;
    second: string;
    third: string;

    verb: string;
    noun: string;
}

/// https://www.preceptaustin.org/greek_abbreviations#Greek%20Resources
export const NTConciseEnglish: NTConciseParsingFormatStrings = {
    nominative: 'N',
    genitive: 'G',
    dative: 'D',
    accusative: 'A',
    NA: '',

    masculine: 'M',
    feminine: 'F',
    neuter: 'N',

    singular: 'S',
    plural: 'P',

    present: 'P',
    imperfect: 'I',
    future: 'F',
    aorist: 'A',
    perfect: 'R',
    /// this is an odd practice, but it seems to be the standard
    /// presumably pluperfects are different enough from presents
    /// for the difference to be clear
    pluperfect: 'P',

    active: 'A',
    middle: 'M',
    passive: 'P',

    indicative: 'I',
    imperative: 'M',
    subjunctive: 'S',
    optative: 'O',
    infinitive: 'N',
    participle: 'P',

    first: '1',
    second: '2',
    third: '3',

    verb: 'V',
    noun: 'N',
}
