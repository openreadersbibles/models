
import { Annotation } from "../../models/Annotation.js";
import { NTCase, NTDegree, NTGender, NTMood, NTNumber, NTPartOfSpeech, NTPerson, NTTense, NTVoice } from "../../models/GreekWordRow.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";

export interface PublicationGreekWordElementRow {
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
    gloss: Annotation | null;
    reference: string;
    phrasalGlosses: PublicationPhrasalGloss[];
}