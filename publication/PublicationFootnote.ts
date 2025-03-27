import { PublicationVerse } from "./PublicationVerse";
import { PublicationFootnoteElement } from "./PublicationFootnoteElement";
import { PublicationWordElement } from "./PublicationWordElement";
import { PublicationPhrasalGloss } from "./PublicationPhrasalGloss";
import { generateUUID } from "../../models/generateUUID";
import { converter } from "../../models/Annotation";
import { ProjectConfiguration } from "../../models/ProjectConfiguration";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import { PublicationRequest } from "../PublicationRequest";

export enum PublicationFootnoteType { None, Parsing, Gloss, ParsingGloss }

export class PublicationFootnote {
    verse: PublicationVerse;
    entries = new Map<string, PublicationFootnoteElement>();
    request: PublicationRequest;

    constructor(verse: PublicationVerse, request: PublicationRequest) {
        this.verse = verse;
        this.request = request;

        let ct = 0;
        verse.elements.forEach((el) => {
            /// add phrasal glosses first
            el.phrasalGlosses.forEach((pg) => {
                this.addPhrasalGloss(pg, ct);
                ct++;
            });

            /// If the element requires a (gloss) footnote
            if (el.requiredFootnoteType(verse.reference) != PublicationFootnoteType.None) {
                /// next add the regular word glosses
                this.addGloss(el, ct);
                ct++;
            }
        });
    }

    public addGloss(element: PublicationWordElement, index: number) {
        /// the key is the lexical form, because in principal there can be more than
        /// one instance of a rare word in a verse, and we want to combine the glosses
        const key = element.lexicalform;
        const marker = this.request.configuration.getFootnoteMarker(index);
        if (this.entries.has(key)) {
            this.entries.get(key)?.addMarker(marker)
        } else {
            /// Note that for Greek ketivQereString will always be empty
            let content = element.ketivQereString + this.footnoteContent(element);
            this.entries.set(key, new PublicationFootnoteElement(marker, content));
        }
    }

    public addPhrasalGloss(pg: PublicationPhrasalGloss, index: number) {
        const marker = this.request.configuration.getFootnoteMarker(index);
        /// because we expect phrasal glosses to be unique, we don't need to
        /// key them to any particular lexical form. They key is just a filler
        /// to make the map happy.
        const key = generateUUID();
        const content = `\\FnFreeform{${converter.makeTex(pg.markdown)}}`;
        this.entries.set(key, new PublicationFootnoteElement(marker, content));
    }

    public text(): string {
        const verseNumber = this.verse.reference.verse;
        let footnoteText = "";
        this.entries.forEach((value: PublicationFootnoteElement) => {
            footnoteText += `\\FootnoteSubHeader{${value.markerText()}}${value.text}\\FootnoteSubFooter`;
        });
        if (footnoteText.length > 0) {
            let footnoteNumber = this.request.project.replaceNumerals(verseNumber.toString());
            return `\\VerseFootnote{${footnoteNumber}}{${footnoteText}}`;
        } else {
            return "";
        }
    }

    private footnoteContent(element: PublicationWordElement): string {
        switch (element.requiredFootnoteType(this.verse.reference)) {
            case PublicationFootnoteType.Parsing:
                return `\\FnParse{${element.getParsingString(this.verse.reference)}}`;
            case PublicationFootnoteType.ParsingGloss:
                if (element.gloss === null) {
                    console.error("Gloss expected, but 'gloss' is null.");
                    // console.error(element);
                    return '';
                } else {
                    if (element.gloss.tex == null) {
                        console.error("Gloss expected, but 'gloss.tex' is null.");
                        // console.error(element);
                    }
                    return `\\FnParseFormGloss{${element.getParsingString(this.verse.reference)}}{${element.lexicalform}}{${element.gloss.tex}}`;
                }
            case PublicationFootnoteType.Gloss:
                if (element.gloss?.tex == null) {
                    console.error("Gloss expected, but 'gloss.tex' is null.");
                    // console.error(element);
                }
                return `\\FnFormGloss{${element.lexicalform}}{${element.gloss?.tex}}`;
            case PublicationFootnoteType.None:
            default:
                return "";
        }
    }

    public static xml(verse: PublicationVerse, element: PublicationWordElement, parent: XMLBuilder): void {
        switch (element.requiredFootnoteType(verse.reference)) {
            case PublicationFootnoteType.Parsing:
                parent.ele('gloss', { type: 'parsing' }).txt(element.getParsingString(verse.reference));
                break;
            case PublicationFootnoteType.ParsingGloss:
                if (element.gloss == null) {
                    console.error("Gloss expected, but 'gloss' is null.");
                    // console.error(element);
                } else if (element.gloss.tex == null) {
                    console.error("Gloss expected, but 'gloss.tex' is null.");
                    // console.error(element);
                } else {
                    parent
                        .ele('gloss', { type: 'parsing' })
                        .txt(element.getParsingString(verse.reference))
                        .up()
                        .ele('gloss', { type: 'lexical-form' })
                        .txt(element.lexicalform)
                        .up()
                        .ele('gloss', { type: 'gloss' })
                        .txt(element.gloss.tex);
                }
                break;
            case PublicationFootnoteType.Gloss:
                if (element.gloss === null) {
                    console.error("Gloss expected, but 'gloss' is null.");
                    // console.error(element);
                } else if (element.gloss.tex === null || element.gloss.tex === undefined) {
                    console.error("Gloss expected, but 'gloss.tex' is null.");
                    // console.error(element);
                } else {
                    parent
                        .ele('gloss', { type: 'lexical-form' })
                        .txt(element.lexicalform)
                        .up()
                        .ele('gloss', { type: 'gloss' })
                        .txt(element.gloss.tex);
                }
                break;
            case PublicationFootnoteType.None:
            default:
                break;
        }
    }

}