import { Annotation } from './Annotation.js';
import { Gloss } from './Gloss.js';
import { WordGlossLocation, GlossLocation } from './gloss-locations.js';
import { HebrewWordRow, OTGender, OTGrammaticalNumber, OTState, OTTense, OTVerbStem, OTPerson, OTPartOfSpeech, OTGenderToEnglish, OTGrammaticalNumberToEnglish, OTStateToEnglish, OTTenseToEnglish, OTVerbStemToEnglish, OTPersonToEnglish, OTPartOfSpeechToEnglish } from './HebrewWordRow.js';
import { BiblicalLanguage } from './Verse.js';
import { WordElement, WordElementBase } from './WordElement.js';
import { GlossRow } from './GlossRow.js';

export class HebrewWordElement extends WordElementBase implements WordElement {
    private _row: HebrewWordRow;

    constructor(row: HebrewWordRow, suggestions?: Annotation[]) {
        super();

        this._row = row;

        /// votes contains the glosses that have actual votes
        this._glosses = row.votes.map((suggestion: GlossRow) => {
            const location = new WordGlossLocation(row._id, row.lex_id);
            return Gloss.fromWordGlossRow(suggestion, location);
        });

        /// suggestions is just an array of strings. If a string is
        /// not already represented in the _glosses member, it should be added
        suggestions?.forEach((value: Annotation) => {
            if (this._glosses.find(g => g.html === value.html) !== undefined) return;
            this._glosses.push(Gloss.newGloss(value, this.location()));
        });
    }

    copyOf(): HebrewWordElement {
        const copy = new HebrewWordElement(this._row);
        copy._glosses = this._glosses;
        return copy;
    }

    get language(): BiblicalLanguage {
        switch (this._row.languageISO) {
            case 'hbo': return 'hebrew';
            case 'arc': return 'aramaic';
            case 'grc': return 'greek';
        }
    }

    get text(): string {
        return this._row.g_word_utf8 + this._row.trailer_utf8;
    }

    get frequency(): number {
        return this._row.freq_lex;
    }

    get lex_id(): number {
        return this._row.lex_id;
    }

    get word_id(): number {
        return this._row._id;
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

    location(): GlossLocation {
        return new WordGlossLocation(this._row._id, this._row.lex_id);
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

