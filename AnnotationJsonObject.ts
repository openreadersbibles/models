import { z } from "zod";

// Define the AnnotationType schema
export const AnnotationTypeSchema = z.enum(["word", "markdown", "wordplusmarkdown", "null"]);
export type AnnotationType = z.infer<typeof AnnotationTypeSchema>;

// Define the WordAnnotationContent schema
export const WordAnnotationContentSchema = z.object({
    gloss: z.string(),
});
export type WordAnnotationContent = z.infer<typeof WordAnnotationContentSchema>;

// Define the MarkdownAnnotationContent schema
export const MarkdownAnnotationContentSchema = z.object({
    markdown: z.string(),
});
export type MarkdownAnnotationContent = z.infer<typeof MarkdownAnnotationContentSchema>;

// Define the WordPlusMarkdownAnnotationContent schema
export const WordPlusMarkdownAnnotationContentSchema = z.object({
    gloss: z.string(),
    markdown: z.string(),
});
export type WordPlusMarkdownAnnotationContent = z.infer<typeof WordPlusMarkdownAnnotationContentSchema>;

// Define the AnnotationJsonObject schema
export const AnnotationJsonObjectSchema = z.discriminatedUnion("type", [
    z.object({
        gloss_id: z.number(),
        type: z.literal("word"),
        content: WordAnnotationContentSchema,
    }),
    z.object({
        gloss_id: z.number(),
        type: z.literal("markdown"),
        content: MarkdownAnnotationContentSchema,
    }),
    z.object({
        gloss_id: z.number(),
        type: z.literal("wordplusmarkdown"),
        content: WordPlusMarkdownAnnotationContentSchema,
    }),
    z.object({
        gloss_id: z.number(),
        type: z.literal("null"),
        content: z.string(),
    }),
]);
export type AnnotationJsonObject = z.infer<typeof AnnotationJsonObjectSchema>;
