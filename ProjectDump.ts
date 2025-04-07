import { BookDumpJson } from "./publication/PublicationBook";
import { ProjectId } from "./ProjectConfiguration";
import { PublicationGreekWordElementRow } from "./publication/PublicationGreekWordElementRow";
import { PublicationHebrewWordElementRow } from "./publication/PublicationHebrewWordElementRow";

export interface ProjectDump<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> {
    project_id: ProjectId;
    books: BookDumpJson<T>[];
}

export type VerseHopper<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> = T[];
export type ChapterHopper<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> = VerseHopper<T>[];
export type BookHopper<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> = ChapterHopper<T>[];
