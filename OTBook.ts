import { z } from "zod";

// Zod schema for OTBook
export const OTBookSchema = z.enum([
    "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST",
    "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM",
    "HAB", "ZEP", "HAG", "ZEC", "MAL",
]);
export type OTBook = z.infer<typeof OTBookSchema>;
