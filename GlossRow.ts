import { z } from "zod";
import { AnnotationJsonObjectSchema } from "./AnnotationJsonObject";
import { VoiceSchema } from "./Voice";

export const GlossRowSchema = z.object({
    annotationObject: AnnotationJsonObjectSchema,
    gloss_id: z.number(),
    votes: z.array(z.string()),
    /// NB: this stands for either Greek voice or Hebrew binyan
    voice: VoiceSchema
});

export type GlossRow = z.infer<typeof GlossRowSchema>;
