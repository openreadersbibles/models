import { z } from "zod";
import { ProjectConfigurationRowSchema } from "./ProjectConfigurationRow";

// Define the Zod schema for UserProfileRow
export const UserProfileRowSchema = z.object({
    user_id: z.string(),
    user_description: z.string(),
    projects: z.array(ProjectConfigurationRowSchema)
});
export type UserProfileRow = z.infer<typeof UserProfileRowSchema>;
