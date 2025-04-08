import { ProjectConfiguration, ProjectId } from "./ProjectConfiguration.js";
import { BookIdentifier, BookIdentifierJson } from "./BookIdentifier.js";
import { PublicationConfiguration } from "./PublicationConfiguration.js";

export interface PublicationRequest {
    books: BookIdentifier[];
    project: ProjectConfiguration;
    configuration: PublicationConfiguration;
    nopdf: boolean;
}

export interface HollowPublicationRequest {
    books: BookIdentifierJson[];
    project_id: ProjectId;
    publication_configuration_id: string;
    nopdf: boolean;
}

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