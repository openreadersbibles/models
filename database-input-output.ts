import { AnnotationJsonObject } from "./Annotation.js";
import { PhraseGlossLocationObject, WordGlossLocationObject } from "./gloss-locations.js";
import { WorkflowRun } from './publication/WorkflowRun.js';

export interface UpdateVerseData {
    word_gloss_updates: GlossSendObject[];
    phrase_gloss_updates: GlossSendObject[];
}

export interface GlossRow {
    jsonContent: string;
    gloss_id: number;
    votes: number;
}

export interface PhraseGlossRow {
    phrase_gloss_id: number;
    from_word_id: number;
    to_word_id: number;
    markdown: string;
    votes: number;
    myVote: number | null; /// NB: this is a gloss_id
}

export interface GlossSendObject {
    annotationObject: AnnotationJsonObject;
    gloss_id: number;
    myVote: 0 | 1;
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
