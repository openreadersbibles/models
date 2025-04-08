import { CANONS, getCanon } from "./Canons.js";
export class VerseReference {
    constructor(ubs_book, chapter, verse, canon) {
        this.ubs_book = ubs_book;
        this.chapter = chapter;
        this.verse = verse;
        this.canon = canon;
    }
    equals(other) {
        return this.ubs_book === other.ubs_book
            && this.chapter === other.chapter
            && this.verse === other.verse
            && this.canon === other.canon;
    }
    /// NB: will never return LXX
    static canonFromBook(book) {
        for (let i = 0; i < CANONS.length; i++) {
            if (CANONS[i].hasBook(book)) {
                return CANONS[i];
            }
        }
        return undefined;
    }
    get canonData() {
        return getCanon(this.canon);
    }
    nextVerse() {
        return this.canonData.nextVerse(this);
    }
    previousVerse() {
        return this.canonData.previousVerse(this);
    }
    get latinBookName() {
        return VerseReference.ubsBookToLatin(this.ubs_book);
    }
    get xmlId() {
        return `${this.canon}-${this.ubs_book}-${this.chapter}-${this.verse}`;
    }
    toString() {
        return `${this.canon} ${this.ubs_book} ${this.chapter}:${this.verse}`;
    }
    static fromString(str) {
        if (str === undefined) {
            return undefined;
        }
        const regex = /^([A-Z]{2,3})\s([A-Z0-9]{3})\s(\d+):(\d+)$/;
        const match = str.match(regex);
        if (match) {
            const canon = match[1];
            const ubs_book = match[2];
            const chapter = parseInt(match[3]);
            const verse = parseInt(match[4]);
            return new VerseReference(ubs_book, chapter, verse, canon);
        }
        return undefined;
    }
    static ubsBookToLatin(ubsBook) {
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
//# sourceMappingURL=VerseReference.js.map