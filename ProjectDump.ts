import { ProjectId } from "./ProjectConfiguration";
import { Canon, UbsBook } from "./VerseReference";

export interface ProjectDump {
    project_id: ProjectId;
    books: BookDump[];
}

export interface BookDump {
    book_id: UbsBook;
    canon: Canon;
    book_title: string;
    verses: any[];
}


export type VerseHopper = any[];
export type ChapterHopper = VerseHopper[];
export type BookHopper = ChapterHopper[];
