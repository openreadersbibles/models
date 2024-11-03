import { Canon, UbsBook } from "./VerseReference";

export class BookIdentifier {
    book: UbsBook;
    canon: Canon;

    constructor(book: UbsBook, canon: Canon) {
        this.book = book;
        this.canon = canon;
    }

    toString(): string {
        return `${this.canon} ${this.book}`;
    }

    static fromString(input: string): BookIdentifier | undefined {
        const [canonKey, bookKey] = input.split(' ');

        const canon = canonKey as Canon;
        const book = bookKey as UbsBook;

        if (canon && book) {
            return new BookIdentifier(book, canon);
        }

        return undefined;
    }

    static fromObject(obj: { book: UbsBook, canon: Canon }): BookIdentifier {
        return new BookIdentifier(obj.book, obj.canon);
    }
}
