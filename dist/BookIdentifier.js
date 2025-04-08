export class BookIdentifier {
    constructor(book, canon) {
        this.book = book;
        this.canon = canon;
    }
    toString() {
        return `${this.canon} ${this.book}`;
    }
    static fromString(input) {
        const [canonKey, bookKey] = input.split(' ');
        const canon = canonKey;
        const book = bookKey;
        if (canon && book) {
            return new BookIdentifier(book, canon);
        }
        return undefined;
    }
    static fromObject(obj) {
        return new BookIdentifier(obj.book, obj.canon);
    }
    toObject() {
        return {
            book: this.book,
            canon: this.canon
        };
    }
}
//# sourceMappingURL=BookIdentifier.js.map