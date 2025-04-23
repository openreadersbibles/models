import { PublicationGreekWordElement } from "../publication/PublicationGreekWordElement.js";
import { NumeralConverter } from "../NumeralConverter.js";
import { NTVerboseEnglish, NTVerboseParsingFormatStrings } from "./NTVerboseParsingFormatStrings.js";
import { ParsingFormat } from "./ParsingFormat.js";
import { ParsingFormatBase } from "./ParsingFormatBase.js";
import { ParsingFormatObject } from "@models/ParsingFormatObject.js";

export class NTVerboseParsingFormat extends ParsingFormatBase implements ParsingFormat {
    private strings: NTVerboseParsingFormatStrings;

    constructor(id: string, template: string, numeralConverter: NumeralConverter, strings: NTVerboseParsingFormatStrings = NTVerboseEnglish) {
        super(id, template, "NT");
        this.strings = strings;
    }

    toObject(): ParsingFormatObject {
        return {
            id: this.id,
            template: this.template,
            translations: this.strings
        };
    }

    getString(key: string): string | undefined {
        return this.strings[key];
    }

    nounParsingString(element: PublicationGreekWordElement): string {
        let parsing = "";

        /// case
        if (this.strings[element.grammatical_case]) {
            parsing += this.strings[element.grammatical_case];
            parsing += " ";
        }

        /// gender
        if (this.strings[element.gender]) {
            parsing += this.strings[element.gender];
            parsing += " ";
        }

        /// number
        parsing += this.strings[element.grammatical_number];

        return parsing;
    }

    verbParsingString(element: PublicationGreekWordElement): string {
        if (element.mood === "infinitive") {
            /// tense
            let parsing = this.strings[element.tense];
            parsing += " ";

            /// voice
            parsing += this.strings[element.voice];
            parsing += " ";

            parsing += this.strings.infinitive;

            return parsing;
        } else if (element.mood === "participle") {
            /// tense
            let parsing = this.strings[element.tense];
            parsing += " ";

            /// voice
            parsing += this.strings[element.voice];
            parsing += " ";

            parsing += this.strings.participle;
            parsing += " ";

            /// case
            if (this.strings[element.grammatical_case]) {
                parsing += this.strings[element.grammatical_case];
                parsing += " ";
            }

            /// gender
            parsing += this.strings[element.gender];
            parsing += " ";

            /// number
            parsing += this.strings[element.grammatical_number];

            return parsing;
        } else {
            /// tense
            let parsing = this.strings[element.tense];
            parsing += " ";

            /// voice
            parsing += this.strings[element.voice];
            parsing += " ";

            /// mood
            parsing += this.strings[element.mood];
            parsing += " ";

            /// person
            switch (element.person) {
                case "1st":
                    parsing += this.strings.first;
                    break;
                case "2nd":
                    parsing += this.strings.second;
                    break;
                case "3rd":
                    parsing += this.strings.third;
                    break;
            }
            parsing += " ";

            /// number
            parsing += this.strings[element.grammatical_number];
            return parsing;
        }
    }

}