import { StringLookup } from "./ParsingFormat.js";

export interface NTVerboseParsingFormatStrings extends StringLookup {
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
}

export const NTVerboseStringLabels = {
    nominative: "Nominative",
    genitive: "Genitive",
    dative: "Dative",
    accusative: "Accusative",

    masculine: "Masculine",
    feminine: "Feminine",
    neuter: "Neuter",

    singular: "Singular",
    plural: "Plural",

    present: "Present",
    imperfect: "Imperfect",
    future: "Future",
    aorist: "Aorist",
    perfect: "Perfect",
    pluperfect: "Pluperfect",

    active: "Active",
    middle: "Middle",
    passive: "Passive",

    indicative: "Indicative",
    imperative: "Imperative",
    subjunctive: "Subjunctive",
    optative: "Optative",
    infinitive: "Infinitive",
    participle: "Participle",

    first: "First",
    second: "Second",
    third: "Third",

    verb: "Verb",
    noun: "Noun"
};

export const NTVerboseEnglish: NTVerboseParsingFormatStrings = {
    nominative: 'nominative',
    genitive: 'genitive',
    dative: 'dative',
    accusative: 'accusative',
    NA: '',

    masculine: 'masculine',
    feminine: 'feminine',
    neuter: 'neuter',

    singular: 'singular',
    plural: 'plural',

    present: 'present',
    imperfect: 'imperfect',
    future: 'future',
    aorist: 'aorist',
    perfect: 'perfect',
    pluperfect: 'pluperfect',

    active: 'active',
    middle: 'middle',
    passive: 'passive',

    indicative: 'indicative',
    imperative: 'imperative',
    subjunctive: 'subjunctive',
    optative: 'optative',
    infinitive: 'infinitive',
    participle: 'participle',

    first: 'first',
    second: 'second',
    third: 'third',
}

export const NTVerbosePersian: NTVerboseParsingFormatStrings = {
    nominative: 'نهادی',
    genitive: 'وابستگی',
    dative: 'کنش‌گیری',
    accusative: 'مفعولی',
    NA: '',

    masculine: 'مذکر',
    feminine: 'مؤنث',
    neuter: 'خنثی',

    singular: 'مفرد',
    plural: 'جمع',

    present: 'حال',
    imperfect: 'گذشتهٔ استمراری',
    future: 'آینده',
    aorist: 'ماضی ساده',
    perfect: 'کامل',
    pluperfect: 'ماضی بَعید',

    active: 'معلوم',
    middle: 'میانه',
    passive: 'مجهول',

    indicative: 'اِخباری',
    imperative: 'امری',
    subjunctive: 'اِلتِزامی',
    optative: 'تمنایی',
    infinitive: 'مصدر',
    participle: 'وجه وصفی',

    first: 'اول',
    second: 'دوم',
    third: 'سوم',
}