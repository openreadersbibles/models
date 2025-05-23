import { PublicationWord } from "./PublicationWord.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
import { PublicationRequest } from "../../models/PublicationRequest.js";
import { PublicationWordElement } from "./PublicationWordElement.js";
import { PublicationHebrewWordElementRow } from "./PublicationHebrewWordElementRow.js";
import { BaseWordElement } from "./BaseWordElement.js";
import { OTGender, OTGrammaticalNumber, OTPartOfSpeech, OTPerson, OTState, OTTense, OTVerbStem } from "../../models/HebrewWordRow.js";
import { VerseReference } from "../../models/VerseReference.js";

export class PublicationHebrewWordElement extends BaseWordElement<PublicationHebrewWordElementRow> implements PublicationWordElement {
    static substantives = ["subs", "nmpr", "adjv", "prps", "prde"];

    static fromWordRow(obj: PublicationHebrewWordElementRow, word: PublicationWord, request: PublicationRequest): PublicationWordElement {
        return new PublicationHebrewWordElement(obj, word, request);
    }

    get plaintext(): string { return this.g_word_utf8; }
    get trailer(): string { return this.trailer_utf8; }
    get g_word_utf8(): string { return this.row.g_word_utf8; }
    get trailer_utf8(): string { return this.row.trailer_utf8; }
    get voc_lex_utf8(): string { return this.row.voc_lex_utf8; }
    get gn(): OTGender { return this.row.gn; }
    get nu(): OTGrammaticalNumber { return this.row.nu; }
    get st(): OTState { return this.row.st; }
    get vt(): OTTense { return this.row.vt; }
    get vs(): OTVerbStem { return this.row.vs; }
    get ps(): OTPerson { return this.row.ps; }
    get pdp(): OTPartOfSpeech { return this.row.pdp; }
    get qere_utf8(): string { return this.row.qere_utf8; }
    get kq_hybrid_utf8(): string { return this.row.kq_hybrid_utf8; }
    get prs_gn(): OTGender { return this.row.prs_gn; }
    get prs_nu(): OTGrammaticalNumber { return this.row.prs_nu; }
    get prs_ps(): OTPerson { return this.row.prs_ps; }

    get lexicalform(): string {
        return this.row.voc_lex_utf8;
    }

    requiredFootnoteType(ref: VerseReference): PublicationFootnoteType {
        /// this is a special case, but I'm not proud of this code.
        /// It's the word יָהּ, which occurs in Hallelujah. Technically
        /// it's a rare word (49 occurrences), but it sort of a short
        /// form for יהוה, so it should not be glossed. 
        if (this.row.lex_id === 1439638) {
            return PublicationFootnoteType.None;
        }

        if (this.isVerb) {
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.ParsingGloss;
            } else {
                return PublicationFootnoteType.Parsing;
            }
        } if (this.isSubstantive) {
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.ParsingGloss;
            } else {
                return PublicationFootnoteType.None;
            }
        } else {
            if (this.getBelowFrequencyThreshold(ref) && !this.isInteroggative) {
                return PublicationFootnoteType.Gloss;
            } else {
                return PublicationFootnoteType.None;
            }
        }
    }

    get reference(): string {
        return this.row.reference;
    }

    get hasPronominalSuffix(): boolean {
        return this.prs_gn != "NA";
    }

    get hasKetivQere(): boolean {
        return this.qere_utf8.length > 0;
    }

    get terminatesWord(): boolean {
        return this.trailer_utf8.length > 0;
    }

    get canBeParsed(): boolean {
        return this.isVerb || this.isSubstantive;
    }

    get isVerb(): boolean {
        return this.pdp === "verb";
    }

    get isSubstantive(): boolean {
        return PublicationHebrewWordElement.substantives.indexOf(this.pdp) != -1;
    }

    get isInteroggative(): boolean {
        /// TODO is this the only/best way to do this?
        /// these are the Hebrew and Aramaic lexical ids for the interrogative proclitic
        return this.row.lex_id === 1437821 || this.row.lex_id === 1445345;
    }

    get hasPrecedingInterrogative(): boolean {
        const thisIndex = this.word.elements.indexOf(this);
        for (let i = thisIndex - 1; i >= 0; i--) {
            /// if there is a preceding substantive or verb, then the
            /// interrogative will be attached to that word
            if (this.word.elements[i].isSubstantive || this.word.elements[i].isVerb) {
                return false;
            }
            else if (this.word.elements[i].isInteroggative) {
                return true;
            }
        }
        return false;
    }

    getParsingString(ref: VerseReference): string {
        const parsingFormat = this.request.configuration.getParsingFormat(ref.canon);
        if (parsingFormat === undefined) {
            console.error(`Parsing format not found for ${ref.canon}`);
            throw new Error(`Parsing format not found for ${ref.canon}`);
        }
        if (this.isVerb) {
            return parsingFormat.verbParsingString(this);
        } else if (this.isSubstantive) {
            return parsingFormat.nounParsingString(this);
        } else {
            console.error("A parsing is required but no parsing is available:", this);
            return "";
        }
    }

    get ketiv(): string {
        return this.kq_hybrid_utf8;
    }

    get qere(): string {
        return this.qere_utf8;
    }

}
