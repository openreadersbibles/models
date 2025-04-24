import { z } from "zod";

export const WithAndWithoutSchema = z.object({
    with: z.number(),
    without: z.number(),
});

export const WithWithoutPotentialSchema = z.object({
    with: z.number(),
    without: z.number(),
    potential: z.number(),
});

export const StatsSummarySchema = z.object({
    lexicalItems: WithAndWithoutSchema,
    words: WithWithoutPotentialSchema,
});

// Inferred types
export type WithAndWithout = z.infer<typeof WithAndWithoutSchema>;
export type WithWithoutPotential = z.infer<typeof WithWithoutPotentialSchema>;
export type StatsSummary = z.infer<typeof StatsSummarySchema>;
