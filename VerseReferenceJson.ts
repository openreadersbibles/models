import { z } from "zod";
import { CanonSchema } from "./Canon";
import { UbsBookSchema } from "./UbsBook";

// Define the Zod schema
export const VerseReferenceJsonSchema = z.object({
    ubs_book: UbsBookSchema,
    chapter: z.number().int().min(1), // Ensure chapter is a positive integer
    verse: z.number().int().min(1),   // Ensure verse is a positive integer
    canon: CanonSchema,
});

// Infer the TypeScript type from the Zod schema
export type VerseReferenceJson = z.infer<typeof VerseReferenceJsonSchema>;