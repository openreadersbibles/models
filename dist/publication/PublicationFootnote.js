import { PublicationFootnoteElement } from "./PublicationFootnoteElement.js";
import { generateUUID } from "../../models/generateUUID.js";
import { converter } from "../../models/Annotation.js";
export var PublicationFootnoteType;
(function (PublicationFootnoteType) {
    PublicationFootnoteType[PublicationFootnoteType["None"] = 0] = "None";
    PublicationFootnoteType[PublicationFootnoteType["Parsing"] = 1] = "Parsing";
    PublicationFootnoteType[PublicationFootnoteType["Gloss"] = 2] = "Gloss";
    PublicationFootnoteType[PublicationFootnoteType["ParsingGloss"] = 3] = "ParsingGloss";
})(PublicationFootnoteType || (PublicationFootnoteType = {}));
export class PublicationFootnote {
    constructor(verse, request) {
        this.entries = new Map();
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
    addGloss(element, index) {
        /// the key is the lexical form, because in principal there can be more than
        /// one instance of a rare word in a verse, and we want to combine the glosses
        const key = element.lexicalform;
        const marker = this.request.configuration.getFootnoteMarker(index);
        if (this.entries.has(key)) {
            this.entries.get(key)?.addMarker(marker);
        }
        else {
            /// Note that for Greek ketivQereString will always be empty
            const content = element.ketivQereString + this.footnoteContent(element);
            this.entries.set(key, new PublicationFootnoteElement(marker, content));
        }
    }
    addPhrasalGloss(pg, index) {
        const marker = this.request.configuration.getFootnoteMarker(index);
        /// because we expect phrasal glosses to be unique, we don't need to
        /// key them to any particular lexical form. They key is just a filler
        /// to make the map happy.
        const key = generateUUID();
        const content = `\\FnFreeform{${converter.makeTex(pg.markdown)}}`;
        this.entries.set(key, new PublicationFootnoteElement(marker, content));
    }
    text() {
        const verseNumber = this.verse.reference.verse;
        let footnoteText = "";
        this.entries.forEach((value) => {
            footnoteText += `\\FootnoteSubHeader{${value.markerText()}}${value.text}\\FootnoteSubFooter`;
        });
        if (footnoteText.length > 0) {
            const footnoteNumber = this.request.project.replaceNumerals(verseNumber.toString());
            return `\\VerseFootnote{${footnoteNumber}}{${footnoteText}}`;
        }
        else {
            return "";
        }
    }
    footnoteContent(element) {
        switch (element.requiredFootnoteType(this.verse.reference)) {
            case PublicationFootnoteType.Parsing:
                return `\\FnParse{${element.getParsingString(this.verse.reference)}}`;
            case PublicationFootnoteType.ParsingGloss:
                if (element.gloss === null) {
                    console.error("Gloss expected, but 'gloss' is null.");
                    // console.error(element);
                    return '';
                }
                else {
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
    static xml(verse, element, parent) {
        switch (element.requiredFootnoteType(verse.reference)) {
            case PublicationFootnoteType.Parsing:
                parent.ele('gloss', { type: 'parsing' }).txt(element.getParsingString(verse.reference));
                break;
            case PublicationFootnoteType.ParsingGloss:
                if (element.gloss == null) {
                    console.error("Gloss expected, but 'gloss' is null.");
                    // console.error(element);
                }
                else if (element.gloss.tex == null) {
                    console.error("Gloss expected, but 'gloss.tex' is null.");
                    // console.error(element);
                }
                else {
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
                }
                else if (element.gloss.tex === null || element.gloss.tex === undefined) {
                    console.error("Gloss expected, but 'gloss.tex' is null.");
                    // console.error(element);
                }
                else {
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
//# sourceMappingURL=PublicationFootnote.js.map