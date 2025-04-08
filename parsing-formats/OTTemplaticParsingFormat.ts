import { PublicationHebrewWordElement } from "../publication/PublicationHebrewWordElement.js";
import { ParsingFormat, ParsingFormatObject } from "./ParsingFormat.js";
import { ParsingFormatBase } from "./ParsingFormatBase.js";
import { NumeralConverter } from "../NumeralConverter.js";
import { OTTemplaticEnglish, OTTemplaticParsingFormatStrings } from "./OTTemplaticParsingFormatStrings.js";

export class OTTemplaticParsingFormat extends ParsingFormatBase implements ParsingFormat {
    private strings: OTTemplaticParsingFormatStrings;
    private numeralConverter: NumeralConverter;

    constructor(id: string, template: string, numeralConverter: NumeralConverter, strings: OTTemplaticParsingFormatStrings = OTTemplaticEnglish) {
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
        let str = this.strings.noun_template;
        str = str.replace("__NOUN__", this.strings.noun);

        let stateString = "";
        switch (element.st) {
            case "a":
                stateString = this.strings.active;
                break;
            case "c":
                stateString = this.strings.construct;
                break;
            case "e":
                stateString = this.strings.emphatic;
                break;
            case "NA":
            default:
        }
        str = str.replace("__STATE__", stateString);

        let genderString = "";
        switch (element.gn) {
            case "m":
                genderString = this.strings.masculine;
                break;
            case "f":
                genderString = this.strings.feminine;
                break;
            case "NA":
            default:
        }
        str = str.replace("__GENDER__", genderString);

        let numberString = "";
        switch (element.nu) {
            case "sg":
                numberString = this.strings.singular;
                break;
            case "pl":
                numberString = this.strings.plural;
                break;
            case "du":
                numberString = this.strings.dual;
                break;
            case "unknown":
            case "NA":
        }
        str = str.replace("__NUMBER__", numberString);

        str = str.replace("__PRONOMINAL_SUFFIX_TEMPLATE__", this.pronominalSuffixString(element));

        str = str.replace("__INTERROGATIVE_TEMPLATE__", this.interrogativeString(element));

        return this.numeralConverter(str);
    }

    verbParsingString(element: PublicationHebrewWordElement): string {
        let str = this.strings.verb_template;

        let stemString = "";
        switch (element.vs) {
            case "qal":
                stemString = this.strings.qal;
                break;
            case "piel":
                stemString = this.strings.piel;
                break;
            case "hif":
                stemString = this.strings.hiphil;
                break;
            case "nif":
                stemString = this.strings.niphal;
                break;
            case "pual":
                stemString = this.strings.piel + " " + this.strings.passive;
                break;
            case "hit":
                stemString = this.strings.hithpael;
                break;
            case "hof":
                stemString = this.strings.hiphil + " " + this.strings.passive;
                break;
            case "hsht":
                stemString = this.strings.hishtaphel;
                break;
            case "pasq":
                stemString = this.strings.qal + " " + this.strings.passive;
                break;
            case "hotp":
                stemString = this.strings.hithpael + " " + this.strings.passive;
                break;
            case "nit":
                stemString = this.strings.nithpael;
                break;
            case "poal":
                stemString = this.strings.piel + " " + this.strings.passive;
                break;
            case "poel":
                stemString = this.strings.piel;
                break;
            case "htpo":
                stemString = this.strings.hithpael;
                break;
            case "peal":
                stemString = this.strings.qal;
                break;
            case "tif":
                stemString = this.strings.hithpael;
                break;
            case "etpa":
                stemString = this.strings.hithpael;
                break;
            case "pael":
                stemString = this.strings.piel;
                break;
            case "haf":
                stemString = this.strings.hiphil;
                break;
            case "htpe":
                stemString = this.strings.hithpeel;
                break;
            case "htpa":
                stemString = this.strings.hithpael;
                break;
            case "peil":
                stemString = this.strings.qal + " " + this.strings.passive;
                break;
            case "etpe":
                stemString = this.strings.hithpeel;
                break;
            case "afel":
                stemString = this.strings.hiphil;
                break;
            case "shaf":
                stemString = this.strings.shafel;
                break;
            case "NA":
            default:
                console.error("No stem specified for verb:", element);
        }
        str = str.replace("__STEM__", stemString);

        let tenseString = "";
        switch (element.vt) {
            case "perf":
                tenseString = this.strings.perfect;
                break;
            case "ptcp":
                tenseString = this.strings.active_participle;
                break;
            case "wayq":
                tenseString = this.strings.wayyiqtol;
                break;
            case "impf":
                tenseString = this.strings.imperfect;
                break;
            case "infc":
                tenseString = this.strings.infinitive_construct;
                break;
            case "impv":
                tenseString = this.strings.imperative;
                break;
            case "infa":
                tenseString = this.strings.infinitive_absolute;
                break;
            case "ptca":
                tenseString = this.strings.passive_participle;
                break;
            case "NA":
            default:
        }
        str = str.replace("__TENSE__", tenseString);

        let personString = "";
        switch (element.ps) {
            case "p1":
                personString = this.strings.first_person;
                break;
            case "p2":
                personString = this.strings.second_person;
                break;
            case "p3":
                personString = this.strings.third_person;
                break;
            case "unknown":
            case "NA":
        }
        str = str.replace("__PERSON__", personString);

        let genderString = "";
        switch (element.gn) {
            case "m":
                genderString = this.strings.masculine;
                break;
            case "f":
                genderString = this.strings.feminine;
                break;
            case "NA":
            default:
        }
        str = str.replace("__GENDER__", genderString);

        let numberString = "";
        switch (element.nu) {
            case "sg":
                numberString = this.strings.singular;
                break;
            case "pl":
                numberString = this.strings.plural;
                break;
            case "du":
                numberString = this.strings.dual;
                break;
            case "NA":
        }
        str = str.replace("__NUMBER__", numberString);

        str = str.replace("__PRONOMINAL_SUFFIX_TEMPLATE__", this.pronominalSuffixString(element));

        str = str.replace("__INTERROGATIVE_TEMPLATE__", this.interrogativeString(element));

        return this.numeralConverter(str);
    }

    private pronominalSuffixString(element: PublicationHebrewWordElement): string {
        if (element.hasPronominalSuffix) {
            let str = this.strings.pronominal_suffix_template;

            str = str.replace("__SUFFIX__", this.strings.suffix);

            let personString = "";
            switch (element.prs_ps) {
                case "p1":
                    personString = this.strings.first_person;
                    break;
                case "p2":
                    personString = this.strings.second_person;
                    break;
                case "p3":
                    personString = this.strings.third_person;
                    break;
                case "unknown":
                case "NA":
            }
            str = str.replace("__PERSON__", personString);

            let genderString = "";
            switch (element.prs_gn) {
                case "m":
                    genderString = this.strings.masculine;
                    break;
                case "f":
                    genderString = this.strings.feminine;
                    break;
                case "NA":
            }
            str = str.replace("__GENDER__", genderString);

            let numberString = "";
            switch (element.prs_nu) {
                case "sg":
                    numberString = this.strings.singular;
                    break;
                case "pl":
                    numberString = this.strings.plural;
                    break;
                case "du":
                    numberString = this.strings.dual;
                    break;
                case "NA":
            }
            str = str.replace("__NUMBER__", numberString);

            return str;
        } else {
            return "";
        }
    }

    private interrogativeString(element: PublicationHebrewWordElement): string {
        if (element.hasPrecedingInterrogative) {
            return this.strings.interrogative_template;
        } else {
            return "";
        }
    }
}
