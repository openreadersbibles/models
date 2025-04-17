import { z } from "zod";

export const GlossRowSchema = z.object({
    jsonContent: z.string(), /// TODO this doesn't check the format of the JSON
    gloss_id: z.number(),
    votes: z.array(z.string()), /// TODO this doesn't check the format of the JSON
});

export type GlossRow = z.infer<typeof GlossRowSchema>;
