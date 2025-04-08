import { BaseWordElement } from "./BaseWordElement.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
export class PublicationGreekWordElement extends BaseWordElement {
    static fromWordRow(obj, word, request) {
        return new PublicationGreekWordElement(obj, word, request);
    }
    get plaintext() {
        return this.row.punctuated_text;
    }
    get isVerb() {
        return this.row.part_of_speech === 'verb';
    }
    get isSubstantive() {
        return PublicationGreekWordElement._substantive_parts_of_speech.indexOf(this.row.part_of_speech) > -1;
    }
    get isInteroggative() {
        return false; // only relevant to Hebrew/Aramaic?
    }
    get ketivQereString() {
        return ""; /// only relevant for Hebrew/Aramaic
    }
    get trailer() {
        return " "; /// this is originally for Hebrew/Aramaic, but the Greek database doesn't actually include spaces
    }
    getBelowFrequencyThreshold(ref) {
        return this.row.freq_lex < this.request.project.getFrequencyThreshold(ref.canon);
    }
    requiredFootnoteType(ref) {
        if (this.isVerb) {
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.ParsingGloss;
            }
            else {
                return PublicationFootnoteType.Parsing;
            }
        }
        if (this.isSubstantive) {
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.ParsingGloss;
            }
            else {
                return PublicationFootnoteType.None;
            }
        }
        else {
            if (this.getBelowFrequencyThreshold(ref)) {
                return PublicationFootnoteType.Gloss;
            }
            else {
                return PublicationFootnoteType.None;
            }
        }
    }
    get gloss() {
        return this.row.gloss;
    }
    getParsingString(ref) {
        const parsingFormat = this.request.configuration.getParsingFormat(ref.canon);
        if (parsingFormat === undefined) {
            console.error(`Parsing format not found for ${ref.canon}`);
            throw new Error(`Parsing format not found for ${ref.canon}`);
        }
        if (this.isVerb) {
            return parsingFormat.verbParsingString(this);
        }
        else if (this.isSubstantive) {
            return parsingFormat.nounParsingString(this);
        }
        else {
            console.error("A parsing is required but no parsing is available:", this);
            return "";
        }
    }
    get terminatesWord() {
        return true; /// Greek words are always separated by spaces
    }
    get lemma() {
        return this.row.lemma;
    }
    get lexicalform() {
        return this.row.lemma;
    }
    get part_of_speech() {
        return this.row.part_of_speech;
    }
    get person() {
        return this.row.person;
    }
    get tense() {
        return this.row.tense;
    }
    get voice() {
        return this.row.voice;
    }
    get mood() {
        return this.row.mood;
    }
    get grammatical_case() {
        return this.row.grammatical_case;
    }
    get grammatical_number() {
        return this.row.grammatical_number;
    }
    get gender() {
        return this.row.gender;
    }
    get degree() {
        return this.row.degree;
    }
    get phrasalGlosses() {
        return this.row.phrasalGlosses;
    }
    get id() {
        return this.row._id;
    }
}
PublicationGreekWordElement._substantive_parts_of_speech = ['noun', 'definite-article', 'personal-pronoun', 'relative-pronoun', 'verb', 'adjective', 'demonstrative-pronoun', 'interrogative-indefinite-pronoun'];
//# sourceMappingURL=PublicationGreekWordElement.js.map