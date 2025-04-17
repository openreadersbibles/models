import { z } from "zod";

export const WordGlossLocationObjectSchema = z.object({
    word_id: z.number(),
    lex_id: z.number(),
});

export type WordGlossLocationObject = z.infer<typeof WordGlossLocationObjectSchema>;
