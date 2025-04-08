export class WordGlossLocation {
    constructor(word_id, lex_id) {
        this._word_id = word_id;
        this._lex_id = lex_id;
    }
    get word_id() {
        return this._word_id;
    }
    get lex_id() {
        return this._lex_id;
    }
    asString() {
        return `${this._word_id}`;
    }
    toObject() {
        return {
            word_id: this._word_id,
            lex_id: this._lex_id
        };
    }
}
export class PhraseGlossLocation {
    constructor(from_word_id, to_word_id) {
        this._from_word_id = from_word_id;
        this._to_word_id = to_word_id;
    }
    toObject() {
        return {
            from_word_id: this._from_word_id,
            to_word_id: this._to_word_id
        };
    }
    get from() {
        return this._from_word_id;
    }
    get to() {
        return this._to_word_id;
    }
    asString() {
        return `${this._from_word_id}-${this._to_word_id}`;
    }
    static fromString(str) {
        const parts = str.split('-');
        return new PhraseGlossLocation(parseInt(parts[0]), parseInt(parts[1]));
    }
    static compareStrings(a, b) {
        return PhraseGlossLocation.firstFromString(a) - PhraseGlossLocation.firstFromString(b);
    }
    static compare(a, b) {
        return a.from - b.from;
    }
    static firstFromString(str) {
        return parseInt(str.split('-')[0]);
    }
}
//# sourceMappingURL=gloss-locations.js.map