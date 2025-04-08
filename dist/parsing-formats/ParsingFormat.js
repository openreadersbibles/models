import { NTConciseParsingFormat } from "./NTConciseParsingFormat.js";
import { NTConciseEnglish } from "./NTConciseParsingFormatStrings.js";
import { NTVerboseParsingFormat } from "./NTVerboseParsingFormat.js";
import { NTVerboseEnglish, NTVerboseStringLabels } from "./NTVerboseParsingFormatStrings.js";
import { OTConciseParsingFormat } from "./OTConciseParsingFormat.js";
import { OTBasicEnglish, OTConciseStringLabels } from "./OTConciseParsingFormatStrings.js";
import { OTVerboseParsingFormat } from "./OTVerboseParsingFormat.js";
import { OTVerboseEnglish, OTVerboseStringLabels } from "./OTVerboseParsingFormatStrings.js";
import { NTTemplaticEnglish, NTTemplativeStringLabels } from "./NTTemplaticParsingFormatStrings.js";
import { NTTemplaticParsingFormat } from "./NTTemplaticParsingFormat.js";
import { OTTemplaticEnglish, OTTemplativeStringLabels } from "./OTTemplaticParsingFormatStrings.js";
import { OTTemplaticParsingFormat } from "./OTTemplaticParsingFormat.js";
export function parsingFormatFromId(id) {
    for (let i = 0; i < PARSING_FORMAT_TEMPLATES.length; i++) {
        if (PARSING_FORMAT_TEMPLATES[i].id === id) {
            return PARSING_FORMAT_TEMPLATES[i];
        }
    }
    return undefined;
}
export const PARSING_FORMAT_TEMPLATES = [
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
    static createParsingFormat(id, numeralConverter, templateId, translations) {
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
//# sourceMappingURL=ParsingFormat.js.map