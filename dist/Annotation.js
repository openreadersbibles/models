import { MiniMarkdown } from './MiniMarkdown.js';
export const converter = new MiniMarkdown();
export function annotationFromJson(json) {
    const obj = JSON.parse(json);
    return annotationFromObject(obj);
}
export function annotationFromObject(obj) {
    switch (obj.type) {
        case "word":
            return WordAnnotation.fromObject(obj);
        case "markdown":
            return MarkdownAnnotation.fromObject(obj);
        case "wordplusmarkdown":
            return WordPlusMarkdownAnnotation.fromObject(obj);
        case "null":
            return NullAnnotation.fromObject();
        default:
            return undefined;
    }
}
export class WordAnnotation {
    constructor(gloss) {
        this.type = "word";
        this._gloss = gloss;
    }
    get html() {
        return this._gloss;
    }
    get tex() {
        return this._gloss;
    }
    toAnnotationObject() {
        return {
            type: "word",
            content: {
                gloss: this._gloss
            }
        };
    }
    static fromObject(obj) {
        if (obj.type !== "word") {
            throw new Error("Invalid type for WordAnnotation");
        }
        return new WordAnnotation(obj.content.gloss);
    }
}
export class MarkdownAnnotation {
    constructor(markdown) {
        this.type = "markdown";
        this._markdown = markdown;
    }
    get html() {
        return converter.makeHtml(this._markdown);
    }
    get tex() {
        return converter.makeTex(this._markdown);
    }
    toAnnotationObject() {
        return {
            type: "markdown",
            content: {
                markdown: this._markdown
            }
        };
    }
    static fromObject(obj) {
        if (obj.type !== "markdown") {
            throw new Error("Invalid type for MarkdownAnnotation");
        }
        return new MarkdownAnnotation(obj.content.markdown);
    }
}
export class WordPlusMarkdownAnnotation {
    constructor(gloss, markdown) {
        this.type = "wordplusmarkdown";
        this._gloss = gloss;
        this._markdown = markdown;
    }
    get html() {
        return this._gloss + " " + converter.makeHtml(this._markdown);
    }
    get tex() {
        return this._gloss + " " + converter.makeTex(this._markdown);
    }
    toAnnotationObject() {
        return {
            type: "wordplusmarkdown",
            content: {
                gloss: this._gloss,
                markdown: this._markdown
            }
        };
    }
    static fromObject(obj) {
        if (obj.type !== "wordplusmarkdown") {
            throw new Error("Invalid type for WordPlusMarkdownAnnotation");
        }
        return new WordPlusMarkdownAnnotation(obj.content.gloss, obj.content.markdown);
    }
}
export class NullAnnotation {
    constructor() {
        this.type = "null";
    }
    get html() {
        return "";
    }
    get tex() {
        return "";
    }
    toAnnotationObject() {
        return {
            type: "null",
            content: ""
        };
    }
    static fromObject() {
        return new NullAnnotation();
    }
}
//# sourceMappingURL=Annotation.js.map