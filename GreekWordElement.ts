import { Annotation } from "./Annotation";
import { GlossRow } from "./database-input-output";
import { Gloss } from "./Gloss";
import { GlossLocation, WordGlossLocation } from "./gloss-locations";
import { GreekWordRow } from "./GreekWordRow";
import { BiblicalLanguage } from "./Verse";
import { WordElementBase, WordElement } from "./WordElement";

export class GreekWordElement extends WordElementBase implements WordElement {
    private _row: GreekWordRow;

    constructor(row: GreekWordRow, suggestions?: Annotation[]) {
        super();

        this._row = row;


        /// votes contains the glosses that have actual votes
        this._glosses = row.votes.map((suggestion: GlossRow) => {
            const myvote = suggestion.gloss_id === row.myVote ? 1 : 0 as 1 | 0;
            const location = new WordGlossLocation(row._id, row.lex_id);
            return Gloss.fromWordGlossRow(suggestion, location, myvote);
        });

        /// suggestions is just an array of strings. If a string is
        /// not already represented in the _glosses member, it should be added
        suggestions?.forEach((value: Annotation) => {
            if (this._glosses.find(g => g.html === value.html) !== undefined) return;
            this._glosses.push(Gloss.newGloss(value, this.location(), false));
        });
    }

    get language(): BiblicalLanguage {
        switch (this._row.languageISO) {
            case 'hbo': return 'hebrew';
            case 'arc': return 'aramaic';
            case 'grc': return 'greek';
        }
    }

    get text(): string {
        return this._row.punctuated_text;
    }

    get frequency(): number {
        return this._row.freq_lex;
    }

    get myVote(): number | null {
        return this._row.myVote;
    }

    get word_id(): number {
        return this._row._id;
    }

    get lex_id(): number {
        return this._row.lex_id;
    }

    copyOf(): GreekWordElement {
        const copy = new GreekWordElement(this._row);
        copy._glosses = this._glosses;
        return copy;
    }

    location(): GlossLocation {
        return new WordGlossLocation(this._row._id, this._row.lex_id);
    }

    parsingSummary(): Map<string, string> {
        const summary = new Map<string, string>();

        summary.set('Headword', this._row.lemma);
        summary.set('English', this._row.englishGloss);
        summary.set('Part of Speech', this._row.part_of_speech);
        if (this._row.person !== 'NA') summary.set('Person', this._row.person);
        if (this._row.tense !== 'NA') summary.set('Tense', this._row.tense);
        if (this._row.voice !== 'NA') summary.set('Voice', this._row.voice);
        if (this._row.mood !== 'NA') summary.set('Mood', this._row.mood);
        if (this._row.grammatical_case !== 'NA') summary.set('Case', this._row.grammatical_case);
        if (this._row.grammatical_number !== 'NA') summary.set('Number', this._row.grammatical_number);
        if (this._row.gender !== 'NA') summary.set('Gender', this._row.gender);
        if (this._row.degree !== 'NA') summary.set('Degree', this._row.degree);

        return summary;
    }
}

