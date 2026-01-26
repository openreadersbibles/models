import { z } from "zod";

export const CorpusIdSchema = z.string();
export type CorpusId = z.infer<typeof CorpusIdSchema>;
