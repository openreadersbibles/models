import { Annotation, annotationFromJson, AnnotationType, MarkdownAnnotation, WordAnnotation } from "./Annotation";
import { GlossRow, GlossSendObject, PhraseGlossRow } from "./database-input-output";

import { GlossLocation, PhraseGlossLocation } from "./gloss-locations";

export class Gloss {
    private _annotation: Annotation;
    private _other_votes: number;
    private _gloss_id: number;
    private _changed: boolean;
    private _myVote: 0 | 1;
    private _location: GlossLocation;

    constructor(annotation: Annotation, other_votes: number, gloss_id: number, location: GlossLocation, myvote: 0 | 1) {
        this._annotation = annotation;
        this._location = location;
        this._myVote = myvote;
        this._other_votes = other_votes;
        this._gloss_id = gloss_id;
        this._changed = false;
    }

    static fromWordGlossRow(row: GlossRow, location: GlossLocation, myvote: 0 | 1): Gloss {
        let annotation = annotationFromJson(row.jsonContent) || new WordAnnotation("");
        let other_votes = row.votes - myvote; /// so that we don't count the user's vote twice
        let gloss_id = row.gloss_id;
        return new Gloss(annotation, other_votes, gloss_id, location, myvote);
    }

    static fromPhraseGlossRow(row: PhraseGlossRow, location: PhraseGlossLocation, myvote: 0 | 1): Gloss {
        let annotation = new MarkdownAnnotation(row.markdown);
        let other_votes = row.votes - myvote; /// so that we don't count the user's vote twice
        let gloss_id = row.phrase_gloss_id;
        return new Gloss(annotation, other_votes, gloss_id, location, myvote);
    }

    get location(): GlossLocation {
        return this._location;
    }

    get html(): string {
        return this._annotation.html;
    }

    get votes(): number {
        return this._other_votes + this._myVote;
    }

    get gloss_id(): number {
        return this._gloss_id;
    }

    get annotationType(): AnnotationType {
        return this._annotation.type;
    }

    markAsChanged(): void {
        this._changed = true;
    }

    get changed(): boolean {
        return this._changed;
    }

    markAsUnchanged(): void {
        this._changed = false;
    }

    get isMyVote(): boolean {
        return this._myVote === 1;
    }

    toggleGloss(): void {
        this._myVote = this._myVote === 0 ? 1 : 0;
        this._changed = true;
    }

    toGlossSendObject(): GlossSendObject {
        return {
            annotationObject: this._annotation.toAnnotationObject(),
            gloss_id: this._gloss_id,
            myVote: this._myVote,
            location: this._location.toObject()
        };
    }

    addVote(): void {
        let changed = this._myVote === 0;
        this._myVote = 1;
        if (changed) {
            this._changed = true;
        }
    }

    removeVote(): void {
        let changed = this._myVote === 1;
        this._myVote = 0;
        if (changed) {
            this._changed = true;
        }
    }

    matches(other: Gloss): boolean {
        if (this._gloss_id == -1 && other._gloss_id == -1) {
            const thisAnnotation = JSON.stringify(this._annotation.toAnnotationObject());
            const otherAnnotation = JSON.stringify(other._annotation.toAnnotationObject());
            return thisAnnotation === otherAnnotation;
        } else {
            return this._gloss_id === other._gloss_id;
        }
    }

    static newGloss(annotation: Annotation, location: GlossLocation, votedFor: boolean): Gloss {
        let g = new Gloss(annotation, 0, -1, location, 0);
        if (votedFor) {
            g.addVote();
            g.markAsChanged();
        }
        return g;
    }
}
