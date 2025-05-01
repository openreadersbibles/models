import { VerseReference } from "@models/VerseReference.js";
import { PublicationRequest } from "../../models/PublicationRequest.js";
import { PublicationWord } from "./PublicationWord.js";
import { Annotation } from "@models/Annotation.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";
import { PublicationWordElementRow } from "./PublicationWordElementRow.js";

export abstract class BaseWordElement<T extends PublicationWordElementRow> {
    row: T;
    request: PublicationRequest;
    word: PublicationWord;

    constructor(obj: T, word: PublicationWord, request: PublicationRequest) {
        this.row = obj;
        this.word = word;
        this.request = request;
    }

    get freq_lex(): number {
        return this.row.freq_lex;
    }

    getBelowFrequencyThreshold(ref: VerseReference): boolean {
        const threshold = this.request.frequency_thresholds.get(ref.canon);
        if (threshold === undefined) {
            const msg = `Threshold not found for canon: ${ref.canon}`;
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
}