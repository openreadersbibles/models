import { Gloss } from './Gloss.js';
import { WordGlossLocation } from './gloss-locations.js';
import { OTGenderToEnglish, OTGrammaticalNumberToEnglish, OTStateToEnglish, OTTenseToEnglish, OTVerbStemToEnglish, OTPersonToEnglish, OTPartOfSpeechToEnglish } from './HebrewWordRow.js';
import { WordElementBase } from './WordElement.js';
export class HebrewWordElement extends WordElementBase {
    constructor(row, suggestions) {
        super();
        this._row = row;
        /// votes contains the glosses that have actual votes
        this._glosses = row.votes.map((suggestion) => {
            const myvote = suggestion.gloss_id === row.myVote ? 1 : 0;
            const location = new WordGlossLocation(row._id, row.lex_id);
            return Gloss.fromWordGlossRow(suggestion, location, myvote);
        });
        /// suggestions is just an array of strings. If a string is
        /// not already represented in the _glosses member, it should be added
        suggestions?.forEach((value) => {
            if (this._glosses.find(g => g.html === value.html) !== undefined)
                return;
            this._glosses.push(Gloss.newGloss(value, this.location(), false));
        });
    }
    copyOf() {
        const copy = new HebrewWordElement(this._row);
        copy._glosses = this._glosses;
        return copy;
    }
    get language() {
        switch (this._row.languageISO) {
            case 'hbo': return 'hebrew';
            case 'arc': return 'aramaic';
            case 'grc': return 'greek';
        }
    }
    get text() {
        return this._row.g_word_utf8 + this._row.trailer_utf8;
    }
    get frequency() {
        return this._row.freq_lex;
    }
    get lex_id() {
        return this._row.lex_id;
    }
    get myVote() {
        return this._row.myVote;
    }
    get word_id() {
        return this._row._id;
    }
    get gender() {
        return this._row.gn;
    }
    get grammaticalNumber() {
        return this._row.nu;
    }
    get state() {
        return this._row.st;
    }
    get tense() {
        return this._row.vt;
    }
    get verbStem() {
        return this._row.vs;
    }
    get person() {
        return this._row.ps;
    }
    get partOfSpeech() {
        return this._row.pdp;
    }
    get englishGloss() {
        return this._row.englishGloss;
    }
    get prsGender() {
        return this._row.prs_gn;
    }
    get prsNumber() {
        return this._row.prs_nu;
    }
    get prsPerson() {
        return this._row.prs_ps;
    }
    get voc_lex_utf8() {
        return this._row.voc_lex_utf8;
    }
    location() {
        return new WordGlossLocation(this._row._id, this._row.lex_id);
    }
    parsingSummary() {
        const summary = new Map();
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
//# sourceMappingURL=HebrewWordElement.js.map