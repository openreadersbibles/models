import { Canon, CanonSchema } from "./Canon.js";
import { UbsBook, UbsBookSchema } from "./UbsBook.js";
import { z } from "zod";

export const BookIdentifierJsonSchema = z.object({
    book: UbsBookSchema,
    canon: CanonSchema
});
export type BookIdentifierJson = z.infer<typeof BookIdentifierJsonSchema>;

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

    static fromObject(obj: BookIdentifierJson): BookIdentifier {
        return new BookIdentifier(obj.book, obj.canon);
    }

    toObject(): BookIdentifierJson {
        return {
            book: this.book,
            canon: this.canon
        };
    }
}
