import { Gloss } from "./Gloss.js";
import { GlossLocation } from "./gloss-locations.js";
import { BiblicalLanguage } from "./Verse.js";
import { UserId } from "./UserProfile.js";

export interface WordElement {
    get text(): string;
    get frequency(): number;
    get glossSuggestions(): Gloss[];
    setVote(gloss: Gloss, user_id: UserId): void;
    addNewGloss(gloss: Gloss, votedFor: boolean, user_id: UserId): void;
    hasChangedGlosses(): boolean;
    changedGlosses(): Gloss[];
    get word_id(): number;
    get lex_id(): number;
    copyOf(): WordElement;
    markGlossesAsUnchanged(): void;
    location(): GlossLocation;
    parsingSummary(): Map<string, string>;
    get language(): BiblicalLanguage;
    get hasEmptyGloss(): boolean;
    userHasVoted(user_id: UserId): boolean;
}

export interface GlossContainer {
    copyOf(): GlossContainer;
    setVote(gloss: Gloss, user_id: UserId): void;
}

export class WordElementBase {
    protected _glosses: Gloss[] = new Array<Gloss>();

    get glossSuggestions(): Gloss[] {
        return this._glosses;
    }

    setVote(gloss: Gloss, user_id: UserId): void {
        /// if the gloss is now the user's vote, we need to update the other glosses
        /// to make sure that only one gloss is the user's vote
        if (gloss.isUsersVote(user_id)) {
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    /// 2024-08-13: I don't recall what this was meant to do, and it's creating a compiler error
                    // g.setText(g.text); /// this ought to be relevant eventually
                    g.addVote(user_id);
                } else {
                    g.removeVote(user_id);
                }
            });
        } else { /// if we're taking away a vote, we don't change other glosses
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    g.removeVote(user_id);
                }
            });

        }
    }

    addNewGloss(gloss: Gloss, votedFor: boolean, user_id: UserId): void {
        if (votedFor) {
            gloss.addVote(user_id);
            this._glosses.push(gloss);
            this.setVote(gloss, user_id);
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

    userHasVoted(user_id: UserId): boolean {
        return this._glosses.some(gloss => gloss.isUsersVote(user_id));
    }

    markGlossesAsUnchanged(): void {
        this._glosses.forEach(gloss => gloss.markAsUnchanged());
    }

    get hasEmptyGloss(): boolean {
        return this._glosses.some(g => g.annotationType === 'null');
    }

}

