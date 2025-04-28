import { Annotation } from "../../models/Annotation.js";
import { VerseReference } from "../../models/VerseReference.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";

export interface PublicationWordElement {
    plaintext: string;
    lexicalform: string;
    trailer: string; /// this will admittedly only be relevant for Hebrew/Aramaic
    requiredFootnoteType(ref: VerseReference): PublicationFootnoteType;
    get isVerb(): boolean;
    get isSubstantive(): boolean;
    get isInteroggative(): boolean; // only relevant to Hebrew/Aramaic?
    gloss: Annotation | null;
    getParsingString(ref: VerseReference): string;
    get ketiv(): string; // only relevant for Hebrew/Aramaic
    get qere(): string; // only relevant for Hebrew/Aramaic
    get terminatesWord(): boolean;
    phrasalGlosses: PublicationPhrasalGloss[];
    get id(): number;
}