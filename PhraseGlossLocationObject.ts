
import { z } from "zod";


export const PhraseGlossLocationObjectSchema = z.object({
    from_word_id: z.number(),
    to_word_id: z.number(),
});

export type PhraseGlossLocationObject = z.infer<typeof PhraseGlossLocationObjectSchema>;