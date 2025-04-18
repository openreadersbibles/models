import { GlossRow } from "./GlossRow";
import { LanguageIso } from "./LanguageIso";

export interface WordRow {
    _id: number;
    lex_id: number;
    votes: GlossRow[];
    languageISO: LanguageIso;
    freq_lex: number;
};