import { z } from "zod";

// Zod schema for NTBook
export const NTBookSchema = z.enum([
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT",
    "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
]);
export type NTBook = z.infer<typeof NTBookSchema>;
