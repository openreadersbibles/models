import { z } from "zod";
import { GreekWordRowSchema } from "./GreekWordRow";
import { HebrewWordRowSchema } from "./HebrewWordRow";
import { PhraseGlossRowSchema } from "./PhraseGlossRow";
import { SuggestionRowSchema } from "./SuggestionRow";

export function createVerseResponseSchema<T>(wordSchema: z.ZodType<T>) {
    return z.object({
        words: z.array(wordSchema),
        suggestions: z.array(SuggestionRowSchema),
        phrase_glosses: z.array(PhraseGlossRowSchema),
    });
}

export const GetHebrewVerseResponseSchema = createVerseResponseSchema(HebrewWordRowSchema);

export const GetNTVerseResponseSchema = createVerseResponseSchema(GreekWordRowSchema);
