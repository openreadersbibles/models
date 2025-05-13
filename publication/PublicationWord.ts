import { VerseReference } from "../../models/VerseReference.js";
import { PublicationFootnoteType } from "./PublicationFootnote.js";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss.js";
import { PublicationWordElement } from "./PublicationWordElement.js";

export class PublicationWord {
    public elements = new Array<PublicationWordElement>();
    private ref: VerseReference;

    constructor(ref: VerseReference) {
        this.ref = ref;
    }

    addElement(e: PublicationWordElement) {
        this.elements.push(e);
    }

    getText() {
        return this.elements.map(e => e.plaintext).join('');
    }

    getSeparator(): string {
        return this.elements[this.elements.length - 1].trailer;
    }

    public glossableElements(): PublicationWordElement[] {
        return this.elements.filter((element: PublicationWordElement) => {
            return element.requiredFootnoteType(this.ref) != PublicationFootnoteType.None
                && element.gloss != null
                && element.gloss.type != "null";
        });
    }

    public getNumberOfGlosses(): number {
        return this.glossableElements().length;
    }

    public getPhrasalGlosses(): PublicationPhrasalGloss[] {
        let glosses = new Array<PublicationPhrasalGloss>();
        this.glossableElements().forEach((element) => {
            glosses = glosses.concat(element.phrasalGlosses);
        });
        return glosses;
    }

    public hasWordId(id: number): boolean {
        return this.elements.some((element) => element.id == id);
    }

    get hasKetivQere(): boolean {
        return this.elements.some((element) => element.ketiv.length > 0);
    }

    get ketiv(): string {
        return this.elements.map((element) => element.ketiv).join('');
    }

    get qere(): string {
        return this.elements.map((element) => element.qere).join('');
    }

}