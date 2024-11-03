import { PublicationHebrewWordElement } from "../../publication-service/PublicationHebrewWordElement";
import { OTGender, OTGrammaticalNumber, OTPerson } from "../HebrewWordRow";
import { OTBasicEnglish, OTConciseParsingFormatStrings } from "./OTConciseParsingFormatStrings";
import { ParsingFormat, ParsingFormatObject } from "./ParsingFormat";
import { ParsingFormatBase } from "./ParsingFormatBase";
import { NumeralConverter } from "../../publication-service/Publisher";

export class OTConciseParsingFormat extends ParsingFormatBase implements ParsingFormat {
    private strings: OTConciseParsingFormatStrings;
    private numeralConverter: NumeralConverter;

    constructor(id: string, template: string, numeralConverter: NumeralConverter, strings: OTConciseParsingFormatStrings = OTBasicEnglish) {
        super(id, template, "OT");
        this.numeralConverter = numeralConverter;
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

    nounParsingString(element: PublicationHebrewWordElement): string {
        let str = this.strings.noun_abbreviation + "7" + this.secondNumberForNouns(element);
        if (element.hasPrecedingInterrogative) {
            str += this.strings.interrogative_abbreviation;
        }
        if (element.hasPronominalSuffix) {
            str += this.strings.pronominal_suffix_abbreviation + this.secondNumberForInflectedVerbs(element.prs_ps, element.prs_nu, element.prs_gn);
        }
        return this.numeralConverter(str);
    }

    verbParsingString(element: PublicationHebrewWordElement): string {
        let str = "";

        switch (element.vs) {
            case "qal":
                str += this.strings.qal_abbreviation;
                break;
            case "piel":
                str += this.strings.piel_abbreviation;
                break;
            case "hif":
                str += this.strings.hiphil_abbreviation;
                break;
            case "nif":
                str += this.strings.niphal_abbreviation;
                break;
            case "pual":
                str += this.strings.piel_abbreviation + this.strings.passive_abbreviation;
                break;
            case "hit":
                str += this.strings.hithpael_abbreviation;
                break;
            case "hof":
                str += this.strings.hiphil_abbreviation + this.strings.passive_abbreviation;
                break;
            case "hsht":
                str += this.strings.hishtaphel_abbreviation;
                break;
            case "pasq":
                str += this.strings.qal_abbreviation + this.strings.passive_abbreviation;
                break;
            case "hotp":
                str += this.strings.hithpael_abbreviation + this.strings.passive_abbreviation;
                break;
            case "nit":
                str += this.strings.nithpael_abbreviation;
                break;
            case "poal":
                str += this.strings.piel_abbreviation + this.strings.passive_abbreviation;
                break;
            case "poel":
                str += this.strings.piel_abbreviation;
                break;
            case "htpo":
                str += this.strings.hithpael_abbreviation;
                break;
            case "peal":
                str += this.strings.qal_abbreviation;
                break;
            case "tif":
                str += this.strings.hithpael_abbreviation;
                break;
            case "etpa":
                str += this.strings.hithpael_abbreviation;
                break;
            case "pael":
                str += this.strings.piel_abbreviation;
                break;
            case "haf":
                str += this.strings.hiphil_abbreviation;
                break;
            case "htpe":
                str += this.strings.hithpeel_abbreviation;
                break;
            case "htpa":
                str += this.strings.hithpael_abbreviation;
                break;
            case "peil":
                str += this.strings.qal_abbreviation + this.strings.passive_abbreviation;
                break;
            case "etpe":
                str += this.strings.hithpeel_abbreviation;
                break;
            case "afel":
                str += this.strings.hiphil_abbreviation;
                break;
            case "shaf":
                str += this.strings.shafel_abbreviation;
                break;
            case "NA":
            default:
                console.error("No stem specified for verb:", element);
        }

        switch (element.vt) {
            case "perf":
                str += "1" + this.secondNumberForInflectedVerbs(element.ps, element.nu, element.gn);
                break;
            case "ptca":
                str += "5" + this.secondNumberForNouns(element);
                break;
            case "wayq":
                str += this.strings.retentive_abbreviation + "2" + this.secondNumberForInflectedVerbs(element.ps, element.nu, element.gn);
                break;
            case "impf":
                str += "2" + this.secondNumberForInflectedVerbs(element.ps, element.nu, element.gn);
                break;
            case "infc":
                str += "65";
                break;
            case "impv":
                str += "3" + this.secondNumberForInflectedVerbs(element.ps, element.nu, element.gn);
                break;
            case "infa":
                str += "60";
                break;
            case "ptcp":
                /// for these stems, the passive_abbreviation has already been added
                if (element.vs == "hof" || element.vs == "pasq" || element.vs == "pual") {
                    str += "5" + this.secondNumberForNouns(element);
                } else {
                    str += this.strings.passive_abbreviation + "5" + this.secondNumberForNouns(element);
                }
                break;
            case "NA":
            default:
                console.error("No tense specified for verb:", element);
        }

        if (element.hasPronominalSuffix) {
            str += this.strings.pronominal_suffix_abbreviation + this.secondNumberForInflectedVerbs(element.prs_ps, element.prs_nu, element.prs_gn);
        }

        if (element.hasPrecedingInterrogative) {
            str += this.strings.interrogative_abbreviation;
        }

        return this.numeralConverter(str);
    }

    private secondNumberForInflectedVerbs(ps: OTPerson, nu: OTGrammaticalNumber, gn: OTGender): string {
        const first = ps == "p1";
        const second = ps == "p2";
        const third = ps == "p3" || ps == "unknown";

        const singular = nu == "sg";
        const plural = nu == "pl" || nu == "du";

        /// I'm not at all certain about this "unknown" business
        const masculine = gn == "m" || gn == "unknown";
        const feminine = gn == "f";

        if (third && singular && masculine) {
            return "0";
        } else if (third && singular && feminine) {
            return "1";
        } else if (second && singular && masculine) {
            return "2";
        } else if (second && singular && feminine) {
            return "3";
        } else if (first && singular) {
            return "4";
        } else if (third && plural && masculine) {
            return "5";
        } else if (third && plural && feminine) {
            return "6";
        } else if (second && plural && masculine) {
            return "7";
        } else if (second && plural && feminine) {
            return "8";
        } else if (first && plural) {
            return "9";
        } else {
            console.error("Unrecognized person/number/gender in verb:", ps, nu, gn)
            throw "Unrecognized person/number/gender";
        }
    }

    private secondNumberForNouns(element: PublicationHebrewWordElement): string {
        const singular = element.nu == "sg" || element.nu == "unknown";
        const plural = element.nu == "pl" || element.nu == "du";

        /// I'm not at all certain about this "unknown" business
        const masculine = element.gn == "m" || element.gn == "unknown";
        const feminine = element.gn == "f";

        /// For active/construct, NA defaults to active
        const active = element.st == "a" || element.st == "NA";
        const construct = element.st == "c";
        const emphatic = element.st == "e";

        if (masculine && singular && active) {
            return "0";
        } else if (feminine && singular && active) {
            return "1";
        } else if (masculine && singular && construct) {
            return "2";
        } else if (feminine && singular && construct) {
            return "3";
        } else if (masculine && plural && active) {
            return "5";
        } else if (feminine && plural && active) {
            return "6";
        } else if (masculine && plural && construct) {
            return "7";
        } else if (feminine && plural && construct) {
            return "8";
        } else if (masculine && singular && emphatic) {
            /// it's a curiosity of the Reader's BHS that it uses the same numbers for emphatic and construct
            return "2";
        } else if (feminine && singular && emphatic) {
            return "3";
        } else if (masculine && plural && emphatic) {
            return "7";
        } else if (feminine && plural && emphatic) {
            return "8";
        }
        else {
            console.error("Unrecognized number/gender in noun or pronominal suffix:", element)
            throw "Unrecognized number/gender";
        }

    }
}
