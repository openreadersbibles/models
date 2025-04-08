import { Gloss } from "./Gloss.js";
import { GlossLocation } from "./gloss-locations.js";
import { BiblicalLanguage } from "./Verse.js";

export interface WordElement {
    get text(): string;
    get frequency(): number;
    get glossSuggestions(): Gloss[];
    setVote(gloss: Gloss): void;
    addNewGloss(gloss: Gloss, votedFor: boolean): void;
    hasChangedGlosses(): boolean;
    changedGlosses(): Gloss[];
    get myVote(): number | null;
    get word_id(): number;
    get lex_id(): number;
    copyOf(): WordElement;
    markGlossesAsUnchanged(): void;
    location(): GlossLocation;
    parsingSummary(): Map<string, string>;
    get language(): BiblicalLanguage;
    get hasEmptyGloss(): boolean;
}

export interface GlossContainer {
    copyOf(): GlossContainer;
    setVote(gloss: Gloss): void;
}

export class WordElementBase {
    protected _glosses: Gloss[] = new Array<Gloss>();

    get glossSuggestions(): Gloss[] {
        return this._glosses;
    }

    setVote(gloss: Gloss): void {
        /// if the gloss is now the user's vote, we need to update the other glosses
        /// to make sure that only one gloss is the user's vote
        if (gloss.isMyVote) {
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    /// 2024-08-13: I don't recall what this was meant to do, and it's creating a compiler error
                    // g.setText(g.text); /// this ought to be relevant eventually
                    g.addVote();
                } else {
                    g.removeVote();
                }
            });
        } else { /// if we're taking away a vote, we don't change other glosses
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    g.removeVote();
                }
            });

        }
    }

    addNewGloss(gloss: Gloss, votedFor: boolean): void {
        if (votedFor) {
            gloss.addVote();
            this._glosses.push(gloss);
            this.setVote(gloss);
        } else {
            this._glosses.push(gloss);
        }
    }

    hasChangedGlosses(): boolean {
        for (const gloss of this._glosses) {
            if (gloss.changed) {
                return true;
            }
        }
        return false;
    }

    changedGlosses(): Gloss[] {
        return this._glosses.filter(gloss => gloss.changed);
    }

    markGlossesAsUnchanged(): void {
        this._glosses.forEach(gloss => gloss.markAsUnchanged());
    }

    get hasEmptyGloss(): boolean {
        return this._glosses.some(g => g.annotationType === 'null');
    }

}

