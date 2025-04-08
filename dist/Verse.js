export class Verse {
    constructor(reference, words, language, phraseGlosses) {
        this.phraseGlosses = [];
        this._word_separator = ' ';
        this.reference = reference;
        this.words = words;
        this.language = language;
        this.phraseGlosses = phraseGlosses;
    }
    static sortPhraseGlosses(phraseGlosses) {
        const mappedPhraseGlosses = new Map();
        for (const gloss of phraseGlosses) {
            if (!mappedPhraseGlosses.has(gloss.location.asString())) {
                mappedPhraseGlosses.set(gloss.location.asString(), []);
            }
            mappedPhraseGlosses.get(gloss.location.asString())?.push(gloss);
        }
        return mappedPhraseGlosses;
    }
    hasChangedGlosses() {
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
    changedGlosses() {
        let changedGlosses = [];
        for (const word of this.words) {
            changedGlosses = changedGlosses.concat(word.changedGlosses());
        }
        return changedGlosses;
    }
    changedPhraseGlosses() {
        return this.phraseGlosses.filter(gloss => gloss.changed);
    }
    markGlossesAsUnchanged() {
        for (const word of this.words) {
            word.markGlossesAsUnchanged();
        }
        for (const gloss of this.phraseGlosses) {
            gloss.markAsUnchanged();
        }
    }
    addGlossForLexId(lexId, annotation) {
        for (const word of this.words) {
            word.addGlossForLexId(lexId, annotation);
        }
    }
    textPortion(from, to) {
        let result = '';
        this.words.forEach((word) => {
            if (word.firstId >= from && word.firstId <= to) {
                result += word.text + this._word_separator;
            }
        });
        return result;
    }
    addPhraseGloss(gloss) {
        this.phraseGlosses.push(gloss);
    }
    copyOf() {
        return new Verse(this.reference, this.words, this.language, this.phraseGlosses);
    }
    setVote(gloss) {
        /// See WordElement.setVote for logic
        /// if the gloss is now the user's vote, we need to update the other glosses
        /// to make sure that only one gloss is the user's vote
        if (gloss.isMyVote) {
            this.phraseGlosses.forEach(g => {
                if (g.gloss_id === gloss.gloss_id) {
                    g.addVote();
                }
                else {
                    g.removeVote();
                }
            });
        }
        else { /// if we're taking away a vote, we don't change other glosses
            this.phraseGlosses.forEach(g => {
                if (g.gloss_id === gloss.gloss_id) {
                    g.removeVote();
                }
            });
        }
    }
    wordsRemainingToGloss(frequencyThreshold) {
        return this.words.filter((word) => word.needsGlossAndHasNoVote(frequencyThreshold)).length;
    }
}
//# sourceMappingURL=Verse.js.map