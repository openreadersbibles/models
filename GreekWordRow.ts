import { GlossRow } from "./database-input-output.js";

export type NTPartOfSpeech = 'particle' | 'verb' | 'relative-pronoun' | 'personal-pronoun' | 'interrogative-indefinite-pronoun' | 'demonstrative-pronoun' | 'definite-article' | 'preposition' | 'noun' | 'interjection' | 'adverb' | 'conjunction' | 'adjective';
export type NTPerson = 'NA' | '1st' | '2nd' | '3rd';
export type NTTense = 'NA' | 'present' | 'imperfect' | 'future' | 'aorist' | 'perfect' | 'pluperfect';
export type NTVoice = 'NA' | 'active' | 'middle' | 'passive';
export type NTMood = 'NA' | 'indicative' | 'imperative' | 'subjunctive' | 'optative' | 'infinitive' | 'participle';
export type NTCase = 'NA' | 'nominative' | 'genitive' | 'dative' | 'accusative';
export type NTNumber = 'NA' | 'singular' | 'plural';
export type NTGender = 'NA' | 'masculine' | 'feminine' | 'neuter';
export type NTDegree = 'NA' | 'comparative' | 'superlative';

export interface GreekWordRow {
    _id: number;
    freq_lex: number;
    lex_id: number;
    myVote: 1 | 0;
    punctuated_text: string;
    unpunctuated_text: string;
    lemma: string;
    part_of_speech: NTPartOfSpeech;
    person: NTPerson;
    tense: NTTense;
    voice: NTVoice;
    mood: NTMood;
    grammatical_case: NTCase;
    grammatical_number: NTNumber;
    gender: NTGender;
    degree: NTDegree;
    languageISO: 'hbo' | 'arc' | 'grc';
    votes: GlossRow[];
    englishGloss: string;
}
