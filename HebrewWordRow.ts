import { AnnotationJsonObject } from "./Annotation.js";
import { GlossRow, PhraseGlossRow } from "./database-input-output.js";

export type OTGender = "NA" | "f" | "m" | "unknown";
export type OTGrammaticalNumber = "NA" | "sg" | "pl" | "unknown" | "du";
export type OTPerson = "NA" | "p1" | "p2" | "p3" | "unknown";
export type OTState = "NA" | "a" | "c" | "e";
export type OTTense = "NA" | "perf" | "ptca" | "wayq" | "impf" | "infc" | "impv" | "infa" | "ptcp";
export type OTVerbStem = "NA" | "qal" | "piel" | "hif" | "nif" | "pual" | "hit" | "hof" | "hsht" | "pasq" | "hotp" | "nit" | "poal" | "poel" | "htpo" | "peal" | "tif" | "etpa" | "pael" | "haf" | "htpe" | "htpa" | "peil" | "etpe" | "afel" | "shaf";
export type OTPartOfSpeech = "prep" | "subs" | "verb" | "art" | "conj" | "advb" | "adjv" | "intj" | "prde" | "nmpr" | "nega" | "prps" | "prin" | "inrg";

export interface GetHebrewVerseResponse {
    words: HebrewWordRow[];
    suggestions: SuggestionRow[];
    phrase_glosses: PhraseGlossRow[];
}

export interface SuggestionRow {
    lex_id: number;
    suggestions: AnnotationJsonObject[];
}

export interface HebrewWordRow {
    _id: number;
    freq_lex: number;
    g_word_utf8: string;
    trailer_utf8: string;
    lex_id: number;
    gloss: string;
    votes: GlossRow[];
    myVote: number | null;

    gn: OTGender;
    nu: OTGrammaticalNumber;
    st: OTState;
    vt: OTTense;
    vs: OTVerbStem;
    ps: OTPerson;
    pdp: OTPartOfSpeech;
    englishGloss: string;
    prs_gn: OTGender;
    prs_nu: OTGrammaticalNumber;
    prs_ps: OTPerson;
    voc_lex_utf8: string;
    languageISO: 'hbo' | 'arc' | 'grc';
}

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