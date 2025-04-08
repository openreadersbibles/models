import { NTTemplaticEnglish } from "./NTTemplaticParsingFormatStrings.js";
import { ParsingFormatBase } from "./ParsingFormatBase.js";
export class NTTemplaticParsingFormat extends ParsingFormatBase {
    constructor(id, template, numeralConverter, strings = NTTemplaticEnglish) {
        super(id, template, "NT");
        this.strings = strings;
    }
    toObject() {
        return {
            id: this.id,
            template: this.template,
            translations: this.strings
        };
    }
    getString(key) {
        return this.strings[key];
    }
    nounParsingString(element) {
        let parsing = this.strings.noun_template;
        /// case
        parsing = parsing.replace("__CASE__", this.strings[element.grammatical_case] || "");
        /// gender
        parsing = parsing.replace("__GENDER__", this.strings[element.gender] || "");
        /// number
        parsing = parsing.replace("__NUMBER__", this.strings[element.grammatical_number] || "");
        return parsing;
    }
    verbParsingString(element) {
        if (element.mood === "infinitive") {
            let parsing = this.strings.infinitive_template;
            /// tense
            parsing = parsing.replace("__TENSE__", this.strings[element.tense] || "");
            /// voice
            parsing = parsing.replace("__VOICE__", this.strings[element.voice] || "");
            /// infinitive
            parsing = parsing.replace("__INFINITIVE__", this.strings.infinitive || "");
            return parsing;
        }
        else if (element.mood === "participle") {
            let parsing = this.strings.participle_template;
            /// tense
            parsing = parsing.replace("__TENSE__", this.strings[element.tense] || "");
            /// voice
            parsing = parsing.replace("__VOICE__", this.strings[element.voice] || "");
            /// participle
            parsing = parsing.replace("__PARTICIPLE__", this.strings.participle || "");
            /// case
            parsing = parsing.replace("__CASE__", this.strings[element.grammatical_case] || "");
            /// gender
            parsing = parsing.replace("__GENDER__", this.strings[element.gender] || "");
            /// number
            parsing = parsing.replace("__NUMBER__", this.strings[element.grammatical_number] || "");
            return parsing;
        }
        else {
            let parsing = this.strings.finite_verb_template;
            /// tense
            parsing = parsing.replace("__TENSE__", this.strings[element.tense] || "");
            /// voice
            parsing = parsing.replace("__VOICE__", this.strings[element.voice] || "");
            /// mood
            parsing = parsing.replace("__MOOD__", this.strings[element.mood] || "");
            /// person
            let personString = "";
            switch (element.person) {
                case "1st":
                    personString = this.strings.first;
                    break;
                case "2nd":
                    personString = this.strings.second;
                    break;
                case "3rd":
                    personString = this.strings.third;
                    break;
            }
            parsing = parsing.replace("__PERSON__", personString);
            /// number
            parsing = parsing.replace("__NUMBER__", this.strings[element.grammatical_number] || "");
            return parsing;
        }
    }
}
//# sourceMappingURL=NTTemplaticParsingFormat.js.map