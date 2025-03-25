import { BookDumpJson } from "./publication/PublicationBook";
import { ProjectId } from "./ProjectConfiguration";

export interface ProjectDump {
    project_id: ProjectId;
    books: BookDumpJson[];
}


export type VerseHopper = any[];
export type ChapterHopper = VerseHopper[];
export type BookHopper = ChapterHopper[];
