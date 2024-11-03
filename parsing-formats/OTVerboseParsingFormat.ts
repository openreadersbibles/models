import { PublicationHebrewWordElement } from "../publication/PublicationHebrewWordElement";
import { ParsingFormat, ParsingFormatObject } from "./ParsingFormat";
import { ParsingFormatBase } from "./ParsingFormatBase";
import { NumeralConverter } from "../NumeralConverter";
import { OTVerboseEnglish, OTVerboseParsingFormatStrings } from "./OTVerboseParsingFormatStrings";

export class OTVerboseParsingFormat extends ParsingFormatBase implements ParsingFormat {
    private strings: OTVerboseParsingFormatStrings;
    private numeralConverter: NumeralConverter;

    constructor(id: string, template: string, numeralConverter: NumeralConverter, strings: OTVerboseParsingFormatStrings = OTVerboseEnglish) {
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
        let str = this.strings.noun;

        switch (element.st) {
            case "a":
                str += " " + this.strings.active;
                break;
            case "c":
                str += " " + this.strings.construct;
                break;
            case "e":
                str += " " + this.strings.emphatic;
                break;
            case "NA":
            default:
        }

        switch (element.gn) {
            case "m":
                str += " " + this.strings.masculine;
                break;
            case "f":
                str += " " + this.strings.feminine;
                break;
            case "NA":
            default:
        }

        switch (element.nu) {
            case "sg":
                str += " " + this.strings.singular;
                break;
            case "pl":
                str += " " + this.strings.plural;
                break;
            case "du":
                str += " " + this.strings.dual;
                break;
            case "unknown":
            case "NA":
        }

        str += this.pronominalSuffixString(element);

        if (element.hasPrecedingInterrogative) {
            str += ", " + this.strings.interrogative;
        }
        return this.numeralConverter(str);
    }

    verbParsingString(element: PublicationHebrewWordElement): string {
        let str = "";

        switch (element.vs) {
            case "qal":
                str += " " + this.strings.qal;
                break;
            case "piel":
                str += " " + this.strings.piel;
                break;
            case "hif":
                str += " " + this.strings.hiphil;
                break;
            case "nif":
                str += " " + this.strings.niphal;
                break;
            case "pual":
                str += " " + this.strings.piel + " " + this.strings.passive;
                break;
            case "hit":
                str += " " + this.strings.hithpael;
                break;
            case "hof":
                str += " " + this.strings.hiphil + " " + this.strings.passive;
                break;
            case "hsht":
                str += " " + this.strings.hishtaphel;
                break;
            case "pasq":
                str += " " + this.strings.qal + " " + this.strings.passive;
                break;
            case "hotp":
                str += " " + this.strings.hithpael + " " + this.strings.passive;
                break;
            case "nit":
                str += " " + this.strings.nithpael;
                break;
            case "poal":
                str += " " + this.strings.piel + " " + this.strings.passive;
                break;
            case "poel":
                str += " " + this.strings.piel;
                break;
            case "htpo":
                str += " " + this.strings.hithpael;
                break;
            case "peal":
                str += " " + this.strings.qal;
                break;
            case "tif":
                str += " " + this.strings.hithpael;
                break;
            case "etpa":
                str += " " + this.strings.hithpael;
                break;
            case "pael":
                str += " " + this.strings.piel;
                break;
            case "haf":
                str += " " + this.strings.hiphil;
                break;
            case "htpe":
                str += " " + this.strings.hithpeel;
                break;
            case "htpa":
                str += " " + this.strings.hithpael;
                break;
            case "peil":
                str += " " + this.strings.qal + " " + this.strings.passive;
                break;
            case "etpe":
                str += " " + this.strings.hithpeel;
                break;
            case "afel":
                str += " " + this.strings.hiphil;
                break;
            case "shaf":
                str += " " + this.strings.shafel;
                break;
            case "NA":
            default:
                console.error("No stem specified for verb:", element);
        }

        switch (element.vt) {
            case "perf":
                str += " " + this.strings.perfect;
                break;
            case "ptcp":
                str += " " + this.strings.active_participle;
                break;
            case "wayq":
                str += " " + this.strings.wayyiqtol;
                break;
            case "impf":
                str += " " + this.strings.imperfect;
                break;
            case "infc":
                str += " " + this.strings.infinitive_construct;
                break;
            case "impv":
                str += " " + this.strings.imperative;
                break;
            case "infa":
                str += " " + this.strings.infinitive_absolute;
                break;
            case "ptca":
                str += " " + this.strings.passive_participle;
                break;
            case "NA":
            default:
        }

        switch (element.ps) {
            case "p1":
                str += " " + this.strings.first_person;
                break;
            case "p2":
                str += " " + this.strings.second_person;
                break;
            case "p3":
                str += " " + this.strings.third_person;
                break;
            case "unknown":
            case "NA":
        }

        switch (element.gn) {
            case "m":
                str += " " + this.strings.masculine;
                break;
            case "f":
                str += " " + this.strings.feminine;
                break;
            case "NA":
            default:
        }

        switch (element.nu) {
            case "sg":
                str += " " + this.strings.singular;
                break;
            case "pl":
                str += " " + this.strings.plural;
                break;
            case "du":
                str += " " + this.strings.dual;
                break;
            case "NA":
        }


        str += this.pronominalSuffixString(element);

        if (element.hasPrecedingInterrogative) {
            str += ", " + this.strings.interrogative;
        }

        return this.numeralConverter(str);
    }

    private pronominalSuffixString(element: PublicationHebrewWordElement): string {
        let str = "";
        if (element.hasPronominalSuffix) {
            str += " " + this.strings.suffix;
            switch (element.prs_ps) {
                case "p1":
                    str += " " + this.strings.first_person;
                    break;
                case "p2":
                    str += " " + this.strings.second_person;
                    break;
                case "p3":
                    str += " " + this.strings.third_person;
                    break;
                case "unknown":
                case "NA":
            }
            switch (element.prs_gn) {
                case "m":
                    str += " " + this.strings.masculine;
                    break;
                case "f":
                    str += " " + this.strings.feminine;
                    break;
                case "NA":
            }
            switch (element.prs_nu) {
                case "sg":
                    str += " " + this.strings.singular;
                    break;
                case "pl":
                    str += " " + this.strings.plural;
                    break;
                case "du":
                    str += " " + this.strings.dual;
                    break;
                case "NA":
            }
        }
        return str;
    }


}
