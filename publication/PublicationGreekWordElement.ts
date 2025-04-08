import { Annotation } from "../../models/Annotation.js";
import { NTPartOfSpeech, NTPerson, NTTense, NTVoice, NTMood, NTCase, NTNumber, NTGender, NTDegree } from "../../models/GreekWordRow.js";
import { PublicationRequest } from "../../models/PublicationRequest.js";
import { VerseReference } from "../../models/VerseReference.js";
import { BaseWordElement } from "./BaseWordElement.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
import { PublicationGreekWordElementRow } from "./PublicationGreekWordElementRow.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";
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

    get ketivQereString(): string {
        return ""; /// only relevant for Hebrew/Aramaic
    }

    get trailer(): string {
        return " "; /// this is originally for Hebrew/Aramaic, but the Greek database doesn't actually include spaces
    }

    getBelowFrequencyThreshold(ref: VerseReference): boolean {
        return this.row.freq_lex < this.request.project.getFrequencyThreshold(ref.canon);
    }

    requiredFootnoteType(ref: VerseReference): PublicationFootnoteType {
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
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.Gloss;
            } else {
                return PublicationFootnoteType.None;
            }
        }
    }

    get gloss(): Annotation | null {
        return this.row.gloss;
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

    get phrasalGlosses(): PublicationPhrasalGloss[] {
        return this.row.phrasalGlosses;
    }

    get id(): number {
        return this.row._id;
    }

}