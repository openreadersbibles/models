import { z } from "zod";
import { MiniMarkdown } from './MiniMarkdown.js';
import { AnnotationJsonObject, AnnotationJsonObjectSchema, AnnotationType, AnnotationTypeSchema } from "./AnnotationJsonObject.js";

export const converter = new MiniMarkdown();

// Define the Annotation schema
export const AnnotationSchema = z.object({
    type: AnnotationTypeSchema,
    html: z.string(),
    tex: z.string(),
    toAnnotationObject: z.function().returns(AnnotationJsonObjectSchema),
});
export type Annotation = z.infer<typeof AnnotationSchema>;

export function annotationFromJson(json: string): Annotation | undefined {
    const obj = JSON.parse(json) as AnnotationJsonObject;
    return annotationFromObject(obj);
}

export function annotationFromObject(obj: AnnotationJsonObject): Annotation | undefined {
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

export class WordAnnotation implements Annotation {
    private _gloss: string;
    public type: AnnotationType = "word";

    constructor(gloss: string) {
        this._gloss = gloss;
    }

    get html(): string {
        return this._gloss;
    }

    get tex(): string {
        return this._gloss;
    }

    toAnnotationObject(): AnnotationJsonObject {
        return {
            type: "word",
            content: {
                gloss: this._gloss
            }
        };
    }

    static fromObject(obj: AnnotationJsonObject): WordAnnotation {
        if (obj.type !== "word") {
            throw new Error("Invalid type for WordAnnotation");
        }
        return new WordAnnotation(obj.content.gloss);
    }
}

export class MarkdownAnnotation implements Annotation {
    private _markdown: string;
    public type: AnnotationType = "markdown";

    constructor(markdown: string) {
        this._markdown = markdown;
    }

    get html(): string {
        return converter.makeHtml(this._markdown);
    }

    get tex(): string {
        return converter.makeTex(this._markdown);
    }

    toAnnotationObject(): AnnotationJsonObject {
        return {
            type: "markdown",
            content: {
                markdown: this._markdown
            }
        };
    }

    static fromObject(obj: AnnotationJsonObject): MarkdownAnnotation {
        if (obj.type !== "markdown") {
            throw new Error("Invalid type for MarkdownAnnotation");
        }
        return new MarkdownAnnotation(obj.content.markdown);
    }
}


export class WordPlusMarkdownAnnotation implements Annotation {
    private _gloss: string;
    private _markdown: string;
    public type: AnnotationType = "wordplusmarkdown";

    constructor(gloss: string, markdown: string) {
        this._gloss = gloss;
        this._markdown = markdown;
    }

    get html(): string {
        return this._gloss + " " + converter.makeHtml(this._markdown);
    }

    get tex(): string {
        return this._gloss + " " + converter.makeTex(this._markdown);
    }

    toAnnotationObject(): AnnotationJsonObject {
        return {
            type: "wordplusmarkdown",
            content: {
                gloss: this._gloss,
                markdown: this._markdown
            }
        };
    }

    static fromObject(obj: AnnotationJsonObject): WordPlusMarkdownAnnotation {
        if (obj.type !== "wordplusmarkdown") {
            throw new Error("Invalid type for WordPlusMarkdownAnnotation");
        }
        return new WordPlusMarkdownAnnotation(obj.content.gloss, obj.content.markdown);
    }
}


export class NullAnnotation implements Annotation {
    public type: AnnotationType = "null";

    constructor() {
    }

    get html(): string {
        return "";
    }

    get tex(): string {
        return "";
    }

    toAnnotationObject(): AnnotationJsonObject {
        return {
            type: "null",
            content: ""
        };
    }

    static fromObject(): NullAnnotation {
        return new NullAnnotation();
    }
}
