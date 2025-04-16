import { Canon } from "./Canon.js";
import { CANONS, CanonData, getCanon } from "./Canons.js";
import { EnglishBook } from "./EnglishBook.js";
import { LatinBook } from "./LatinBook.js";
import { UbsBook } from "./UbsBook.js";
import { VerseReferenceJson } from "./VerseReferenceJson.js";

export type VerseReferenceString = string;

export class VerseReference {
    ubs_book: UbsBook;
    chapter: number;
    verse: number;
    canon: Canon;

    constructor(ubs_book: UbsBook, chapter: number, verse: number, canon: Canon) {
        this.ubs_book = ubs_book;
        this.chapter = chapter;
        this.verse = verse;
        this.canon = canon;
    }

    equals(other: VerseReference): boolean {
        return this.ubs_book === other.ubs_book
            && this.chapter === other.chapter
            && this.verse === other.verse
            && this.canon === other.canon;
    }

    /// NB: will never return LXX
    static canonFromBook(book: UbsBook): CanonData | undefined {
        for (let i = 0; i < CANONS.length; i++) {
            if (CANONS[i].hasBook(book)) {
                return CANONS[i];
            }
        }
        return undefined;
    }

    get canonData(): CanonData {
        return getCanon(this.canon);
    }

    nextVerse(): VerseReference {
        return this.canonData.nextVerse(this);
    }

    previousVerse(): VerseReference {
        return this.canonData.previousVerse(this);
    }

    get latinBookName(): LatinBook {
        return VerseReference.ubsBookToLatin(this.ubs_book);
    }

    get xmlId(): string {
        return `${this.canon}-${this.ubs_book}-${this.chapter}-${this.verse}`;
    }

    validate(): VerseReference | undefined {
        const canonData = getCanon(this.canon);
        if (!canonData) {
            return undefined;
        }

        if (!canonData.getIsValid(this.canon, this.ubs_book, this.chapter, this.verse)) {
            return undefined;
        }

        return this;
    }

    toJson(): VerseReferenceJson {
        return {
            ubs_book: this.ubs_book,
            chapter: this.chapter,
            verse: this.verse,
            canon: this.canon
        };
    }

    static fromJson(json: VerseReferenceJson): VerseReference | undefined {
        return new VerseReference(json.ubs_book, json.chapter, json.verse, json.canon).validate();
    }

    toString(): VerseReferenceString {
        return `${this.canon} ${this.ubs_book} ${this.chapter}:${this.verse}`;
    }

    static fromString(str: VerseReferenceString): VerseReference | undefined {
        if (str === undefined) {
            return undefined;
        }

        const regex = /^([A-Z]{2,3})\s([A-Z0-9]{3})\s(\d+):(\d+)$/;
        const match = str.match(regex);

        if (match) {
            const canon = match[1] as Canon;
            const ubs_book = match[2] as UbsBook;
            const chapter = parseInt(match[3]);
            const verse = parseInt(match[4]);
            return new VerseReference(ubs_book, chapter, verse, canon).validate();
        }

        return undefined;
    }

    static ubsBookToLatin(ubsBook: UbsBook): LatinBook {
        switch (ubsBook) {
            case 'GEN': return 'Genesis';
            case 'EXO': return 'Exodus';
            case 'LEV': return 'Leviticus';
            case 'NUM': return 'Numeri';
            case 'DEU': return 'Deuteronomium';
            case 'JOS': return 'Josua';
            case 'JDG': return 'Judices';
            case 'RUT': return 'Ruth';
            case '1SA': return 'Samuel_I';
            case '2SA': return 'Samuel_II';
            case '1KI': return 'Reges_I';
            case '2KI': return 'Reges_II';
            case '1CH': return 'Chronica_I';
            case '2CH': return 'Chronica_II';
            case 'EZR': return 'Esra';
            case 'NEH': return 'Nehemia';
            case 'EST': return 'Esther';
            case 'JOB': return 'Iob';
            case 'PSA': return 'Psalmi';
            case 'PRO': return 'Proverbia';
            case 'ECC': return 'Ecclesiastes';
            case 'SNG': return 'Canticum';
            case 'ISA': return 'Jesaia';
            case 'JER': return 'Jeremia';
            case 'LAM': return 'Threni';
            case 'EZK': return 'Ezechiel';
            case 'DAN': return 'Daniel';
            case 'HOS': return 'Hosea';
            case 'JOL': return 'Joel';
            case 'AMO': return 'Amos';
            case 'OBA': return 'Obadia';
            case 'JON': return 'Jona';
            case 'MIC': return 'Micha';
            case 'NAM': return 'Nahum';
            case 'HAB': return 'Habakuk';
            case 'ZEP': return 'Zephania';
            case 'HAG': return 'Haggai';
            case 'ZEC': return 'Sacharia';
            case 'MAL': return 'Maleachi';
            case 'MAT': return 'secundum Matthæum';
            case 'MRK': return 'secundum Marcum';
            case 'LUK': return 'secundum Lucam';
            case 'JHN': return 'secundum Ioannem';
            case 'ACT': return 'Actus';
            case 'ROM': return 'ad Romanos';
            case '1CO': return '1 ad Corinthios';
            case '2CO': return '2 ad Corinthios';
            case 'GAL': return 'ad Galatas';
            case 'EPH': return 'ad Ephesios';
            case 'PHP': return 'ad Philippenses';
            case 'COL': return 'ad Colossenses';
            case '1TH': return '1 ad Thessalonicenses';
            case '2TH': return '2 ad Thessalonicenses';
            case '1TI': return '1 ad Timotheum';
            case '2TI': return '2 ad Timotheum';
            case 'TIT': return 'ad Titum';
            case 'PHM': return 'ad Philemonem';
            case 'HEB': return 'ad Hebræos';
            case 'JAS': return 'Iacobi';
            case '1PE': return '1 Petri';
            case '2PE': return '2 Petri';
            case '1JN': return '1 Ioannis';
            case '2JN': return '2 Ioannis';
            case '3JN': return '3 Ioannis';
            case 'JUD': return 'Iudæ';
            case 'REV': return 'Apocalypsis';
        }
    }

    static ubsBookToEnglish(ubsBook: UbsBook): EnglishBook {
        switch (ubsBook) {
            case 'GEN': return 'Genesis';
            case 'EXO': return 'Exodus';
            case 'LEV': return 'Leviticus';
            case 'NUM': return 'Numbers';
            case 'DEU': return 'Deuteronomy';
            case 'JOS': return 'Joshua';
            case 'JDG': return 'Judges';
            case 'RUT': return 'Ruth';
            case '1SA': return '1 Samuel';
            case '2SA': return '2 Samuel';
            case '1KI': return '1 Kings';
            case '2KI': return '2 Kings';
            case '1CH': return '1 Chronicles';
            case '2CH': return '2 Chronicles';
            case 'EZR': return 'Ezra';
            case 'NEH': return 'Nehemiah';
            case 'EST': return 'Esther';
            case 'JOB': return 'Job';
            case 'PSA': return 'Psalms';
            case 'PRO': return 'Proverbs';
            case 'ECC': return 'Ecclesiastes';
            case 'SNG': return 'Song of Solomon';
            case 'ISA': return 'Isaiah';
            case 'JER': return 'Jeremiah';
            case 'LAM': return 'Lamentations';
            case 'EZK': return 'Ezekiel';
            case 'DAN': return 'Daniel';
            case 'HOS': return 'Hosea';
            case 'JOL': return 'Joel';
            case 'AMO': return 'Amos';
            case 'OBA': return 'Obadiah';
            case 'JON': return 'Jonah';
            case 'MIC': return 'Micah';
            case 'NAM': return 'Nahum';
            case 'HAB': return 'Habakkuk';
            case 'ZEP': return 'Zephaniah';
            case 'HAG': return 'Haggai';
            case 'ZEC': return 'Zechariah';
            case 'MAL': return 'Malachi';
            case 'MAT': return 'Matthew';
            case 'MRK': return 'Mark';
            case 'LUK': return 'Luke';
            case 'JHN': return 'John';
            case 'ACT': return 'Acts';
            case 'ROM': return 'Romans';
            case '1CO': return '1 Corinthians';
            case '2CO': return '2 Corinthians';
            case 'GAL': return 'Galatians';
            case 'EPH': return 'Ephesians';
            case 'PHP': return 'Philippians';
            case 'COL': return 'Colossians';
            case '1TH': return '1 Thessalonians';
            case '2TH': return '2 Thessalonians';
            case '1TI': return '1 Timothy';
            case '2TI': return '2 Timothy';
            case 'TIT': return 'Titus';
            case 'PHM': return 'Philemon';
            case 'HEB': return 'Hebrews';
            case 'JAS': return 'James';
            case '1PE': return '1 Peter';
            case '2PE': return '2 Peter';
            case '1JN': return '1 John';
            case '2JN': return '2 John';
            case '3JN': return '3 John';
            case 'JUD': return 'Jude';
            case 'REV': return 'Revelation';
        }
    }

}
