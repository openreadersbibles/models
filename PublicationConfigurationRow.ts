import { z } from "zod";
import { ThresholdObjectSchema } from "./ProjectConfigurationRow";

export const PublicationFootnoteStyleSchema = z.enum(["lettered-by-verse", "numbered-by-page"]);
export type PublicationFootnoteStyle = z.infer<typeof PublicationFootnoteStyleSchema>;

export const PublicationConfigurationRowSchema = z.object({
    footnoteMarkers: z.array(z.string()), // Array of strings
    polyglossiaOtherLanguage: z.string(), // String
    chapterHeader: z.string(), // String
    publication_project_font: z.string(), // String
    publication_biblical_font: z.string(), // String
    latex_template: z.string(), // String
    parsing_formats: z.record(z.string()), // Record<string, string>
    css_template: z.string().optional(), // String
    footnote_style: PublicationFootnoteStyleSchema.optional(), // Enum for footnote styles
    frequency_thresholds: z.record(z.number()).optional(),
});
export type PublicationConfigurationRow = z.infer<typeof PublicationConfigurationRowSchema>;