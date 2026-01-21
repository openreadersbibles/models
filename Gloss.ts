import { Annotation, annotationFromObject, MarkdownAnnotation, WordAnnotation } from "./Annotation.js";
import { AnnotationType } from "./AnnotationJsonObject.js";
import { GlossLocation, PhraseGlossLocation } from "./gloss-locations.js";
import { GlossRow } from "./GlossRow.js";
import { GlossSendObject } from "./GlossSendObject.js";
import { PhraseGlossRow } from "./PhraseGlossRow.js";
import { UserId } from "./UserProfile.js";
import { Voice } from "./Voice.js";

export class Gloss {
    private _annotation: Annotation;
    private _gloss_id: number;
    private _changed: boolean;
    private _location: GlossLocation;
    private _votes: UserId[];

    constructor(annotation: Annotation, gloss_id: number, location: GlossLocation, votes: UserId[]) {
        this._annotation = annotation;
        this._location = location;
        this._gloss_id = gloss_id;
        this._changed = false;
        this._votes = votes;
    }

    static fromWordGlossRow(row: GlossRow, location: GlossLocation): Gloss {
        let annotation = annotationFromObject(row.annotationObject);
        if (annotation === undefined) {
            annotation = new WordAnnotation("", row.gloss_id, row.voice);
        }
        const gloss_id = row.gloss_id;
        return new Gloss(annotation, gloss_id, location, row.votes);
    }

    static fromPhraseGlossRow(row: PhraseGlossRow, location: PhraseGlossLocation): Gloss {
        const annotation = new MarkdownAnnotation(row.markdown, row.phrase_gloss_id, 'NA');
        const gloss_id = row.phrase_gloss_id;
        return new Gloss(annotation, gloss_id, location, row.votes);
    }

    get location(): GlossLocation {
        return this._location;
    }

    get html(): string {
        return this._annotation.html;
    }

    get votes(): number {
        return this._votes.length;
    }

    get gloss_id(): number {
        return this._gloss_id;
    }

    get annotationType(): AnnotationType {
        return this._annotation.type;
    }

    get voice(): Voice {
        return this._annotation.voice;
    }

    markAsChanged(): void {
        this._changed = true;
    }

    get changed(): boolean {
        return this._changed;
    }

    get annotation(): Annotation {
        return this._annotation;
    }

    markAsUnchanged(): void {
        this._changed = false;
    }

    isUsersVote(user_id: UserId): boolean {
        return this._votes.includes(user_id);
    }

    toggleGloss(user_id: UserId): void {
        if (this.isUsersVote(user_id)) {
            this.removeVote(user_id);
        } else {
            this.addVote(user_id);
        }
        this._changed = true;
    }

    toGlossSendObject(): GlossSendObject {
        return {
            annotationObject: this._annotation.toAnnotationObject(),
            votes: this._votes,
            location: this._location.toObject()
        };
    }

    addVote(user_id: UserId): void {
        const changed = !this.isUsersVote(user_id);
        if (changed) {
            this._votes.push(user_id);
            this._changed = true;
        }
    }

    removeVote(user_id: UserId): void {
        const changed = this.isUsersVote(user_id);
        if (changed) {
            this._votes = this._votes.filter(vote => vote !== user_id);
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

    replaceAnnotation(newAnnotation: Annotation): Gloss {
        return new Gloss(newAnnotation, this._gloss_id, this._location, this._votes);
    }

    /// NB: This should be used to create a Gloss object that is not yet in the database.
    /// It will have a gloss_id of -1.
    /// TODO: How can I make it harder to misuse this method?
    static newGloss(annotation: Annotation, location: GlossLocation, voter?: UserId): Gloss {
        const g = new Gloss(annotation, -1, location, []);
        if (voter) {
            g.addVote(voter);
            g.markAsChanged();
        }
        return g;
    }
}
