import { annotationFromJson, MarkdownAnnotation, WordAnnotation } from "./Annotation.js";
export class Gloss {
    constructor(annotation, other_votes, gloss_id, location, myvote) {
        this._annotation = annotation;
        this._location = location;
        this._myVote = myvote;
        this._other_votes = other_votes;
        this._gloss_id = gloss_id;
        this._changed = false;
    }
    static fromWordGlossRow(row, location, myvote) {
        const annotation = annotationFromJson(row.jsonContent) || new WordAnnotation("");
        const other_votes = row.votes - myvote; /// so that we don't count the user's vote twice
        const gloss_id = row.gloss_id;
        return new Gloss(annotation, other_votes, gloss_id, location, myvote);
    }
    static fromPhraseGlossRow(row, location, myvote) {
        const annotation = new MarkdownAnnotation(row.markdown);
        const other_votes = row.votes - myvote; /// so that we don't count the user's vote twice
        const gloss_id = row.phrase_gloss_id;
        return new Gloss(annotation, other_votes, gloss_id, location, myvote);
    }
    get location() {
        return this._location;
    }
    get html() {
        return this._annotation.html;
    }
    get votes() {
        return this._other_votes + this._myVote;
    }
    get gloss_id() {
        return this._gloss_id;
    }
    get annotationType() {
        return this._annotation.type;
    }
    markAsChanged() {
        this._changed = true;
    }
    get changed() {
        return this._changed;
    }
    markAsUnchanged() {
        this._changed = false;
    }
    get isMyVote() {
        return this._myVote === 1;
    }
    toggleGloss() {
        this._myVote = this._myVote === 0 ? 1 : 0;
        this._changed = true;
    }
    toGlossSendObject() {
        return {
            annotationObject: this._annotation.toAnnotationObject(),
            gloss_id: this._gloss_id,
            myVote: this._myVote,
            location: this._location.toObject()
        };
    }
    addVote() {
        const changed = this._myVote === 0;
        this._myVote = 1;
        if (changed) {
            this._changed = true;
        }
    }
    removeVote() {
        const changed = this._myVote === 1;
        this._myVote = 0;
        if (changed) {
            this._changed = true;
        }
    }
    matches(other) {
        if (this._gloss_id == -1 && other._gloss_id == -1) {
            const thisAnnotation = JSON.stringify(this._annotation.toAnnotationObject());
            const otherAnnotation = JSON.stringify(other._annotation.toAnnotationObject());
            return thisAnnotation === otherAnnotation;
        }
        else {
            return this._gloss_id === other._gloss_id;
        }
    }
    static newGloss(annotation, location, votedFor) {
        const g = new Gloss(annotation, 0, -1, location, 0);
        if (votedFor) {
            g.addVote();
            g.markAsChanged();
        }
        return g;
    }
}
//# sourceMappingURL=Gloss.js.map