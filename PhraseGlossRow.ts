import { z } from "zod";

// PhraseGlossRow schema
export const PhraseGlossRowSchema = z.object({
    phrase_gloss_id: z.number(),
    from_word_id: z.number(),
    to_word_id: z.number(),
    markdown: z.string(),
    votes: z.array(z.string()),
});
export type PhraseGlossRow = z.infer<typeof PhraseGlossRowSchema>;
