import { z } from "zod";
import { GlossSendObjectSchema } from "./GlossSendObject";

export const UpdateVerseDataSchema = z.object({
    word_gloss_updates: z.array(GlossSendObjectSchema),
    phrase_gloss_updates: z.array(GlossSendObjectSchema),
});

export type UpdateVerseData = z.infer<typeof UpdateVerseDataSchema>;
