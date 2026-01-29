import { PublicationVerse } from "./PublicationVerse.js";
import { PublicationWord } from "./PublicationWord.js";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces.js";

export enum PublicationFootnoteType { None, Parsing, Gloss, ParsingGloss }

export class PublicationFootnote {

    public static xml(verse: PublicationVerse, word: PublicationWord, parent: XMLBuilder): void {
        /// the glossable element, of which there should be only one
        if (word.hasKetivQere) {
            parent.ele('gloss', { type: 'ketiv-qere' })
                .ele('orb:ketiv').txt(word.ketiv)
                .up()
                .ele('orb:qere').txt(word.qere);
        }

        const element = word.glossableElements()[0];
        /// this condition is met if a word has a ketiv-qere, but no glossable element
        if (element == null) {
            return;
        }

        switch (element.requiredFootnoteType(verse.reference)) {
            case PublicationFootnoteType.Parsing:
                parent
                    .ele('gloss', { type: 'parsing' })
                    .txt(element.getParsingString(verse.reference))
                    .up()
                    .ele('gloss', { type: 'lexical-form' })
                    .txt(element.lexicalform);
                break;
            case PublicationFootnoteType.ParsingGloss:
                if (element.gloss == null) {
                    // console.error(`Gloss expected, but 'gloss' is null. (Word Element: ${element.id}}, ${verse.reference.toString()})`);
                    // console.error(element);
                } else {
                    const glossgloss = parent
                        .ele('gloss', { type: 'parsing' })
                        .txt(element.getParsingString(verse.reference))
                        .up()
                        .ele('gloss', { type: 'lexical-form' })
                        .txt(element.lexicalform)
                        .up()
                        .ele('gloss', { type: 'gloss' });
                    element.gloss.xml(glossgloss);
                    // .txt(element.gloss.tex);
                }
                break;
            case PublicationFootnoteType.Gloss:
                if (element.gloss === null) {
                    // console.error(`Gloss expected, but 'gloss' is null. (Word Element: ${element.id}}, ${verse.reference.toString()})`);
                    // console.error(element);
                } else {
                    const glossgloss = parent
                        .ele('gloss', { type: 'lexical-form' })
                        .txt(element.lexicalform)
                        .up()
                        .ele('gloss', { type: 'gloss' });
                    element.gloss.xml(glossgloss);
                }
                break;
            case PublicationFootnoteType.None:
            default:
                break;
        }
    }

}