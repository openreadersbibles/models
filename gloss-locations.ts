import { PhraseGlossLocationObject } from "./PhraseGlossLocationObject";
import { WordGlossLocationObject } from "./WordGlossLocationObject";

export interface GlossLocation {
    toObject(): WordGlossLocationObject | PhraseGlossLocationObject;
    asString(): string;
}

export class WordGlossLocation implements GlossLocation {
    private _word_id: number;
    private _lex_id: number;

    constructor(word_id: number, lex_id: number) {
        this._word_id = word_id;
        this._lex_id = lex_id;
    }

    get word_id(): number {
        return this._word_id;
    }

    get lex_id(): number {
        return this._lex_id;
    }

    asString(): string {
        return `${this._word_id}`;
    }

    toObject(): WordGlossLocationObject {
        return {
            word_id: this._word_id,
            lex_id: this._lex_id
        };
    }
}

export class PhraseGlossLocation implements GlossLocation {
    private _from_word_id: number;
    private _to_word_id: number;

    constructor(from_word_id: number, to_word_id: number) {
        this._from_word_id = from_word_id;
        this._to_word_id = to_word_id;
    }

    toObject(): PhraseGlossLocationObject {
        return {
            from_word_id: this._from_word_id,
            to_word_id: this._to_word_id
        };
    }

    get from(): number {
        return this._from_word_id;
    }

    get to(): number {
        return this._to_word_id;
    }

    asString(): string {
        return `${this._from_word_id}-${this._to_word_id}`;
    }

    static fromString(str: string): PhraseGlossLocation {
        const parts = str.split('-');
        return new PhraseGlossLocation(parseInt(parts[0]), parseInt(parts[1]));
    }

    static compareStrings(a: string, b: string): number {
        return PhraseGlossLocation.firstFromString(a) - PhraseGlossLocation.firstFromString(b);
    }

    static compare(a: PhraseGlossLocation, b: PhraseGlossLocation): number {
        return a.from - b.from;
    }

    static firstFromString(str: string): number {
        return parseInt(str.split('-')[0]);
    }
}
