import { Canon } from "../Canon.js";

export class ParsingFormatBase {
    private _id: string;
    private _template: string;
    private _canon: Canon;

    constructor(id: string, template: string, canon: Canon) {
        this._id = id;
        this._template = template;
        this._canon = canon;
    }

    get id(): string {
        return this._id;
    }

    get template(): string {
        return this._template;
    }

    get canon(): Canon {
        return this._canon;
    }
}
