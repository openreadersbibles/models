import { z } from "zod";

// Zod schema for LatinBook
export const LatinBookSchema = z.enum([
    "Genesis", "Exodus", "Leviticus", "Numeri", "Deuteronomium", "Josua", "Judices", "Ruth", "Samuel_I", "Samuel_II",
    "Reges_I", "Reges_II", "Chronica_I", "Chronica_II", "Esra", "Nehemia", "Esther", "Iob", "Psalmi", "Proverbia",
    "Ecclesiastes", "Canticum", "Jesaia", "Jeremia", "Threni", "Ezechiel", "Daniel", "Hosea", "Joel", "Amos", "Obadia",
    "Jona", "Micha", "Nahum", "Habakuk", "Zephania", "Haggai", "Sacharia", "Maleachi", "secundum Matthæum",
    "secundum Marcum", "secundum Lucam", "secundum Ioannem", "Actus", "ad Romanos", "1 ad Corinthios", "2 ad Corinthios",
    "ad Galatas", "ad Ephesios", "ad Philippenses", "ad Colossenses", "1 ad Thessalonicenses", "2 ad Thessalonicenses",
    "1 ad Timotheum", "2 ad Timotheum", "ad Titum", "ad Philemonem", "ad Hebræos", "Iacobi", "1 Petri", "2 Petri",
    "1 Ioannis", "2 Ioannis", "3 Ioannis", "Iudæ", "Apocalypsis",
]);
export type LatinBook = z.infer<typeof LatinBookSchema>;
