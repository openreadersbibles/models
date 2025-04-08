import { Word } from "./Word.js";
import { VerseReference } from "./VerseReference.js";
import { Gloss } from "./Gloss.js";
import { Annotation } from "./Annotation.js";

export type BiblicalLanguage = 'hebrew' | 'greek' | 'aramaic';

export class Verse {
    reference: VerseReference;
    words: Word[];
    phraseGlosses: Gloss[] = [];
    private _word_separator = ' ';

    /// For now I'll err on the side of specificity; Hebrew and Aramaic probably don't need to be handled differently
    language: BiblicalLanguage;
    constructor(reference: VerseReference, words: Word[], language: BiblicalLanguage, phraseGlosses: Gloss[]) {
        this.reference = reference;
        this.words = words;
        this.language = language;
        this.phraseGlosses = phraseGlosses;
    }

    static sortPhraseGlosses(phraseGlosses: Gloss[]): Map<string, Gloss[]> {
        const mappedPhraseGlosses = new Map<string, Gloss[]>();
        for (const gloss of phraseGlosses) {
            if (!mappedPhraseGlosses.has(gloss.location.asString())) {
                mappedPhraseGlosses.set(gloss.location.asString(), []);
            }
            mappedPhraseGlosses.get(gloss.location.asString())?.push(gloss);
        }
        return mappedPhraseGlosses;
    }

    hasChangedGlosses(): boolean {
        for (const word of this.words) {
            if (word.hasChangedGlosses()) {
                return true;
            }
        }
        for (const gloss of this.phraseGlosses) {
            if (gloss.changed) {
                return true;
            }
        }
        return false;
    }

    changedGlosses(): Gloss[] {
        let changedGlosses: Gloss[] = [];
        for (const word of this.words) {
            changedGlosses = changedGlosses.concat(word.changedGlosses());
        }
        return changedGlosses;
    }

    changedPhraseGlosses(): Gloss[] {
        return this.phraseGlosses.filter(gloss => gloss.changed);
    }

    markGlossesAsUnchanged(): void {
        for (const word of this.words) {
            word.markGlossesAsUnchanged();
        }
        for (const gloss of this.phraseGlosses) {
            gloss.markAsUnchanged();
        }
    }

    addGlossForLexId(lexId: number, annotation: Annotation) {
        for (const word of this.words) {
            word.addGlossForLexId(lexId, annotation);
        }
    }

    textPortion(from: number, to: number): string {
        let result = '';
        this.words.forEach((word) => {
            if (word.firstId >= from && word.firstId <= to) {
                result += word.text + this._word_separator;
            }
        });
        return result;
    }

    addPhraseGloss(gloss: Gloss) {
        this.phraseGlosses.push(gloss);
    }

    copyOf(): Verse {
        return new Verse(this.reference, this.words, this.language, this.phraseGlosses);
    }

    setVote(gloss: Gloss): void {
        /// See WordElement.setVote for logic

        /// if the gloss is now the user's vote, we need to update the other glosses
        /// to make sure that only one gloss is the user's vote
        if (gloss.isMyVote) {
            this.phraseGlosses.forEach(g => {
                if (g.gloss_id === gloss.gloss_id) {
                    g.addVote();
                } else {
                    g.removeVote();
                }
            });
        } else { /// if we're taking away a vote, we don't change other glosses
            this.phraseGlosses.forEach(g => {
                if (g.gloss_id === gloss.gloss_id) {
                    g.removeVote();
                }
            });

        }
    }

    wordsRemainingToGloss(frequencyThreshold: number): number {
        return this.words.filter((word: Word) => word.needsGlossAndHasNoVote(frequencyThreshold)).length;
    }
}