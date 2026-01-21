import { z } from "zod";
import { GlossRowSchema } from "./GlossRow.js";
import { WordRow } from "./WordRow.js";
import { LanguageIsoSchema } from "./LanguageIso.js";
import { NTVoiceSchema } from "./NTVoice.js";

// Define NTPartOfSpeech schema
export const NTPartOfSpeechSchema = z.enum([
    "particle",
    "verb",
    "relative-pronoun",
    "personal-pronoun",
    "interrogative-indefinite-pronoun",
    "demonstrative-pronoun",
    "definite-article",
    "preposition",
    "noun",
    "interjection",
    "adverb",
    "conjunction",
    "adjective",
]);
export type NTPartOfSpeech = z.infer<typeof NTPartOfSpeechSchema>;

// Define NTPerson schema
export const NTPersonSchema = z.enum(["NA", "1st", "2nd", "3rd"]);
export type NTPerson = z.infer<typeof NTPersonSchema>;

// Define NTTense schema
export const NTTenseSchema = z.enum([
    "NA",
    "present",
    "imperfect",
    "future",
    "aorist",
    "perfect",
    "pluperfect",
]);
export type NTTense = z.infer<typeof NTTenseSchema>;

// Define NTMood schema
export const NTMoodSchema = z.enum([
    "NA",
    "indicative",
    "imperative",
    "subjunctive",
    "optative",
    "infinitive",
    "participle",
]);
export type NTMood = z.infer<typeof NTMoodSchema>;

// Define NTCase schema
export const NTCaseSchema = z.enum([
    "NA",
    "nominative",
    "genitive",
    "dative",
    "accusative",
]);
export type NTCase = z.infer<typeof NTCaseSchema>;

// Define NTNumber schema
export const NTNumberSchema = z.enum(["NA", "singular", "plural"]);
export type NTNumber = z.infer<typeof NTNumberSchema>;

// Define NTGender schema
export const NTGenderSchema = z.enum(["NA", "masculine", "feminine", "neuter"]);
export type NTGender = z.infer<typeof NTGenderSchema>;

// Define NTDegree schema
export const NTDegreeSchema = z.enum(["NA", "comparative", "superlative"]);
export type NTDegree = z.infer<typeof NTDegreeSchema>;

// GreekWordRow schema
export const GreekWordRowSchema = z.object({
    _id: z.number(),
    freq_lex: z.number(),
    lex_id: z.number(),
    punctuated_text: z.string(),
    unpunctuated_text: z.string(),
    lemma: z.string(),
    part_of_speech: NTPartOfSpeechSchema,
    person: NTPersonSchema,
    tense: NTTenseSchema,
    voice: NTVoiceSchema,
    mood: NTMoodSchema,
    grammatical_case: NTCaseSchema,
    grammatical_number: NTNumberSchema,
    gender: NTGenderSchema,
    degree: NTDegreeSchema,
    languageISO: LanguageIsoSchema,
    votes: z.array(GlossRowSchema),
    englishGloss: z.string(),
});
export type GreekWordRow = z.infer<typeof GreekWordRowSchema> & WordRow;