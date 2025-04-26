import { WorkflowRunSchema } from './publication/WorkflowRun.js';
import { z } from 'zod';
export const CheckResultsSchema = z.record(z.array(z.string()));

export const AdHocPublicationResultSchema = z.object({
    node_id: z.string(),
    ref: z.string(),
    url: z.string(),
    object: z.object({
        sha: z.string(),
        type: z.string(),
        url: z.string(),
    }),
});

export const AdHocWorkflowRunsResultSchema = z.object({
    total_count: z.number(),
    workflow_runs: z.array(WorkflowRunSchema), // Assuming WorkflowRun is already a Zod schema
});

export type CheckResults = z.infer<typeof CheckResultsSchema>;
export type AdHocPublicationResult = z.infer<typeof AdHocPublicationResultSchema>;
export type AdHocWorkflowRunsResult = z.infer<typeof AdHocWorkflowRunsResultSchema>;
