import { HebrewWordRow, OTGender, OTGrammaticalNumber, OTState, OTTense, OTVerbStem, OTPerson, OTPartOfSpeech, OTGenderToEnglish, OTGrammaticalNumberToEnglish, OTStateToEnglish, OTTenseToEnglish, OTVerbStemToEnglish, OTPersonToEnglish, OTPartOfSpeechToEnglish } from './HebrewWordRow.js';
import { WordElement } from './WordElement.js';
import { WordElementBase } from './WordElementBase.js';

export class HebrewWordElement extends WordElementBase<HebrewWordRow> implements WordElement {

    copyOf(): HebrewWordElement {
        const copy = new HebrewWordElement(this._row);
        copy._glosses = this._glosses;
        return copy;
    }

    get text(): string {
        return this._row.g_word_utf8 + this._row.trailer_utf8;
    }

    get gender(): OTGender {
        return this._row.gn;
    }

    get grammaticalNumber(): OTGrammaticalNumber {
        return this._row.nu;
    }

    get state(): OTState {
        return this._row.st;
    }

    get tense(): OTTense {
        return this._row.vt;
    }

    get verbStem(): OTVerbStem {
        return this._row.vs;
    }

    get person(): OTPerson {
        return this._row.ps;
    }

    get partOfSpeech(): OTPartOfSpeech {
        return this._row.pdp;
    }

    get englishGloss(): string {
        return this._row.englishGloss;
    }

    get prsGender(): OTGender {
        return this._row.prs_gn;
    }

    get prsNumber(): OTGrammaticalNumber {
        return this._row.prs_nu;
    }

    get prsPerson(): OTPerson {
        return this._row.prs_ps;
    }

    get voc_lex_utf8(): string {
        return this._row.voc_lex_utf8;
    }

    parsingSummary(): Map<string, string> {
        const summary = new Map<string, string>();

        summary.set('Headword', this.voc_lex_utf8);
        summary.set('English', this.englishGloss);
        if (this.gender !== "NA") {
            summary.set('Gender', OTGenderToEnglish(this.gender));
        }
        if (this.grammaticalNumber !== "NA") {
            summary.set('Number', OTGrammaticalNumberToEnglish(this.grammaticalNumber));
        }
        if (this.state !== "NA") {
            summary.set('State', OTStateToEnglish(this.state));
        }
        if (this.tense !== "NA") {
            summary.set('Tense', OTTenseToEnglish(this.tense));
        }
        if (this.verbStem !== "NA") {
            summary.set('Verb Stem', OTVerbStemToEnglish(this.verbStem));
        }
        if (this.person !== "NA") {
            summary.set('Person', OTPersonToEnglish(this.person));
        }
        summary.set('Part of Speech', OTPartOfSpeechToEnglish(this.partOfSpeech));

        if (this.prsGender !== "NA") {
            summary.set('Pronominal Suffix Gender', OTGenderToEnglish(this.prsGender));
        }
        if (this.prsNumber !== "NA") {
            summary.set('Pronominal Suffix Number', OTGrammaticalNumberToEnglish(this.prsNumber));
        }
        if (this.prsPerson !== "NA") {
            summary.set('Pronominal Suffix Person', OTPersonToEnglish(this.prsPerson));
        }

        return summary;
    }
}

