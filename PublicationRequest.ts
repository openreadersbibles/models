import { ProjectConfiguration, ProjectId } from "./ProjectConfiguration";
import { BookIdentifier } from "./BookIdentifier";
import { PublicationConfiguration } from "./PublicationConfiguration";

export interface PublicationRequest {
    books: BookIdentifier[];
    project: ProjectConfiguration;
    configuration: PublicationConfiguration;
    nopdf: boolean;
}

export interface HollowPublicationRequest {
    books: string[];
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