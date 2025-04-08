export class WordElementBase {
    constructor() {
        this._glosses = new Array();
    }
    get glossSuggestions() {
        return this._glosses;
    }
    setVote(gloss) {
        /// if the gloss is now the user's vote, we need to update the other glosses
        /// to make sure that only one gloss is the user's vote
        if (gloss.isMyVote) {
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    /// 2024-08-13: I don't recall what this was meant to do, and it's creating a compiler error
                    // g.setText(g.text); /// this ought to be relevant eventually
                    g.addVote();
                }
                else {
                    g.removeVote();
                }
            });
        }
        else { /// if we're taking away a vote, we don't change other glosses
            this._glosses.forEach(g => {
                if (g.matches(gloss)) {
                    g.removeVote();
                }
            });
        }
    }
    addNewGloss(gloss, votedFor) {
        if (votedFor) {
            gloss.addVote();
            this._glosses.push(gloss);
            this.setVote(gloss);
        }
        else {
            this._glosses.push(gloss);
        }
    }
    hasChangedGlosses() {
        for (const gloss of this._glosses) {
            if (gloss.changed) {
                return true;
            }
        }
        return false;
    }
    changedGlosses() {
        return this._glosses.filter(gloss => gloss.changed);
    }
    markGlossesAsUnchanged() {
        this._glosses.forEach(gloss => gloss.markAsUnchanged());
    }
    get hasEmptyGloss() {
        return this._glosses.some(g => g.annotationType === 'null');
    }
}
//# sourceMappingURL=WordElement.js.map