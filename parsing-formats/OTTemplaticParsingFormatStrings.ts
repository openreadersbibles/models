import { OTVerboseEnglish, OTVerboseParsingFormatStrings, OTVerboseStringLabels } from "./OTVerboseParsingFormatStrings.js";
import { StringLookup } from "./ParsingFormat.js";

export interface OTTemplaticParsingFormatStrings extends StringLookup, OTVerboseParsingFormatStrings {
    noun_template: string;
    pronominal_suffix_template: string;
    interrogative_template: string;
    verb_template: string;
}

export const OTTemplativeStringLabels = {
    noun_template: 'Noun Template',
    verb_template: 'Verb Template',
    pronominal_suffix_template: 'Pronominal Suffix Template',
    interrogative_template: 'Interrogative Template',
    ...OTVerboseStringLabels
};

export const OTTemplaticEnglish: OTTemplaticParsingFormatStrings = {
    ...OTVerboseEnglish,
    noun_template: '__NOUN__ __STATE__ __GENDER__ __NUMBER____PRONOMINAL_SUFFIX_TEMPLATE____INTERROGATIVE_TEMPLATE__',
    pronominal_suffix_template: ', __SUFFIX__ __PERSON__ __GENDER__ __NUMBER__',
    interrogative_template: ', __INTERROGATIVE__',
    verb_template: '__STEM__ __TENSE__ __PERSON__ __GENDER__ __NUMBER____PRONOMINAL_SUFFIX_TEMPLATE____INTERROGATIVE_TEMPLATE__',
};
