import { StringLookup } from "./ParsingFormat";

export interface OTConciseParsingFormatStrings extends StringLookup {
    noun_abbreviation: string;
    interrogative_abbreviation: string;
    emphatic_abbreviation: string;
    pronominal_suffix_abbreviation: string;
    passive_abbreviation: string;
    qal_abbreviation: string;
    piel_abbreviation: string;
    hiphil_abbreviation: string;
    niphal_abbreviation: string;
    hithpael_abbreviation: string;
    hishtaphel_abbreviation: string;
    nithpael_abbreviation: string;
    hithpeel_abbreviation: string;
    shafel_abbreviation: string;
    retentive_abbreviation: string;
}

export const OTConciseStringLabels = {
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
};

export const OTBasicEnglish: OTConciseParsingFormatStrings = {
    noun_abbreviation: 'S',
    interrogative_abbreviation: 'i',
    emphatic_abbreviation: 'e',
    pronominal_suffix_abbreviation: 's',
    passive_abbreviation: 'p',
    qal_abbreviation: 'G',
    piel_abbreviation: 'D',
    hiphil_abbreviation: 'H',
    niphal_abbreviation: 'N',
    hithpael_abbreviation: 'tD',
    hishtaphel_abbreviation: 'Št',
    nithpael_abbreviation: 'NtD',
    hithpeel_abbreviation: 'tG',
    shafel_abbreviation: 'Š',
    retentive_abbreviation: 'r',
};

const ZERO_WIDTH_JOINER = '\u200d';
const THIN_SPACE = '\u2009';
const JOINER_PLUS_THIN_SPACE = ZERO_WIDTH_JOINER + THIN_SPACE;

export const OTBasicPersian: OTConciseParsingFormatStrings = {
    noun_abbreviation: 'اسم',
    interrogative_abbreviation: 'استف' + JOINER_PLUS_THIN_SPACE,
    emphatic_abbreviation: 'تأک' + JOINER_PLUS_THIN_SPACE,
    pronominal_suffix_abbreviation: 'پ' + JOINER_PLUS_THIN_SPACE,
    passive_abbreviation: 'مغعول' + THIN_SPACE,
    qal_abbreviation: 'ق' + JOINER_PLUS_THIN_SPACE,
    piel_abbreviation: 'پ' + JOINER_PLUS_THIN_SPACE,
    hiphil_abbreviation: 'ح' + JOINER_PLUS_THIN_SPACE,
    niphal_abbreviation: 'ن' + JOINER_PLUS_THIN_SPACE,
    hithpael_abbreviation: 'حیت' + JOINER_PLUS_THIN_SPACE,
    hishtaphel_abbreviation: 'حیش' + JOINER_PLUS_THIN_SPACE,
    nithpael_abbreviation: 'نیت' + JOINER_PLUS_THIN_SPACE,
    /// this is not great
    hithpeel_abbreviation: 'حیتپ' + JOINER_PLUS_THIN_SPACE,
    shafel_abbreviation: 'ش' + JOINER_PLUS_THIN_SPACE,
    retentive_abbreviation: 'اد' + JOINER_PLUS_THIN_SPACE,
};
