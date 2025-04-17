import { AnnotationJsonObject } from "./AnnotationJsonObject.js";
import { PhraseGlossLocationObject, WordGlossLocationObject } from "./gloss-locations.js";
import { WorkflowRun } from './publication/WorkflowRun.js';
import { UserId } from "./UserProfile.js";

export interface UpdateVerseData {
    word_gloss_updates: GlossSendObject[];
    phrase_gloss_updates: GlossSendObject[];
}

export interface GlossSendObject {
    annotationObject: AnnotationJsonObject;
    gloss_id: number;
    votes: UserId[];
    location: WordGlossLocationObject | PhraseGlossLocationObject;
}

export interface CheckResults {
    [key: string]: string[];
}

export type AdHocPublicationResult = {
    node_id: string,
    ref: string,
    url: string,
    object: { sha: string, type: string, url: string }
};

export type AdHocWorkflowRunsResult = { total_count: number, workflow_runs: WorkflowRun[] };
