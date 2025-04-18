import { z } from "zod";

export const LanguageIsoSchema = z.enum(["hbo", "arc", "grc"]);
export type LanguageIso = z.infer<typeof LanguageIsoSchema>;