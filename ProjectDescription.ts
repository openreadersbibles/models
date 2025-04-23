import { z } from "zod";

export const ProjectDescriptionSchema = z.object({
    project_id: z.string(), // Assuming ProjectId is a string
    project_title: z.string(),
    project_description: z.string(),
    allow_joins: z.boolean(),
});
export type ProjectDescription = z.infer<typeof ProjectDescriptionSchema>;
