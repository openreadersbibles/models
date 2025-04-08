import { NTVerboseEnglish, NTVerbosePersian, NTVerboseStringLabels } from "./NTVerboseParsingFormatStrings.js";
export const NTTemplativeStringLabels = {
    noun_template: "Noun Template",
    infinitive_template: "Infinitive Template",
    participle_template: "Participle Template",
    finite_verb_template: "Finite Verb Template",
    ...NTVerboseStringLabels
};
export const NTTemplaticEnglish = {
    ...NTVerboseEnglish,
    noun_template: '__CASE__ __GENDER__ __NUMBER__',
    infinitive_template: '__TENSE__ __VOICE__ __INFINITIVE__',
    participle_template: '__TENSE__ __VOICE__ __PARTICIPLE__ __CASE__ __GENDER__ __NUMBER__',
    finite_verb_template: '__TENSE__ __VOICE__ __MOOD__ __PERSON__ __NUMBER__',
};
export const NTTemplaticPersian = {
    ...NTVerbosePersian,
    noun_template: '__CASE__ __GENDER__ __NUMBER__',
    infinitive_template: '__TENSE__ __VOICE__ __INFINITIVE__',
    participle_template: '__TENSE__ __VOICE__ __PARTICIPLE__ __CASE__ __GENDER__ __NUMBER__',
    finite_verb_template: '__TENSE__ __VOICE__ __MOOD__ __PERSON__ __NUMBER__',
};
//# sourceMappingURL=NTTemplaticParsingFormatStrings.js.map