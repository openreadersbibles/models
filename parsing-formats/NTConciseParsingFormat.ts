import { PublicationGreekWordElement } from "../publication/PublicationGreekWordElement";
import { NumeralConverter } from "../NumeralConverter";
import { NTConciseEnglish, NTConciseParsingFormatStrings } from "./NTConciseParsingFormatStrings";
import { ParsingFormat, ParsingFormatObject } from "./ParsingFormat";
import { ParsingFormatBase } from "./ParsingFormatBase";

export class NTConciseParsingFormat extends ParsingFormatBase implements ParsingFormat {
    private strings: NTConciseParsingFormatStrings;
    private numeralConverter: NumeralConverter;

    constructor(id: string, template: string, numeralConverter: NumeralConverter, strings: NTConciseParsingFormatStrings = NTConciseEnglish) {
        super(id, template, "NT");
        this.strings = strings;
        this.numeralConverter = numeralConverter;
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
        let parsing = "N";

        /// case
        if (this.strings[element.grammatical_case]) {
            parsing += this.strings[element.grammatical_case];
        }

        /// gender
        if (this.strings[element.gender]) {
            parsing += this.strings[element.gender];
        }

        /// number
        parsing += this.strings[element.grammatical_number];

        return parsing;
    }

    verbParsingString(element: PublicationGreekWordElement): string {
        if (element.mood === "infinitive") {
            let parsing = this.strings.verb;

            parsing += this.strings.infinitive;

            /// tense
            parsing += this.strings[element.tense];

            /// voice
            parsing += this.strings[element.voice];

            return parsing;
        } else if (element.mood === "participle") {
            let parsing = this.strings.verb + this.strings.participle;

            /// tense
            parsing += this.strings[element.tense];

            /// voice
            parsing += this.strings[element.voice];

            /// case
            if (this.strings[element.grammatical_case]) {
                parsing += this.strings[element.grammatical_case];
            }

            /// gender
            parsing += this.strings[element.gender];

            /// number
            parsing += this.strings[element.grammatical_number];

            return parsing;
        } else {
            let parsing = this.strings.verb;

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

            /// number
            parsing += this.strings[element.grammatical_number];

            /// tense
            parsing += this.strings[element.tense];

            /// voice
            parsing += this.strings[element.voice];

            /// mood
            parsing += this.strings[element.mood];

            return parsing;
        }
    }

}