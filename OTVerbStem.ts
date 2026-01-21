import { z } from "zod";

// Define OTVerbStem schema
export const OTVerbStemSchema = z.enum([
    "NA", "qal", "piel", "hif", "nif", "pual", "hit", "hof", "hsht", "pasq",
    "hotp", "nit", "poal", "poel", "htpo", "peal", "tif", "etpa", "pael",
    "haf", "htpe", "htpa", "peil", "etpe", "afel", "shaf"
]);
export type OTVerbStem = z.infer<typeof OTVerbStemSchema>;
