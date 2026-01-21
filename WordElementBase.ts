import { Annotation } from "./Annotation";
import { Gloss } from "./Gloss";
import { WordGlossLocation, GlossLocation } from "./gloss-locations";
import { GlossRow } from "./GlossRow";
import { UserId } from "./UserProfile";
import { BiblicalLanguage } from "./Verse";
import { WordRow } from "./WordRow";

export class WordElementBase<T extends WordRow> {
    protected _row: T;
    protected _glosses: Gloss[] = new Array<Gloss>();


    constructor(row: T, suggestions?: Annotation[]) {
        this._row = row;

        /// votes contains the glosses that have actual votes
        this._glosses = row.votes.map((suggestion: GlossRow) => {
            const location = new WordGlossLocation(row._id, row.lex_id);
            return Gloss.fromWordGlossRow(suggestion, location);
        });

        /// suggestions is just an array of Annotation objects
        suggestions?.forEach((annotation: Annotation) => {
            if (this._glosses.find(g => g.html === annotation.html) !== undefined) return;
            const g = new Gloss(annotation, annotation.gloss_id, this.location(), []);
            this._glosses.push(g);
        });
    }


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

    removeGloss(gloss: Gloss): void {
        console.log('removing', gloss);
        console.log('before', this._glosses);
        this._glosses = this._glosses.filter(g => g.gloss_id !== gloss.gloss_id);
        console.log('after', this._glosses);
    }

    replaceGloss(gloss: Gloss): void {
        this._glosses = this._glosses.filter(g => g.gloss_id !== gloss.gloss_id);
        this._glosses.push(gloss);
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

    location(): GlossLocation {
        return new WordGlossLocation(this._row._id, this._row.lex_id);
    }

    get language(): BiblicalLanguage {
        switch (this._row.languageISO) {
            case 'hbo': return 'hebrew';
            case 'arc': return 'aramaic';
            case 'grc': return 'greek';
        }
    }

    get frequency(): number {
        return this._row.freq_lex;
    }

    get word_id(): number {
        return this._row._id;
    }

    get lex_id(): number {
        return this._row.lex_id;
    }


}

