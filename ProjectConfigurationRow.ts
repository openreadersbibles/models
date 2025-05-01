import { z } from "zod";
import { CanonSchema } from "@models/Canon.js";
import { PublicationConfigurationRowSchema } from "./PublicationConfigurationRow";
import { ProjectParsingFormatsObjectSchema } from "./ProjectParsingFormatsObject";

// Define dependent schemas
export const ThresholdObjectSchema = z.record(z.number()); // { [key: string]: number }
export type ThresholdObject = z.infer<typeof ThresholdObjectSchema>;

const BooknamesObjectSchema = z.record(z.string()); // { [key: string]: string }

const ProjectRoleSchema = z.enum(['admin', 'member', 'disabled']); // ProjectRole
export type ProjectRole = z.infer<typeof ProjectRoleSchema>;


const LayoutDirectionSchema = z.enum(['ltr', 'rtl']); // LayoutDirection
export type LayoutDirection = z.infer<typeof LayoutDirectionSchema>;


const ProjectRoleRowSchema = z.object({
    user_id: z.string(),
    user_role: ProjectRoleSchema,
    power_user: z.union([z.literal(1), z.literal(0)]), // 1 or 0
});
export type ProjectRoleRow = z.infer<typeof ProjectRoleRowSchema>;


// Define the main schema
export const ProjectConfigurationRowSchema = z.object({
    project_id: z.string(), // Assuming ProjectId is a string
    project_title: z.string(),
    project_description: z.string(),
    layout_direction: LayoutDirectionSchema,
    frequency_thresholds: ThresholdObjectSchema,
    bookNames: BooknamesObjectSchema,
    canons: z.array(CanonSchema),
    roles: z.array(ProjectRoleRowSchema),
    allow_joins: z.boolean(),
    font_families: z.string(),
    font_size: z.number().optional(), // number | undefined
    parsing_formats: ProjectParsingFormatsObjectSchema,
    publication_configurations: z.record(PublicationConfigurationRowSchema).optional(), // { [key: string]: PublicationConfigurationRow }
    numerals: z.array(z.string()),
});
export type ProjectConfigurationRow = z.infer<typeof ProjectConfigurationRowSchema>;
