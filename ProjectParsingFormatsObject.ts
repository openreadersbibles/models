import { z } from "zod";
import { CanonSchema } from "@models/Canon.js";
import { ParsingFormatObjectSchema } from "./ProjectConfigurationRow";

const ParsingFormatIdSchema = z.string(); // Assuming ParsingFormatId is a string

// Define the main schema
export const ProjectParsingFormatsObjectSchema = z.record(
    CanonSchema, // Canon as the key
    z.record(ParsingFormatIdSchema, ParsingFormatObjectSchema)
);
export type ProjectParsingFormatsObject = z.infer<typeof ProjectParsingFormatsObjectSchema>;
