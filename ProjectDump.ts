import { BookDump } from "./PublicationBook";
import { ProjectId } from "./ProjectConfiguration";

export interface ProjectDump {
    project_id: ProjectId;
    books: BookDump[];
}


export type VerseHopper = any[];
export type ChapterHopper = VerseHopper[];
export type BookHopper = ChapterHopper[];
