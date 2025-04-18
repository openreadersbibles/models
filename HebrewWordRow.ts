import { z } from "zod";
import { GlossRowSchema } from "./GlossRow";
import { WordRow } from "./WordRow";
import { LanguageIsoSchema } from "./LanguageIso";

// Define OTGender schema
export const OTGenderSchema = z.enum(["NA", "f", "m", "unknown"]);
export type OTGender = z.infer<typeof OTGenderSchema>;

// Define OTGrammaticalNumber schema
export const OTGrammaticalNumberSchema = z.enum(["NA", "sg", "pl", "unknown", "du"]);
export type OTGrammaticalNumber = z.infer<typeof OTGrammaticalNumberSchema>;

// Define OTPerson schema
export const OTPersonSchema = z.enum(["NA", "p1", "p2", "p3", "unknown"]);
export type OTPerson = z.infer<typeof OTPersonSchema>;

// Define OTState schema
export const OTStateSchema = z.enum(["NA", "a", "c", "e"]);
export type OTState = z.infer<typeof OTStateSchema>;

// Define OTTense schema
export const OTTenseSchema = z.enum([
    "NA", "perf", "ptca", "wayq", "impf", "infc", "impv", "infa", "ptcp"
]);
export type OTTense = z.infer<typeof OTTenseSchema>;

// Define OTVerbStem schema
export const OTVerbStemSchema = z.enum([
    "NA", "qal", "piel", "hif", "nif", "pual", "hit", "hof", "hsht", "pasq",
    "hotp", "nit", "poal", "poel", "htpo", "peal", "tif", "etpa", "pael",
    "haf", "htpe", "htpa", "peil", "etpe", "afel", "shaf"
]);
export type OTVerbStem = z.infer<typeof OTVerbStemSchema>;

// Define OTPartOfSpeech schema
export const OTPartOfSpeechSchema = z.enum([
    "prep", "subs", "verb", "art", "conj", "advb", "adjv", "intj", "prde",
    "nmpr", "nega", "prps", "prin", "inrg"
]);
export type OTPartOfSpeech = z.infer<typeof OTPartOfSpeechSchema>;

// HebrewWordRow schema
export const HebrewWordRowSchema = z.object({
    _id: z.number(),
    freq_lex: z.number(),
    g_word_utf8: z.string(),
    trailer_utf8: z.string(),
    lex_id: z.number(),
    votes: z.array(GlossRowSchema),

    gn: OTGenderSchema,
    nu: OTGrammaticalNumberSchema,
    st: OTStateSchema,
    vt: OTTenseSchema,
    vs: OTVerbStemSchema,
    ps: OTPersonSchema,
    pdp: OTPartOfSpeechSchema,
    englishGloss: z.string(),
    prs_gn: OTGenderSchema,
    prs_nu: OTGrammaticalNumberSchema,
    prs_ps: OTPersonSchema,
    voc_lex_utf8: z.string(),
    languageISO: LanguageIsoSchema,
});
export type HebrewWordRow = z.infer<typeof HebrewWordRowSchema> & WordRow;

export function OTGenderToEnglish(gender: OTGender) {
    switch (gender) {
        case "NA": return "NA";
        case "f": return "feminine";
        case "m": return "masculine";
        case "unknown": return "unknown";
    }
}

export function OTGrammaticalNumberToEnglish(number: OTGrammaticalNumber) {
    switch (number) {
        case "NA": return "NA";
        case "sg": return "singular";
        case "pl": return "plural";
        case "unknown": return "unknown";
        case "du": return "dual";
    }
}

export function OTStateToEnglish(state: OTState) {
    switch (state) {
        case "NA": return "NA";
        case "a": return "absolute";
        case "c": return "construct";
        case "e": return "emphatic";
    }
}

export function OTTenseToEnglish(tense: OTTense) {
    switch (tense) {
        case "NA": return "NA";
        case "perf": return "perfect";
        case "ptca": return "participle";
        case "wayq": return "wayyiqtol";
        case "impf": return "imperfect";
        case "infc": return "infinitive construct";
        case "impv": return "imperative";
        case "infa": return "infinitive absolute";
        case "ptcp": return "participle";
    }
}

export function OTVerbStemToEnglish(stem: OTVerbStem) {
    switch (stem) {
        case "NA": return "NA";
        case "qal": return "qal";
        case "piel": return "piel";
        case "hif": return "hifil";
        case "nif": return "nifal";
        case "pual": return "pual";
        case "hit": return "hitpael";
        case "hof": return "hofal";
        case "hsht": return "hithpael";
        case "pasq": return "pausal";
        case "hotp": return "hophal";
        case "nit": return "niphal";
        case "poal": return "poal";
        case "poel": return "poel";
        case "htpo": return "hithpoel";
        case "peal": return "peal";
        case "tif": return "tiferet";
        case "etpa": return "etpaal";
        case "pael": return "pael";
        case "haf": return "hafel";
        case "htpe": return "hithpeel";
        case "htpa": return "hithpaal";
        case "peil": return "peil";
        case "etpe": return "etpeel";
        case "afel": return "afel";
        case "shaf": return "shafel";
    }
}

export function OTPersonToEnglish(person: OTPerson) {
    switch (person) {
        case "NA": return "NA";
        case "p1": return "first person";
        case "p2": return "second person";
        case "p3": return "third person";
        case "unknown": return "unknown";
    }
}

export function OTPartOfSpeechToEnglish(partOfSpeech: OTPartOfSpeech) {
    switch (partOfSpeech) {
        case "prep": return "preposition";
        case "subs": return "noun";
        case "verb": return "verb";
        case "art": return "article";
        case "conj": return "conjunction";
        case "advb": return "adverb";
        case "adjv": return "adjective";
        case "intj": return "interjection";
        case "prde": return "demonstrative pronoun";
        case "nmpr": return "proper noun";
        case "nega": return "negative particle";
        case "prps": return " 	personal pronoun";
        case "prin": return "interrogative pronoun";
        case "inrg": return "interrogative particle";
    }
}