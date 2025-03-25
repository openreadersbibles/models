import { annotationFromObject } from "./Annotation";
import { UbsBook, Canon } from "./VerseReference";

export class BookDump {
    readonly book_id: UbsBook;
    readonly canon: Canon;
    readonly book_title: string;
    readonly rows: any[];

    constructor(book_id: UbsBook, canon: Canon, book_title: string, rows: any[]) {
        this.book_id = book_id;
        this.canon = canon;
        this.book_title = book_title;

        /// convert the annotation JSON to objects
        this.rows = rows.map((row: any) => {
            if (row.gloss !== null) {
                row.gloss = annotationFromObject(row.gloss);
            }
            if (row.phrasalGlosses !== null) {
                row.phrasalGlosses = JSON.parse(row.phrasalGlosses);
            }
            return row;
        });


    }
}