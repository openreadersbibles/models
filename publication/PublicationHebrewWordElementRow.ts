import { Annotation } from "../../models/Annotation.js";
import { OTGender, OTGrammaticalNumber, OTState, OTTense, OTVerbStem, OTPerson, OTPartOfSpeech } from "../../models/HebrewWordRow.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";

export interface PublicationHebrewWordElementRow {
    _id: number;
    g_word_utf8: string;
    trailer_utf8: string;
    voc_lex_utf8: string;
    gn: OTGender;
    nu: OTGrammaticalNumber;
    st: OTState;
    vt: OTTense;
    vs: OTVerbStem;
    ps: OTPerson;
    pdp: OTPartOfSpeech;
    freq_lex: number;
    gloss: Annotation | null;
    qere_utf8: string;
    kq_hybrid_utf8: string;
    prs_gn: OTGender;
    prs_nu: OTGrammaticalNumber;
    prs_ps: OTPerson;
    lex_id: number;
    reference: string;
    phrasalGlosses: PublicationPhrasalGloss[];
}
