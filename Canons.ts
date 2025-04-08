import { Canon, UbsBook, VerseReference } from "./VerseReference.js";

type CanonNumberLookup = Partial<Record<UbsBook, number>>;

type CanonNumberArrayLookup = Partial<Record<UbsBook, number[]>>;

export class CanonData {
    private _name: Canon;
    private _books: UbsBook[];
    private _max_chapter: CanonNumberLookup;
    private _max_verse: CanonNumberArrayLookup;

    constructor(name: Canon, books: UbsBook[], max_chapter: CanonNumberLookup, max_verse: CanonNumberArrayLookup) {
        this._name = name;
        this._books = books;
        this._max_chapter = max_chapter;
        this._max_verse = max_verse;
    }

    get name(): Canon {
        return this._name;
    }

    get books(): UbsBook[] {
        return this._books;
    }

    hasBook(book: UbsBook): boolean {
        return this._books.includes(book);
    }

    fallbackVerseReference(): VerseReference {
        return new VerseReference(this._books[0], 1, 1, this._name);
    }

    nextBook(book: UbsBook): UbsBook {
        const index = this._books.indexOf(book);
        if (index < 0) {
            return 'GEN';
        }
        if (index < this._books.length - 1) {
            return this._books[index + 1] as UbsBook;
        }
        return this._books[0];
    }

    previousBook(book: UbsBook): UbsBook {
        const index = this._books.indexOf(book);
        if (index < 0) {
            return 'GEN';
        }
        if (index > 0) {
            return this._books[index - 1] as UbsBook;
        }
        return this._books[this._books.length - 1];
    }

    lastChapter(book: UbsBook): number | undefined {
        return this._max_chapter[book];
    }

    lastVerse(book: UbsBook, chapter: number): number | undefined {
        const versesN = this._max_verse[book];
        if (versesN === undefined) {
            return undefined;
        }
        if (versesN.length > (chapter - 1)) {
            return versesN[chapter - 1];
        } else {
            console.error(`BookNavigator.lastVerse: no data for ${book} ${chapter}.`);
            return undefined;
        }
    }

    nextVerse(reference: VerseReference): VerseReference {
        const returnValue = new VerseReference(reference.ubs_book, reference.chapter, reference.verse + 1, this._name);
        const lastVerseInChapter = this.lastVerse(returnValue.ubs_book, returnValue.chapter);
        if (lastVerseInChapter === undefined) {
            console.error(`BookNavigator.nextVerse: lastVerseInChapter is null for ${reference.ubs_book} ${reference.chapter}`);
            return reference;
        }
        if (returnValue.verse > lastVerseInChapter) {
            returnValue.chapter = reference.chapter + 1;
            returnValue.verse = 1;
        }
        const lastChapter = this.lastChapter(returnValue.ubs_book);
        if (lastChapter === undefined) {
            console.error(`BookNavigator.nextVerse: lastChapter is null for ${reference.ubs_book}`);
            return reference;
        }
        if (returnValue.chapter > lastChapter) {
            const nextBook = this.nextBook(returnValue.ubs_book);
            returnValue.ubs_book = nextBook;
            returnValue.chapter = 1;
            returnValue.verse = 1;
        }
        return returnValue;
    }

    previousVerse(reference: VerseReference): VerseReference {
        /// the only real wrap-around situation is if we're in 1:1
        if (reference.chapter === 1 && reference.verse === 1) {
            const previousBook = this.previousBook(reference.ubs_book);
            const lastChapter = this.lastChapter(previousBook);
            if (lastChapter === undefined) {
                console.error(`BookNavigator.previousVerse: lastChapter is undefined for ${reference.ubs_book}`);
                return reference;
            }
            const lastVerseInChapter = this.lastVerse(previousBook, lastChapter);
            if (lastVerseInChapter === undefined) {
                console.error(`BookNavigator.previousVerse: lastVerseInChapter is undefined for ${reference.ubs_book} ${reference.chapter}`);
                return reference;
            }
            return new VerseReference(previousBook, lastChapter, lastVerseInChapter, this._name);
        }

        const returnValue = new VerseReference(reference.ubs_book, reference.chapter, reference.verse - 1, this._name);
        if (returnValue.verse < 1) {
            returnValue.chapter = reference.chapter - 1;
            const lastVerseInChapter = this.lastVerse(returnValue.ubs_book, returnValue.chapter);
            if (lastVerseInChapter === undefined) {
                console.error(`BookNavigator.previousVerse: lastVerseInChapter is null for ${reference.ubs_book} ${reference.chapter}`);
                return reference;
            }
            returnValue.verse = lastVerseInChapter;
        }
        return returnValue;
    }
}

export const NT = new CanonData(
    "NT",
    ['MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'],
    { "MAT": 28, "MRK": 16, "LUK": 24, "JHN": 21, "ACT": 28, "ROM": 16, "1CO": 16, "2CO": 13, "GAL": 6, "EPH": 6, "PHP": 4, "COL": 4, "1TH": 5, "2TH": 3, "1TI": 6, "2TI": 4, "TIT": 3, "PHM": 1, "HEB": 13, "JAS": 5, "1PE": 5, "2PE": 3, "1JN": 5, "2JN": 1, "3JN": 1, "JUD": 1, "REV": 22 },
    { "1CO": [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24], "1JN": [10, 29, 24, 21, 21], "1PE": [25, 25, 22, 19, 14], "1TH": [10, 20, 13, 18, 28], "1TI": [20, 15, 16, 16, 25, 21], "2CO": [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 13], "2JN": [13], "2PE": [21, 22, 18], "2TH": [12, 17, 18], "2TI": [18, 26, 17, 22], "3JN": [15], "ACT": [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 40, 38, 40, 30, 35, 27, 27, 32, 44, 31], "COL": [29, 23, 25, 18], "EPH": [23, 22, 21, 32, 33, 24], "GAL": [24, 21, 29, 31, 26, 18], "HEB": [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25], "JAS": [27, 26, 18, 17, 20], "JHN": [51, 25, 36, 54, 47, 71, 52, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25], "JUD": [25], "LUK": [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53], "MRK": [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20], "MAT": [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20], "PHP": [30, 30, 21, 23], "PHM": [25], "REV": [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 18, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21], "ROM": [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 24], "TIT": [16, 15, 15] }
);


export const OT = new CanonData(
    "OT",
    ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'],
    { "GEN": 50, "EXO": 40, "LEV": 27, "NUM": 36, "DEU": 34, "JOS": 24, "JDG": 21, "1SA": 31, "2SA": 24, "1KI": 22, "2KI": 25, "ISA": 66, "JER": 52, "EZK": 48, "HOS": 14, "JOL": 4, "AMO": 9, "OBA": 1, "JON": 4, "MIC": 7, "NAM": 3, "HAB": 3, "ZEP": 3, "HAG": 2, "ZEC": 14, "MAL": 3, "PSA": 150, "JOB": 42, "PRO": 31, "RUT": 4, "SNG": 8, "ECC": 12, "LAM": 5, "EST": 10, "DAN": 12, "EZR": 10, "NEH": 13, "1CH": 29, "2CH": 36 },
    { "1CH": [54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30], "1KI": [53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 54], "1SA": [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 44, 25, 12, 25, 11, 31, 13], "2CH": [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23], "2KI": [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30], "2SA": [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25], "AMO": [15, 16, 15, 13, 27, 14, 17, 14, 15], "DAN": [21, 49, 33, 34, 30, 29, 28, 27, 27, 21, 45, 13], "DEU": [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12], "ECC": [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14], "EST": [22, 23, 15, 17, 14, 14, 10, 17, 32, 3], "EXO": [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38], "EZK": [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35], "EZR": [11, 70, 13, 24, 17, 22, 28, 36, 15, 44], "GEN": [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26], "HAB": [17, 20, 19], "HAG": [15, 23], "HOS": [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10], "ISA": [31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 11, 25, 24], "JDG": [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25], "JER": [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34], "JOB": [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 32, 26, 17], "JOL": [20, 27, 5, 21], "JON": [16, 11, 10, 11], "JOS": [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33], "LAM": [22, 22, 66, 22, 22], "LEV": [17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34], "MAL": [14, 17, 24], "MIC": [16, 13, 12, 14, 14, 16, 20], "NAM": [14, 14, 19], "NEH": [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31], "NUM": [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28, 32, 22, 29, 35, 41, 30, 25, 19, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13], "OBA": [21], "PRO": [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31], "PSA": [6, 12, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15, 10, 14, 32, 6, 10, 22, 12, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40, 23, 14, 18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24, 14, 12, 12, 18, 14, 9, 13, 12, 11, 14, 20, 8, 36, 37, 6, 24, 20, 28, 23, 11, 13, 21, 72, 13, 20, 17, 8, 19, 13, 14, 17, 7, 19, 53, 17, 16, 16, 5, 23, 11, 13, 12, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6], "RUT": [22, 23, 18, 22], "SNG": [17, 17, 11, 16, 16, 12, 14, 14], "ZEC": [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21], "ZEP": [18, 15, 20] }
);

/// TODO HACK these are just the OT values, and are surely wrong
export const LXX = new CanonData(
    "LXX",
    ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'],
    { "GEN": 50, "EXO": 40, "LEV": 27, "NUM": 36, "DEU": 34, "JOS": 24, "JDG": 21, "1SA": 31, "2SA": 24, "1KI": 22, "2KI": 25, "ISA": 66, "JER": 52, "EZK": 48, "HOS": 14, "JOL": 4, "AMO": 9, "OBA": 1, "JON": 4, "MIC": 7, "NAM": 3, "HAB": 3, "ZEP": 3, "HAG": 2, "ZEC": 14, "MAL": 3, "PSA": 150, "JOB": 42, "PRO": 31, "RUT": 4, "SNG": 8, "ECC": 12, "LAM": 5, "EST": 10, "DAN": 12, "EZR": 10, "NEH": 13, "1CH": 29, "2CH": 36 },
    { "1CH": [54, 55, 24, 43, 41, 66, 40, 40, 44, 14, 47, 41, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30], "1KI": [53, 46, 28, 20, 32, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 54], "1SA": [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 44, 25, 12, 25, 11, 31, 13], "2CH": [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 23, 14, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23], "2KI": [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30], "2SA": [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25], "AMO": [15, 16, 15, 13, 27, 14, 17, 14, 15], "DAN": [21, 49, 33, 34, 30, 29, 28, 27, 27, 21, 45, 13], "DEU": [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12], "ECC": [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14], "EST": [22, 23, 15, 17, 14, 14, 10, 17, 32, 3], "EXO": [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38], "EZK": [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35], "EZR": [11, 70, 13, 24, 17, 22, 28, 36, 15, 44], "GEN": [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26], "HAB": [17, 20, 19], "HAG": [15, 23], "HOS": [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10], "ISA": [31, 22, 26, 6, 30, 13, 25, 23, 20, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 11, 25, 24], "JDG": [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25], "JER": [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34], "JOB": [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 32, 26, 17], "JOL": [20, 27, 5, 21], "JON": [16, 11, 10, 11], "JOS": [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33], "LAM": [22, 22, 66, 22, 22], "LEV": [17, 16, 17, 35, 26, 23, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34], "MAL": [14, 17, 24], "MIC": [16, 13, 12, 14, 14, 16, 20], "NAM": [14, 14, 19], "NEH": [11, 20, 38, 17, 19, 19, 72, 18, 37, 40, 36, 47, 31], "NUM": [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 35, 28, 32, 22, 29, 35, 41, 30, 25, 19, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13], "OBA": [21], "PRO": [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31], "PSA": [6, 12, 9, 9, 13, 11, 18, 10, 21, 18, 7, 9, 6, 7, 5, 11, 15, 51, 15, 10, 14, 32, 6, 10, 22, 12, 14, 9, 11, 13, 25, 11, 22, 23, 28, 13, 40, 23, 14, 18, 14, 12, 5, 27, 18, 12, 10, 15, 21, 23, 21, 11, 7, 9, 24, 14, 12, 12, 18, 14, 9, 13, 12, 11, 14, 20, 8, 36, 37, 6, 24, 20, 28, 23, 11, 13, 21, 72, 13, 20, 17, 8, 19, 13, 14, 17, 7, 19, 53, 17, 16, 16, 5, 23, 11, 13, 12, 9, 9, 5, 8, 29, 22, 35, 45, 48, 43, 14, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6], "RUT": [22, 23, 18, 22], "SNG": [17, 17, 11, 16, 16, 12, 14, 14], "ZEC": [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21], "ZEP": [18, 15, 20] }
);

export function getCanon(canon: Canon): CanonData {
    switch (canon) {
        case "NT":
            return NT;
        case "OT":
            return OT;
        case "LXX":
            return LXX;
    }
}

export const CANON_NAMES: Canon[] = ['OT', 'NT', 'LXX'];
export const CANONS: CanonData[] = [OT, NT, LXX];
export const ALL_BOOK_CODES = OT.books.concat(NT.books.concat(LXX.books));

export function canonicalOrderSort(a: UbsBook, b: UbsBook) {
    const aIndex = ALL_BOOK_CODES.indexOf(a);
    const bIndex = ALL_BOOK_CODES.indexOf(b);
    return aIndex - bIndex;
}