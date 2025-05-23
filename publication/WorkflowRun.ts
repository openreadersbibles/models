import { z } from 'zod';

export const WorkflowRunSchema = z.object({
    id: z.number(),
    name: z.string(),
    node_id: z.string(),
    head_branch: z.string(),
    head_sha: z.string(),
    run_number: z.number(),
    event: z.string(),
    status: z.enum(['queued', 'in_progress', 'completed']),
    conclusion: z.enum([
        'action_required',
        'cancelled',
        'failure',
        'neutral',
        'success',
        'skipped',
        'stale',
        'timed_out',
    ]),
    workflow_id: z.number(),
    check_suite_id: z.number(),
    check_suite_node_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    pull_requests: z.array(z.unknown()),
    created_at: z.string(),
    updated_at: z.string(),
    run_attempt: z.number(),
    run_started_at: z.string(),
    jobs_url: z.string(),
    logs_url: z.string(),
    check_suite_url: z.string(),
    artifacts_url: z.string(),
    cancel_url: z.string(),
    rerun_url: z.string(),
    previous_attempt_url: z.string().nullable(),
    workflow_url: z.string(),
    head_commit: z.object({
        id: z.string(),
        tree_id: z.string(),
        message: z.string(),
        timestamp: z.string(),
        author: z.object({
            name: z.string(),
            email: z.string(),
        }),
        committer: z.object({
            name: z.string(),
            email: z.string(),
        }),
    }),
    repository: z.object({
        id: z.number(),
        node_id: z.string(),
        name: z.string(),
        full_name: z.string(),
        private: z.boolean(),
        owner: z.object({
            login: z.string(),
            id: z.number(),
            node_id: z.string(),
            avatar_url: z.string(),
            gravatar_id: z.string(),
            url: z.string(),
            html_url: z.string(),
            followers_url: z.string(),
            following_url: z.string(),
            gists_url: z.string(),
            starred_url: z.string(),
            subscriptions_url: z.string(),
            organizations_url: z.string(),
            repos_url: z.string(),
            events_url: z.string(),
            received_events_url: z.string(),
            type: z.string(),
            site_admin: z.boolean(),
        }),
        html_url: z.string(),
        description: z.string(),
        fork: z.boolean(),
        url: z.string(),
        forks_url: z.string(),
        keys_url: z.string(),
        collaborators_url: z.string(),
        teams_url: z.string(),
        hooks_url: z.string(),
        issue_events_url: z.string(),
        events_url: z.string(),
        assignees_url: z.string(),
        branches_url: z.string(),
        tags_url: z.string(),
        blobs_url: z.string(),
        git_tags_url: z.string(),
        git_refs_url: z.string(),
        trees_url: z.string(),
        statuses_url: z.string(),
        languages_url: z.string(),
        stargazers_url: z.string(),
        contributors_url: z.string(),
        subscribers_url: z.string(),
        subscription_url: z.string(),
        commits_url: z.string(),
        git_commits_url: z.string(),
        comments_url: z.string(),
        issue_comment_url: z.string(),
        contents_url: z.string(),
        compare_url: z.string(),
        merges_url: z.string(),
        archive_url: z.string(),
        downloads_url: z.string(),
        issues_url: z.string(),
        pulls_url: z.string(),
        milestones_url: z.string(),
        notifications_url: z.string(),
        labels_url: z.string(),
        releases_url: z.string(),
        deployments_url: z.string(),
    }),
});
export type WorkflowRun = z.infer<typeof WorkflowRunSchema>;