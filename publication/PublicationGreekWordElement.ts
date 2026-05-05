import { NTVoice } from "@models/NTVoice.js";
import { NTPartOfSpeech, NTPerson, NTTense, NTMood, NTCase, NTNumber, NTGender, NTDegree } from "../../models/GreekWordRow.js";
import { PublicationRequest } from "../../models/PublicationRequest.js";
import { BaseWordElement } from "./BaseWordElement.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
import { PublicationGreekWordElementRow } from "./PublicationGreekWordElementRow.js";
import { PublicationWord } from "./PublicationWord.js";
import { PublicationWordElement } from "./PublicationWordElement.js";


export class PublicationGreekWordElement extends BaseWordElement<PublicationGreekWordElementRow> implements PublicationWordElement {

    private static _substantive_parts_of_speech = ['noun', 'definite-article', 'personal-pronoun', 'relative-pronoun', 'verb', 'adjective', 'demonstrative-pronoun', 'interrogative-indefinite-pronoun']

    static fromWordRow(obj: PublicationGreekWordElementRow, word: PublicationWord, request: PublicationRequest): PublicationWordElement {
        return new PublicationGreekWordElement(obj, word, request);
    }

    get plaintext(): string {
        return this.row.punctuated_text
    }

    get isVerb(): boolean {
        return this.row.part_of_speech === 'verb';
    }

    get isSubstantive(): boolean {
        return PublicationGreekWordElement._substantive_parts_of_speech.indexOf(this.row.part_of_speech) > -1;
    }

    get isInteroggative(): boolean {
        return false; // only relevant to Hebrew/Aramaic?
    }

    get ketiv(): string {
        return ""; /// only relevant for Hebrew/Aramaic
    }

    get qere(): string {
        return ""; /// only relevant for Hebrew/Aramaic
    }

    get trailer(): string {
        return " "; /// this is originally for Hebrew/Aramaic, but the Greek database doesn't actually include spaces
    }

    requiredFootnoteType(): PublicationFootnoteType {
        if (this.isVerb) {
            if (this.getBelowFrequencyThreshold()) {
                return PublicationFootnoteType.ParsingGloss;
            } else if (!(this.mood == 'indicative' && this.tense == 'present')) {
                return PublicationFootnoteType.Parsing;
            } else {
                return PublicationFootnoteType.None;
            }
        } if (this.isSubstantive) {
            if (this.getBelowFrequencyThreshold()) {
                return PublicationFootnoteType.ParsingGloss;
            } else {
                return PublicationFootnoteType.None;
            }
        } else {
            if (this.getBelowFrequencyThreshold()) {
                return PublicationFootnoteType.Gloss;
            } else {
                return PublicationFootnoteType.None;
            }
        }
    }

    getParsingString(): string {
        const parsingFormat = this.request.configuration.getParsingFormat(this.reference.canon);
        if (parsingFormat === undefined) {
            console.error(`Parsing format not found for ${this.reference.canon}`);
            throw new Error(`Parsing format not found for ${this.reference.canon}`);
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

    get terminatesWord(): boolean {
        return true; /// Greek words are always separated by spaces
    }


    get lemma(): string {
        return this.row.lemma;
    }

    get lexicalform(): string {
        return this.row.lemma;
    }

    get part_of_speech(): NTPartOfSpeech {
        return this.row.part_of_speech;
    }

    get person(): NTPerson {
        return this.row.person;
    }

    get tense(): NTTense {
        return this.row.tense;
    }

    get voice(): NTVoice {
        return this.row.voice;
    }

    get mood(): NTMood {
        return this.row.mood;
    }

    get grammatical_case(): NTCase {
        return this.row.grammatical_case;
    }

    get grammatical_number(): NTNumber {
        return this.row.grammatical_number;
    }

    get gender(): NTGender {
        return this.row.gender;
    }

    get degree(): NTDegree {
        return this.row.degree;
    }

}