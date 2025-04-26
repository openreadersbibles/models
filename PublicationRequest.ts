import { ProjectConfiguration, ProjectIdSchema } from "./ProjectConfiguration.js";
import { BookIdentifier, BookIdentifierJsonSchema } from "./BookIdentifier.js";
import { PublicationConfiguration } from "./PublicationConfiguration.js";
import { z } from "zod";

export interface PublicationRequest {
    books: BookIdentifier[];
    project: ProjectConfiguration;
    configuration: PublicationConfiguration;
    nopdf: boolean;
}

export const HollowPublicationRequestSchema = z.object({
    books: z.array(BookIdentifierJsonSchema),
    project_id: ProjectIdSchema,
    publication_configuration_id: z.string(),
    nopdf: z.boolean(),
});
export type HollowPublicationRequest = z.infer<typeof HollowPublicationRequestSchema>;

/*
/// Sample request:
const req: HollowPublicationRequest = {
    "books": [
        {
            "book": "1JN",
            "canon": "NT"
        }
    ],
    "project_id": "english-contextual",
    "publication_configuration_id": "default",
    "nopdf": false
};
*/