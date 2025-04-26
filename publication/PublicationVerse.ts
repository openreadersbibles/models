import { PublicationFootnote } from "./PublicationFootnote.js";
import { PublicationWord } from "./PublicationWord.js";
import { VerseReference } from "../../models/VerseReference.js";
import { PublicationRequest } from "../../models/PublicationRequest.js";
import { PublicationWordElement } from "./PublicationWordElement.js";
import { PublicationHebrewWordElementRow } from "./PublicationHebrewWordElementRow.js";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces.js";
import { PublicationGreekWordElementRow } from "./PublicationGreekWordElementRow.js";

export class PublicationVerse {
    public reference: VerseReference;
    public request: PublicationRequest;
    protected _elements = new Array<PublicationWordElement>();
    public words = new Array<PublicationWord>();

    constructor(reference: VerseReference, request: PublicationRequest) {
        this.reference = reference;
        this.request = request;
    }

    public verseXml(parent: XMLBuilder): void {
        let glossCounter = 0;

        this.words.forEach((word) => {
            const pgs = word.getPhrasalGlosses();

            let localParent = parent;

            /// add any phrasal glosses in at the beginning of the span
            pgs.filter((pg) => word.hasWordId(pg.from_word_id)).forEach((pg) => {
                const marker = this.request.configuration.getFootnoteMarker(glossCounter);
                glossCounter++;

                parent.ele('span', {
                    from: `#id${pg.from_word_id}`,
                    to: `#id${pg.to_word_id}`,
                    n: marker
                }).txt(pg.markdown);
            });

            /// we want to add the <w> element if it's either a from- or a to- word
            // const needsTag = phrasalGlosses.some((pg) => word.hasWordId(pg.from_word_id) || word.hasWordId(pg.to_word_id));
            /// I'm going to see about putting every word within a word tag
            const needsTag = true;
            if (needsTag) {
                localParent = parent.ele('w').att('xml:id', `id${String(word.elements[0].id)}`);
            }
            /// add the text of the word
            localParent.txt(word.getText());

            /// if there is only one gloss, add a footnote marker
            const gc = word.getNumberOfGlosses();
            if (gc == 1) {
                // text += `<note type="gloss" n="${this.request.project.getFootnoteMarker(glossCounter)}">dummy</note>`;
                const note_node = parent.ele('note', { type: 'gloss', n: this.request.configuration.getFootnoteMarker(glossCounter) });
                PublicationFootnote.xml(this, word.glossableElements()[0], note_node);

                glossCounter++;
            } else if (gc > 1) {
                console.error(`More than one gloss for a word in ${this.reference.toString()}`);
                word.glossableElements().forEach((element) => {
                    console.error(`${element.id} ${element.gloss?.html} ${element.requiredFootnoteType(this.reference)}`);
                });
            }

            parent.txt(word.getSeparator());

        });
    }

    public get elements(): PublicationWordElement[] {
        return this._elements;
    }

    static fromWordElements<T extends PublicationGreekWordElementRow | PublicationHebrewWordElementRow>(
        rows: T[],
        reference: VerseReference,
        request: PublicationRequest,
        objectCreator: (obj: T, word: PublicationWord, request: PublicationRequest) => PublicationWordElement): PublicationVerse {
        const v = new PublicationVerse(reference, request);

        v.words.push(new PublicationWord(reference));
        for (let i = 0; i < rows.length; i++) {
            const currentWord = v.words[v.words.length - 1];
            const e = objectCreator(rows[i], currentWord, request);

            v.elements.push(e);
            v.words[v.words.length - 1].addElement(e);

            if (e.terminatesWord && i != rows.length - 1) {
                v.words.push(new PublicationWord(reference));
            }
        }
        return v;
    }

}
