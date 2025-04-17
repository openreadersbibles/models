import { z } from "zod";
import { AnnotationJsonObjectSchema } from "./AnnotationJsonObject";

// SuggestionRow schema
export const SuggestionRowSchema = z.object({
    lex_id: z.number(),
    suggestions: z.array(AnnotationJsonObjectSchema),
});
export type SuggestionRow = z.infer<typeof SuggestionRowSchema>;