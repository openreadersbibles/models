export function OTGenderToEnglish(gender) {
    switch (gender) {
        case "NA": return "NA";
        case "f": return "feminine";
        case "m": return "masculine";
        case "unknown": return "unknown";
    }
}
export function OTGrammaticalNumberToEnglish(number) {
    switch (number) {
        case "NA": return "NA";
        case "sg": return "singular";
        case "pl": return "plural";
        case "unknown": return "unknown";
        case "du": return "dual";
    }
}
export function OTStateToEnglish(state) {
    switch (state) {
        case "NA": return "NA";
        case "a": return "absolute";
        case "c": return "construct";
        case "e": return "emphatic";
    }
}
export function OTTenseToEnglish(tense) {
    switch (tense) {
        case "NA": return "NA";
        case "perf": return "perfect";
        case "ptca": return "participle";
        case "wayq": return "wayyiqtol";
        case "impf": return "imperfect";
        case "infc": return "infinitive construct";
        case "impv": return "imperative";
        case "infa": return "infinitive absolute";
        case "ptcp": return "participle";
    }
}
export function OTVerbStemToEnglish(stem) {
    switch (stem) {
        case "NA": return "NA";
        case "qal": return "qal";
        case "piel": return "piel";
        case "hif": return "hifil";
        case "nif": return "nifal";
        case "pual": return "pual";
        case "hit": return "hitpael";
        case "hof": return "hofal";
        case "hsht": return "hithpael";
        case "pasq": return "pausal";
        case "hotp": return "hophal";
        case "nit": return "niphal";
        case "poal": return "poal";
        case "poel": return "poel";
        case "htpo": return "hithpoel";
        case "peal": return "peal";
        case "tif": return "tiferet";
        case "etpa": return "etpaal";
        case "pael": return "pael";
        case "haf": return "hafel";
        case "htpe": return "hithpeel";
        case "htpa": return "hithpaal";
        case "peil": return "peil";
        case "etpe": return "etpeel";
        case "afel": return "afel";
        case "shaf": return "shafel";
    }
}
export function OTPersonToEnglish(person) {
    switch (person) {
        case "NA": return "NA";
        case "p1": return "first person";
        case "p2": return "second person";
        case "p3": return "third person";
        case "unknown": return "unknown";
    }
}
export function OTPartOfSpeechToEnglish(partOfSpeech) {
    switch (partOfSpeech) {
        case "prep": return "preposition";
        case "subs": return "noun";
        case "verb": return "verb";
        case "art": return "article";
        case "conj": return "conjunction";
        case "advb": return "adverb";
        case "adjv": return "adjective";
        case "intj": return "interjection";
        case "prde": return "demonstrative pronoun";
        case "nmpr": return "proper noun";
        case "nega": return "negative particle";
        case "prps": return " 	personal pronoun";
        case "prin": return "interrogative pronoun";
        case "inrg": return "interrogative particle";
    }
}
//# sourceMappingURL=HebrewWordRow.js.map