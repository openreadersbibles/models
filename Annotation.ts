import { z } from "zod";
import { MiniMarkdown } from './MiniMarkdown.js';
import { AnnotationJsonObject, AnnotationJsonObjectSchema, AnnotationType, AnnotationTypeSchema } from "./AnnotationJsonObject.js";

export const converter = new MiniMarkdown();

// Define the Annotation schema
export const AnnotationSchema = z.object({
    /// NB: this could be the _id from the gloss table or the _id from the phrase_gloss table
    gloss_id: z.number(),
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
            return NullAnnotation.fromObject(obj);
        default:
            return undefined;
    }
}

class AnnotationBase {
    public type: AnnotationType;
    /// NB: this could be the _id from the gloss table or the _id from the phrase_gloss table
    public gloss_id: number;

    constructor(type: AnnotationType, gloss_id: number) {
        this.type = type;
        this.gloss_id = gloss_id;
    }
}

export class WordAnnotation extends AnnotationBase implements Annotation {
    private _gloss: string;

    constructor(gloss: string, gloss_id: number) {
        super("word", gloss_id);
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
            gloss_id: this.gloss_id,
            content: {
                gloss: this._gloss
            }
        };
    }

    static fromObject(obj: AnnotationJsonObject): WordAnnotation {
        if (obj.type !== "word") {
            throw new Error("Invalid type for WordAnnotation");
        }
        return new WordAnnotation(obj.content.gloss, obj.gloss_id);
    }
}

export class MarkdownAnnotation extends AnnotationBase implements Annotation {
    private _markdown: string;

    constructor(markdown: string, gloss_id: number) {
        super("markdown", gloss_id);
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
            gloss_id: this.gloss_id,
            content: {
                markdown: this._markdown
            }
        };
    }

    static fromObject(obj: AnnotationJsonObject): MarkdownAnnotation {
        if (obj.type !== "markdown") {
            throw new Error("Invalid type for MarkdownAnnotation");
        }
        return new MarkdownAnnotation(obj.content.markdown, obj.gloss_id);
    }
}


export class WordPlusMarkdownAnnotation extends AnnotationBase implements Annotation {
    private _gloss: string;
    private _markdown: string;

    constructor(gloss: string, markdown: string, gloss_id: number) {
        super("wordplusmarkdown", gloss_id);
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
            gloss_id: this.gloss_id,
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
        return new WordPlusMarkdownAnnotation(obj.content.gloss, obj.content.markdown, obj.gloss_id);
    }
}


export class NullAnnotation extends AnnotationBase implements Annotation {
    constructor(gloss_id: number) {
        super("null", gloss_id);
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
            gloss_id: this.gloss_id,
            content: ""
        };
    }

    static fromObject(obj: AnnotationJsonObject): NullAnnotation {
        return new NullAnnotation(obj.gloss_id);
    }
}
