import { create } from 'xmlbuilder2';
import { PublicationVerse } from "./PublicationVerse";
import { PublicationRequest } from "./../PublicationRequest";
import { UbsBook, Canon, VerseReference } from "./../VerseReference";
import { BookHopper, ChapterHopper } from "./../ProjectDump";
import { PublicationGreekWordElementRow } from './PublicationGreekWordElementRow';
import { PublicationHebrewWordElementRow } from './PublicationHebrewWordElementRow';
import { PublicationGreekWordElement } from './PublicationGreekWordElement';
import { PublicationHebrewWordElement } from './PublicationHebrewWordElement';
import { PublicationWord } from './PublicationWord';
import { PublicationWordElement } from './PublicationWordElement';

export interface BookDumpJson<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> {
    book_id: UbsBook;
    canon: Canon;
    book_title: string;
    rows: T[];
}

export class PublicationBook<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow> {
    readonly book_id: UbsBook;
    readonly canon: Canon;
    readonly book_title: string;
    readonly hopper: BookHopper<T>;
    private rows: T[];

    constructor(json: BookDumpJson<T> & { rows: T[] }) {
        this.book_id = json.book_id;
        this.canon = json.canon;
        this.book_title = json.book_title;
        /// deep copy this data so that it's not modified by subsequent calls
        this.rows = JSON.parse(JSON.stringify(json.rows));

        this.hopper = PublicationBook.putIntoHoppers(json.rows);
    }

    toTEI(request: PublicationRequest): string {
        let content = "";
        // content = this.processRowsToXml<T>(request);
        switch (this.canon) {
            case 'OT':
                content = this.processRowsToXml(request, PublicationHebrewWordElement.fromWordRow as (obj: T, word: PublicationWord, request: PublicationRequest) => PublicationWordElement);
                break;
            case 'NT':
                content = this.processRowsToXml(request, PublicationGreekWordElement.fromWordRow as (obj: T, word: PublicationWord, request: PublicationRequest) => PublicationWordElement);
                break;
            default:
                throw new Error('Invalid canon');
        }
        return content;
    }

    toJsonObject(): BookDumpJson<T> {
        return {
            book_id: this.book_id,
            canon: this.canon,
            book_title: this.book_title,
            rows: this.rows
        }
    }

    processRowsToXml(
        request: PublicationRequest,
        objectCreator: (obj: T, word: PublicationWord, request: PublicationRequest) => PublicationWordElement
    ): string {
        const currentDate = new Date();
        const publicationStmt = `Generated by openreadersbibles.org at ${currentDate.toISOString()}`;

        let biblicalLanguageIso;
        if (this.canon == "OT") {
            biblicalLanguageIso = "hbo";
        } else {
            biblicalLanguageIso = "grc";
        }

        const doc = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('TEI', { version: '3.3.0', xmlns: 'http://www.tei-c.org/ns/1.0', "xmlns:orb": "https://openreadersbibles.org/" })
            .att('orb:layout-direction', request.project.layout_direction)
            .ele('teiHeader')
            .ele('fileDesc')
            .ele('titleStmt')
            .ele('title').txt(this.book_title).up()
            .up()
            .ele('publicationStmt')
            .ele('p').txt(publicationStmt).up()
            .up()
            .up()
            .ele('profileDesc')
            .ele('langUsage')
            .ele('language', { ident: biblicalLanguageIso, scope: "major" }).up()
            .up()
            .up()
            .up()
            .ele('text')
            .ele('body');

        this.hopper.forEach((chapter: ChapterHopper<T>, chapterIndex: number) => {
            const plainChapterNumber = request.project.replaceNumerals((chapterIndex + 1).toString());
            const chapterHeader = request.configuration.getChapterHeader(chapterIndex + 1);

            const chapter_attributes = {
                type: 'chapter',
                n: chapterIndex + 1,
                "local-n": plainChapterNumber,
                "header": chapterHeader
            };
            const chapter_node = doc.ele('div', chapter_attributes);

            chapter.forEach((verse: T[]) => {
                const reference = VerseReference.fromString(verse[0].reference);
                if (reference) {
                    const localVerseNumber = request.project.replaceNumerals(reference.verse.toString());
                    const v = PublicationVerse.fromWordElements(verse, reference, request, objectCreator);
                    const verse_node = chapter_node.ele('div', { type: 'verse', n: reference.verse, "local-n": localVerseNumber });
                    v.verseXml(verse_node);
                }
            });
        });

        return doc.end({ prettyPrint: false });
    }


    static putIntoHoppers<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow>(rows: T[]): BookHopper<T> {
        const hopper: BookHopper<T> = [];
        let currentChapter = 0;
        let currentVerse = 0;
        for (let i = 0; i < rows.length; i++) {
            const row: T = rows[i];
            const reference = VerseReference.fromString(row.reference);
            if (reference) {
                /// if we've hit a new chapter create a new section
                if (reference.chapter !== currentChapter) {
                    /// create a new chapter
                    hopper.push([]);
                    /// create a new verse
                    hopper[hopper.length - 1].push([]);
                    currentChapter = reference.chapter;
                    currentVerse = 1;
                } else if (reference.verse !== currentVerse) {
                    /// create a new verse
                    hopper[hopper.length - 1].push([]);
                    currentVerse = reference.verse;
                }
                const chapter = hopper[hopper.length - 1];
                const verse = chapter[chapter.length - 1];
                verse.push(row);
            } else {
                console.error('Error parsing reference: ' + reference);
            }
        }
        return hopper;
    }

}