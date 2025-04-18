import { GreekWordRow } from "./GreekWordRow.js";
import { WordElement } from "./WordElement.js";
import { WordElementBase } from "./WordElementBase.js";

export class GreekWordElement extends WordElementBase<GreekWordRow> implements WordElement {

    copyOf(): GreekWordElement {
        const copy = new GreekWordElement(this._row);
        copy._glosses = this._glosses;
        return copy;
    }

    get text(): string {
        return this._row.punctuated_text;
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

