import { NumeralConverter } from "../NumeralConverter";
import { NTConciseParsingFormat } from "./NTConciseParsingFormat";
import { NTConciseEnglish } from "./NTConciseParsingFormatStrings";
import { NTVerboseParsingFormat } from "./NTVerboseParsingFormat";
import { NTVerboseEnglish } from "./NTVerboseParsingFormatStrings";
import { OTConciseParsingFormat } from "./OTConciseParsingFormat";
import { OTBasicEnglish } from "./OTConciseParsingFormatStrings";
import { OTVerboseParsingFormat } from "./OTVerboseParsingFormat";
import { Canon } from "../VerseReference";
import { OTVerboseEnglish } from "./OTVerboseParsingFormatStrings";

export type ParsingFormatId = string;

export interface ParsingFormat {
    id: string;
    template: string;
    canon: Canon;
    nounParsingString(element: any): string;
    verbParsingString(element: any): string;
    toObject(): ParsingFormatObject;
    /// the requirement here is that 
    getString(key: string): string | undefined;
}

export interface ParsingFormatObject {
    id: string;
    template: string;
    translations: any;
}

export interface ParsingFormatTemplate {
    id: ParsingFormatId;
    name: string;
    canon: Canon;
    description: string;
    strings: any;
    placeholders?: any;
}

export interface StringLookup {
    [key: string]: string;
}

export function parsingFormatFromId(id: ParsingFormatId): ParsingFormatTemplate | undefined {
    for (let i = 0; i < PARSING_FORMAT_TEMPLATES.length; i++) {
        if (PARSING_FORMAT_TEMPLATES[i].id === id) {
            return PARSING_FORMAT_TEMPLATES[i];
        }
    }
    return undefined;
}

export const PARSING_FORMAT_TEMPLATES: ParsingFormatTemplate[] =
    [
        {
            id: "nt-verbose",
            name: "NT Verbose",
            canon: "NT",
            description: "Written-out Greek parsings (e.g., present active indicative 3s)",
            strings: {
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
                third: "Third"
            },
            placeholders: NTVerboseEnglish
        },
        {
            id: "nt-concise",
            name: "NT Concise",
            canon: "NT",
            description: "Abbreviated Greek parsings (e.g., V3SAPI, NANS)",
            strings: {
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
            },
            placeholders: NTConciseEnglish
        },
        {
            id: "ot-concise",
            name: "OT Concise",
            canon: "OT",
            description: "Hebrew parsings shown in a condensed format (e.g., G20 for a qal imperfect 3ms)",
            strings: {
                noun_abbreviation: "Noun Abbreviation",
                interrogative_abbreviation: "Interrogative Abbreviation",
                emphatic_abbreviation: "Emphatic Abbreviation",
                pronominal_suffix_abbreviation: "Pronominal Suffix Abbreviation",
                passive_abbreviation: "Passive Abbreviation",
                qal_abbreviation: "Qal Abbreviation",
                piel_abbreviation: "Piel Abbreviation",
                hiphil_abbreviation: "Hiphil Abbreviation",
                niphal_abbreviation: "Niphal Abbreviation",
                hithpael_abbreviation: "Hithpael Abbreviation",
                hishtaphel_abbreviation: "Hishtaphel Abbreviation",
                nithpael_abbreviation: "Nithpael Abbreviation",
                hithpeel_abbreviation: "Hithpeel Abbreviation",
                shafel_abbreviation: "Shafel Abbreviation",
                retentive_abbreviation: "Retentive Abbreviation"
            },
            placeholders: OTBasicEnglish
        },
        {
            id: "ot-verbose",
            name: "OT Verbose",
            canon: "OT",
            description: "Hebrew parsings shown in a verbose format (e.g., qal imperfect 3ms)",
            strings: {
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
            },
            placeholders: OTVerboseEnglish
        },
    ];

export class ParsingFormatFactory {
    static createParsingFormat(id: string, numeralConverter: NumeralConverter, templateId: string, translations: any): ParsingFormat {
        switch (templateId) {
            case 'nt-verbose':
                return new NTVerboseParsingFormat(id, templateId, numeralConverter, translations);
            case 'ot-concise':
                return new OTConciseParsingFormat(id, templateId, numeralConverter, translations);
            case 'nt-concise':
                return new NTConciseParsingFormat(id, templateId, numeralConverter, translations);
            case 'ot-verbose':
                return new OTVerboseParsingFormat(id, templateId, numeralConverter, translations);
            default:
                throw new Error(`Unknown parsing format template: ${templateId}`);
        }
    }
}