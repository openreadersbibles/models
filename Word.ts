import { Annotation } from "./Annotation.js";
import { Gloss } from "./Gloss.js";
import { BiblicalLanguage } from "./Verse.js";
import { VerseReference } from "./VerseReference.js";
import { WordElement } from "./WordElement.js";

export class Word {
    private _elements: WordElement[] = new Array<WordElement>();
    private _reference: VerseReference;

    constructor(reference: VerseReference) {
        this._reference = reference;
    }

    addElement(element: WordElement) {
        this._elements.push(element);
    }

    get language(): BiblicalLanguage {
        /// we can assume it's the same for all elements
        return this._elements[0].language;
    }

    get reference(): VerseReference {
        return this._reference;
    }

    get elementCount(): number {
        return this._elements.length;
    }

    get text(): string {
        let result = '';
        for (const element of this._elements) {
            result += element.text;
        }
        return result;
    }

    get elements(): WordElement[] {
        return this._elements;
    }

    /// returns the elements of _glosses that occur less than 'frequency' times
    getElementsThatNeedGlosses(frequency: number): WordElement[] {
        return this._elements.filter(element => element.frequency < frequency);
    }

    hasChangedGlosses(): boolean {
        for (const element of this._elements) {
            if (element.hasChangedGlosses()) {
                return true;
            }
        }
        return false;
    }

    changedGlosses(): Gloss[] {
        let changedGlosses: Gloss[] = [];
        for (const element of this._elements) {
            changedGlosses = changedGlosses.concat(element.changedGlosses());
        }
        return changedGlosses;
    }

    markGlossesAsUnchanged(): void {
        for (const element of this._elements) {
            element.markGlossesAsUnchanged();
        }
    }

    addGlossForLexId(lexId: number, annotation: Annotation) {
        for (const element of this._elements) {
            if (element.lex_id === lexId) {
                element.addNewGloss(Gloss.newGloss(annotation, element.location(), false), false);
            }
        }
    }

    get firstId(): number {
        return this._elements[0].word_id;
    }

    get lastId(): number {
        return this._elements[this._elements.length - 1].word_id;
    }

    needsGloss(frequencyThreshold: number): boolean {
        return this._elements.some(element => element.frequency < frequencyThreshold);
    }

    needsGlossAndHasNoVote(frequencyThreshold: number): boolean {
        return this._elements.some(element => element.frequency < frequencyThreshold && element.myVote === null);
    }

    parsingSummary(): Map<string, string>[] {
        const summary: Map<string, string>[] = [];
        for (const element of this._elements) {
            summary.push(element.parsingSummary());
        }
        return summary;
    }

}