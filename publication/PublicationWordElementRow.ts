import { Annotation } from "@models/Annotation";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss";

export interface PublicationWordElementRow {
    _id: number;
    freq_lex: number;
    lex_id: number;
    gloss: Annotation | null;
    reference: string;
    phrasalGlosses: PublicationPhrasalGloss[];
}