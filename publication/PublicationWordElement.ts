import { Canon } from "@models/Canon.js";
import { Annotation } from "../../models/Annotation.js";
<<<<<<< Updated upstream
import { VerseReference } from "../../models/VerseReference.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
=======
>>>>>>> Stashed changes
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";

export interface PublicationWordElement {
    plaintext: string;
    lexicalform: string;
    trailer: string; /// this will admittedly only be relevant for Hebrew/Aramaic
<<<<<<< Updated upstream
    requiredFootnoteType(ref: VerseReference): PublicationFootnoteType;
=======
>>>>>>> Stashed changes
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
    get freq_lex(): number;
    get canon(): Canon;
    getBelowFrequencyThreshold(): boolean;
}