import { CANONS, CanonData, getCanon } from "./Canons.js";

export type UbsBook = 'GEN' | 'EXO' | 'LEV' | 'NUM' | 'DEU' | 'JOS' | 'JDG' | 'RUT' | '1SA' | '2SA' | '1KI' | '2KI' | '1CH' | '2CH' | 'EZR' | 'NEH' | 'EST' | 'JOB' | 'PSA' | 'PRO' | 'ECC' | 'SNG' | 'ISA' | 'JER' | 'LAM' | 'EZK' | 'DAN' | 'HOS' | 'JOL' | 'AMO' | 'OBA' | 'JON' | 'MIC' | 'NAM' | 'HAB' | 'ZEP' | 'HAG' | 'ZEC' | 'MAL' | 'MAT' | 'MRK' | 'LUK' | 'JHN' | 'ACT' | 'ROM' | '1CO' | '2CO' | 'GAL' | 'EPH' | 'PHP' | 'COL' | '1TH' | '2TH' | '1TI' | '2TI' | 'TIT' | 'PHM' | 'HEB' | 'JAS' | '1PE' | '2PE' | '1JN' | '2JN' | '3JN' | 'JUD' | 'REV';
export type OTBook = 'GEN' | 'EXO' | 'LEV' | 'NUM' | 'DEU' | 'JOS' | 'JDG' | 'RUT' | '1SA' | '2SA' | '1KI' | '2KI' | '1CH' | '2CH' | 'EZR' | 'NEH' | 'EST' | 'JOB' | 'PSA' | 'PRO' | 'ECC' | 'SNG' | 'ISA' | 'JER' | 'LAM' | 'EZK' | 'DAN' | 'HOS' | 'JOL' | 'AMO' | 'OBA' | 'JON' | 'MIC' | 'NAM' | 'HAB' | 'ZEP' | 'HAG' | 'ZEC' | 'MAL';
export type NTBook = 'MAT' | 'MRK' | 'LUK' | 'JHN' | 'ACT' | 'ROM' | '1CO' | '2CO' | 'GAL' | 'EPH' | 'PHP' | 'COL' | '1TH' | '2TH' | '1TI' | '2TI' | 'TIT' | 'PHM' | 'HEB' | 'JAS' | '1PE' | '2PE' | '1JN' | '2JN' | '3JN' | 'JUD' | 'REV';
export type LatinBook = 'Genesis' | 'Exodus' | 'Leviticus' | 'Numeri' | 'Deuteronomium' | 'Josua' | 'Judices' | 'Ruth' | 'Samuel_I' | 'Samuel_II' | 'Reges_I' | 'Reges_II' | 'Chronica_I' | 'Chronica_II' | 'Esra' | 'Nehemia' | 'Esther' | 'Iob' | 'Psalmi' | 'Proverbia' | 'Ecclesiastes' | 'Canticum' | 'Jesaia' | 'Jeremia' | 'Threni' | 'Ezechiel' | 'Daniel' | 'Hosea' | 'Joel' | 'Amos' | 'Obadia' | 'Jona' | 'Micha' | 'Nahum' | 'Habakuk' | 'Zephania' | 'Haggai' | 'Sacharia' | 'Maleachi' | 'secundum Matthæum' | 'secundum Marcum' | 'secundum Lucam' | 'secundum Ioannem' | 'Actus' | 'ad Romanos' | '1 ad Corinthios' | '2 ad Corinthios' | 'ad Galatas' | 'ad Ephesios' | 'ad Philippenses' | 'ad Colossenses' | '1 ad Thessalonicenses' | '2 ad Thessalonicenses' | '1 ad Timotheum' | '2 ad Timotheum' | 'ad Titum' | 'ad Philemonem' | 'ad Hebræos' | 'Iacobi' | '1 Petri' | '2 Petri' | '1 Ioannis' | '2 Ioannis' | '3 Ioannis' | 'Iudæ' | 'Apocalypsis';
export type Canon = 'OT' | 'NT' | 'LXX';

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

    toString(): string {
        return `${this.canon} ${this.ubs_book} ${this.chapter}:${this.verse}`;
    }

    static fromString(str: string): VerseReference | undefined {
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

            return new VerseReference(ubs_book, chapter, verse, canon);
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

}
