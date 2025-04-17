import { AnnotationJsonObjectSchema } from "./AnnotationJsonObject";
import { PhraseGlossLocationObjectSchema } from "./PhraseGlossLocationObject";
import { UserId } from "./UserProfile";
import { z } from "zod";
import { WordGlossLocationObjectSchema } from "./WordGlossLocationObject";


export const GlossSendObjectSchema = z.object({
    annotationObject: AnnotationJsonObjectSchema,
    gloss_id: z.number(),
    votes: z.array(z.custom<UserId>()),
    location: z.union([
        PhraseGlossLocationObjectSchema,
        WordGlossLocationObjectSchema
    ])
});

export type GlossSendObject = z.infer<typeof GlossSendObjectSchema>;
