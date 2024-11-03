import { ProjectConfiguration, ProjectId } from "./ProjectConfiguration";
import { Canon } from "./VerseReference";
import { ParsingFormat, ParsingFormatId } from "./parsing-formats/ParsingFormat";
import { BookIdentifier } from "./BookIdentifier";

export interface PublicationRequest {
    books: BookIdentifier[];
    project: ProjectConfiguration;
    parsing_formats: Map<Canon, ParsingFormat>;
    nopdf: boolean;
    latex_template_id: string | undefined;
}

export interface HollowPublicationRequest {
    books: string[];
    project_id: ProjectId;
    nopdf: boolean;
    parsing_formats: {
        [key: string]: ParsingFormatId;
    };
    latex_template_id: string | undefined;
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
    "frequency_threshold": 30,
    "parsing_formats": {
        "OT": "ot-concise",
        "NT": "nt-verbose"
    },
    "polyglossia_language": "english",
    "project_language_font": "Arvo",
    "biblical_font": "SBL BibLit"
};
*/