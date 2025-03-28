import { NumeralConverter } from "../NumeralConverter";
import { NTConciseParsingFormat } from "./NTConciseParsingFormat";
import { NTConciseEnglish } from "./NTConciseParsingFormatStrings";
import { NTVerboseParsingFormat } from "./NTVerboseParsingFormat";
import { NTVerboseEnglish, NTVerboseStringLabels } from "./NTVerboseParsingFormatStrings";
import { OTConciseParsingFormat } from "./OTConciseParsingFormat";
import { OTBasicEnglish, OTConciseStringLabels } from "./OTConciseParsingFormatStrings";
import { OTVerboseParsingFormat } from "./OTVerboseParsingFormat";
import { Canon } from "../VerseReference";
import { OTVerboseEnglish, OTVerboseStringLabels } from "./OTVerboseParsingFormatStrings";
import { NTTemplaticEnglish, NTTemplativeStringLabels } from "./NTTemplaticParsingFormatStrings";
import { NTTemplaticParsingFormat } from "./NTTemplaticParsingFormat";
import { OTTemplaticEnglish, OTTemplativeStringLabels } from "./OTTemplaticParsingFormatStrings";
import { OTTemplaticParsingFormat } from "./OTTemplaticParsingFormat";

export type ParsingFormatId = string;

export interface ParsingFormat {
    id: ParsingFormatId;
    template: string;
    canon: Canon;
    nounParsingString(element: any): string;
    verbParsingString(element: any): string;
    toObject(): ParsingFormatObject;
    /// the requirement here is that 
    getString(key: string): string | undefined;
}

export interface ParsingFormatObject {
    id: string;
    template: string;
    translations: any;
}

export interface ParsingFormatTemplate {
    id: ParsingFormatId;
    name: string;
    canon: Canon;
    description: string;
    strings: any;
    placeholders?: any;
}

export interface StringLookup {
    [key: string]: string;
}

export function parsingFormatFromId(id: ParsingFormatId): ParsingFormatTemplate | undefined {
    for (let i = 0; i < PARSING_FORMAT_TEMPLATES.length; i++) {
        if (PARSING_FORMAT_TEMPLATES[i].id === id) {
            return PARSING_FORMAT_TEMPLATES[i];
        }
    }
    return undefined;
}

export const PARSING_FORMAT_TEMPLATES: ParsingFormatTemplate[] =
    [
        {
            id: "nt-verbose",
            name: "NT Verbose",
            canon: "NT",
            description: "Written-out Greek parsings (e.g., present active indicative 3s)",
            strings: NTVerboseStringLabels,
            placeholders: NTVerboseEnglish
        },
        {
            id: "nt-concise",
            name: "NT Concise",
            canon: "NT",
            description: "Abbreviated Greek parsings (e.g., V3SAPI, NANS)",
            strings: NTVerboseStringLabels,
            placeholders: NTConciseEnglish
        },
        {
            id: "nt-templatic",
            name: "NT Templatic",
            canon: "NT",
            description: "Similar to NT Verbose, but you can customize the template.",
            strings: NTTemplativeStringLabels,
            placeholders: NTTemplaticEnglish
        },
        {
            id: "ot-concise",
            name: "OT Concise",
            canon: "OT",
            description: "Hebrew parsings shown in a condensed format (e.g., G20 for a qal imperfect 3ms)",
            strings: OTConciseStringLabels,
            placeholders: OTBasicEnglish
        },
        {
            id: "ot-verbose",
            name: "OT Verbose",
            canon: "OT",
            description: "Hebrew parsings shown in a verbose format (e.g., qal imperfect 3ms)",
            strings: OTVerboseStringLabels,
            placeholders: OTVerboseEnglish
        },
        {
            id: "ot-templatic",
            name: "OT Templatic",
            canon: "OT",
            description: "Similar to OT Verbose, but you can customize the template.",
            strings: OTTemplativeStringLabels,
            placeholders: OTTemplaticEnglish
        },
    ];

export class ParsingFormatFactory {
    static createParsingFormat(id: string, numeralConverter: NumeralConverter, templateId: string, translations: any): ParsingFormat {
        switch (templateId) {
            case 'nt-verbose':
                return new NTVerboseParsingFormat(id, templateId, numeralConverter, translations);
            case 'ot-concise':
                return new OTConciseParsingFormat(id, templateId, numeralConverter, translations);
            case 'nt-concise':
                return new NTConciseParsingFormat(id, templateId, numeralConverter, translations);
            case 'ot-verbose':
                return new OTVerboseParsingFormat(id, templateId, numeralConverter, translations);
            case 'nt-templatic':
                return new NTTemplaticParsingFormat(id, templateId, numeralConverter, translations);
            case 'ot-templatic':
                return new OTTemplaticParsingFormat(id, templateId, numeralConverter, translations);
            default:
                throw new Error(`Unknown parsing format template: ${templateId}`);
        }
    }
}