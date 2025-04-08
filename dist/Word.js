import { Gloss } from "./Gloss.js";
export class Word {
    constructor(reference) {
        this._elements = new Array();
        this._reference = reference;
    }
    addElement(element) {
        this._elements.push(element);
    }
    get language() {
        /// we can assume it's the same for all elements
        return this._elements[0].language;
    }
    get reference() {
        return this._reference;
    }
    get elementCount() {
        return this._elements.length;
    }
    get text() {
        let result = '';
        for (const element of this._elements) {
            result += element.text;
        }
        return result;
    }
    get elements() {
        return this._elements;
    }
    /// returns the elements of _glosses that occur less than 'frequency' times
    getElementsThatNeedGlosses(frequency) {
        return this._elements.filter(element => element.frequency < frequency);
    }
    hasChangedGlosses() {
        for (const element of this._elements) {
            if (element.hasChangedGlosses()) {
                return true;
            }
        }
        return false;
    }
    changedGlosses() {
        let changedGlosses = [];
        for (const element of this._elements) {
            changedGlosses = changedGlosses.concat(element.changedGlosses());
        }
        return changedGlosses;
    }
    markGlossesAsUnchanged() {
        for (const element of this._elements) {
            element.markGlossesAsUnchanged();
        }
    }
    addGlossForLexId(lexId, annotation) {
        for (const element of this._elements) {
            if (element.lex_id === lexId) {
                element.addNewGloss(Gloss.newGloss(annotation, element.location(), false), false);
            }
        }
    }
    get firstId() {
        return this._elements[0].word_id;
    }
    get lastId() {
        return this._elements[this._elements.length - 1].word_id;
    }
    needsGloss(frequencyThreshold) {
        return this._elements.some(element => element.frequency < frequencyThreshold);
    }
    needsGlossAndHasNoVote(frequencyThreshold) {
        return this._elements.some(element => element.frequency < frequencyThreshold && element.myVote === null);
    }
    parsingSummary() {
        const summary = [];
        for (const element of this._elements) {
            summary.push(element.parsingSummary());
        }
        return summary;
    }
}
//# sourceMappingURL=Word.js.map