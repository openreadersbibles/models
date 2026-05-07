import { PublicationRequest } from "../../models/PublicationRequest.js";
import { PublicationWord } from "./PublicationWord.js";
import { Annotation } from "@models/Annotation.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";
import { PublicationWordElementRow } from "./PublicationWordElementRow.js";
import { Canon } from "@models/Canon.js";
import { VerseReference } from "@models/VerseReference.js";

export abstract class BaseWordElement<T extends PublicationWordElementRow> {
    row: T;
    request: PublicationRequest;
    word: PublicationWord;
    reference: VerseReference;

    constructor(obj: T, word: PublicationWord, request: PublicationRequest) {
        this.row = obj;
        this.word = word;
        this.request = request;
        const ref = VerseReference.fromString(obj.reference);
        if (ref === undefined) {
            throw new Error(`Invalid reference in object of type PublicationWordElementRow: ${obj.reference}`);
        } else {
            this.reference = ref;
        }
    }

    get freq_lex(): number {
        return this.row.freq_lex;
    }

    getBelowFrequencyThreshold(): boolean {
        const threshold = this.request.frequency_thresholds.get(this.canon);
        if (threshold === undefined) {
            const msg = `Threshold not found for canon: ${this.canon}`;
            console.error(msg);
            throw new Error(msg);
        } else {
            return this.row.freq_lex < threshold;
        }
    }

    get id(): number {
        return this.row._id;
    }

    get gloss(): Annotation | null {
        return this.row.gloss;
    }

    get phrasalGlosses(): PublicationPhrasalGloss[] {
        return this.row.phrasalGlosses;
    }

    abstract get isVerb(): boolean;
    abstract get isSubstantive(): boolean;

    /// the idea here is to be able to distinguish between a Greek or Hebrew word element
    abstract get canon(): Canon;
}