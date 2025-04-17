import { WorkflowRun } from './publication/WorkflowRun.js';

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
