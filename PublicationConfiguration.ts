import { ParsingFormat, ParsingFormatId } from './parsing-formats/ParsingFormat.js';
import { ProjectConfiguration } from './ProjectConfiguration.js';
import { Canon } from './Canon.js';
import { latexTemplate } from './assets/default_latex_template.js';
import { PublicationConfigurationRow, PublicationFootnoteStyle } from './PublicationConfigurationRow.js';
import { ThresholdObject } from './ProjectConfigurationRow.js';
import { PublicationWordElement } from './publication/PublicationWordElement.js';
import { PublicationFootnoteType } from './publication/PublicationFootnoteType.js';
import { FootnoteTypeResolver } from './publication/FootnoteTypeResolver.js';

export class PublicationConfiguration {
    _project: ProjectConfiguration;

    private _id: string;
    private _footnoteMarkers: string[];
    private _polyglossiaOtherLanguage: string;
    private _chapterHeader: string;
    private _publication_project_font: string = "Charis SIL";
    private _publication_biblical_font: string = "SBL BibLit";
    private _latex_template: string;
    private _parsing_formats: Map<Canon, ParsingFormatId> = new Map<Canon, ParsingFormatId>();
    private _footnote_style: PublicationFootnoteStyle;
    private _css_template: string;
    private _frequency_thresholds: Map<Canon, number> | undefined;
    private _gloss_markdown_separator: string = ". ";
    private _footnote_type_functions: Map<Canon, FootnoteTypeResolver> = new Map<Canon, FootnoteTypeResolver>();
    private _footnote_type_function_strings: Map<Canon, string> = new Map<Canon, string>();

    constructor(id: string, project: ProjectConfiguration) {
        this._id = id;
        this._project = project;

        this._footnoteMarkers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
        this._polyglossiaOtherLanguage = "english";
        this._chapterHeader = "Chapter __CHAPTER__";
        this._footnote_style = "lettered-by-verse";
        this._latex_template = PublicationConfiguration.default_latex_template;
        this._css_template = PublicationConfiguration.default_css_template;
    }

    public get id(): string {
        return this._id;
    }

    get project(): ProjectConfiguration {
        return this._project;
    }

    get footnoteMarkers(): string[] {
        return this._footnoteMarkers;
    }

    get polyglossiaOtherLanguage(): string {
        return this._polyglossiaOtherLanguage;
    }

    get chapterHeader(): string {
        return this._chapterHeader;
    }

    get parsing_formats(): Map<Canon, ParsingFormatId> {
        return this._parsing_formats;
    }

    get frequency_thresholds(): Map<Canon, number> | undefined {
        return this._frequency_thresholds;
    }

    public get latex_template(): string {
        return this._latex_template;
    }

    public get publicationProjectFont(): string {
        return this._publication_project_font;
    }

    public get css_template(): string {
        return this._css_template;
    }

    public get gloss_markdown_separator(): string {
        return this._gloss_markdown_separator;
    }

    public set gloss_markdown_separator(value: string) {
        this._gloss_markdown_separator = value;
    }

    public set css_template(value: string) {
        this._css_template = value;
    }

    public set publicationProjectFont(font: string) {
        this._publication_project_font = font;
    }

    public get publicationBiblicalFont(): string {
        return this._publication_biblical_font;
    }

    public get footnote_style(): PublicationFootnoteStyle {
        return this._footnote_style;
    }

    public set footnote_style(value: PublicationFootnoteStyle) {
        this._footnote_style = value;
    }

    public set publicationBiblicalFont(font: string) {
        this._publication_biblical_font = font;
    }

    public set latex_template(value: string) {
        this._latex_template = value;
    }

    set footnoteMarkers(markers: string[]) {
        this._footnoteMarkers = markers;
    }

    set polyglossiaOtherLanguage(other: string) {
        this._polyglossiaOtherLanguage = other;
    }

    set chapterHeader(header: string) {
        this._chapterHeader = header;
    }

    get canonsWithoutParsingFormats(): Canon[] {
        const canons = this._project.canons.filter(c => !this._parsing_formats.has(c));
        return canons;
    }

    get canonsWithParsingFormats(): Canon[] {
        const canons = this._project.canons.filter(c => this._parsing_formats.has(c));
        return canons;
    }

    getParsingFormat(canon: Canon): ParsingFormat | undefined {
        const parsingFormatId = this._parsing_formats.get(canon);
        if (parsingFormatId === undefined) {
            return undefined;
        }
        return this._project.parsingFormats.getParsingFormatFromId(parsingFormatId);
    }

    getChapterHeader(chapter: number): string {
        const str = this.chapterHeader.replace("__CHAPTER__", chapter.toString());
        return this._project.replaceNumerals(str);
    }

    getFootnoteMarker(index: number): string {
        return this.footnoteMarkers[index % this.footnoteMarkers.length];
    }

    demoChapterHeader(number: string) {
        return this.chapterHeader.replace('__CHAPTER__', this.project.replaceNumerals(number));
    }

    demoFootnoteMarkers(howmany: number) {
        const markers = this.footnoteMarkers;
        let result = "";
        for (let i = 0; i < howmany; i++) {
            result += markers[i % markers.length] + ' ';
        }
        return result;
    }

    getFootnoteType(element: PublicationWordElement): PublicationFootnoteType {
        const f = this._footnote_type_functions.get(element.canon);
        if (f) {
            return f.getFootnoteType(element);
        } else {
            console.error(`No footnote type function for ${f}.`);
            return PublicationFootnoteType.None;
        }
    }

    getFootnoteTypeFunction(c: Canon): string | undefined {
        return this._footnote_type_function_strings.get(c);
    }

    setFootnoteTypeFunction(c: Canon, func: string) {
        return this._footnote_type_function_strings.set(c, func);
    }

    public toObject(): PublicationConfigurationRow {
        const parsing_formats: { [key: string]: string } = {};
        this._parsing_formats.forEach((value, key) => {
            parsing_formats[key] = value;
        });

        let frequency_thresholds: { [key: string]: number } | undefined = undefined;
        if (this._frequency_thresholds) {
            const ft: ThresholdObject = {};
            this._frequency_thresholds.forEach((value, key) => {
                ft[key] = value;
            });
            frequency_thresholds = ft;
        }

        const footnote_type_functions: { [key: string]: (string) } = {};
        this._footnote_type_function_strings.forEach((value, key) => {
            footnote_type_functions[key] = value;
        });

        return {
            footnoteMarkers: this._footnoteMarkers,
            polyglossiaOtherLanguage: this._polyglossiaOtherLanguage,
            chapterHeader: this._chapterHeader,
            publication_project_font: this._publication_project_font,
            publication_biblical_font: this._publication_biblical_font,
            latex_template: this._latex_template,
            parsing_formats: parsing_formats,
            css_template: this._css_template,
            footnote_style: this._footnote_style,
            frequency_thresholds: frequency_thresholds,
            gloss_markdown_separator: this._gloss_markdown_separator,
            footnote_type_functions: footnote_type_functions
        };
    }

    static fromRow(row: PublicationConfigurationRow, id: string, project: ProjectConfiguration): PublicationConfiguration {
        const pc = new PublicationConfiguration(id, project);
        pc._footnoteMarkers = row.footnoteMarkers || [];
        pc._polyglossiaOtherLanguage = row.polyglossiaOtherLanguage;
        pc._chapterHeader = row.chapterHeader || "Chapter __CHAPTER__";
        pc.publicationProjectFont = row.publication_project_font;
        pc.publicationBiblicalFont = row.publication_biblical_font;
        pc.latex_template = row.latex_template || PublicationConfiguration.default_latex_template;
        pc.css_template = row.css_template || PublicationConfiguration.default_css_template;
        pc.footnote_style = row.footnote_style || "lettered-by-verse";
        pc._parsing_formats = new Map<Canon, ParsingFormatId>();
        pc._gloss_markdown_separator = row.gloss_markdown_separator || ". ";
        for (const [key, value] of Object.entries(row.parsing_formats || [])) {
            pc._parsing_formats.set(key as Canon, value);
        }
        if (row.frequency_thresholds) {
            pc._frequency_thresholds = new Map<Canon, number>();
            for (const [key, value] of Object.entries(row.frequency_thresholds)) {
                pc._frequency_thresholds.set(key as Canon, value);
            }
        }
        for (const [key, value] of Object.entries(row.footnote_type_functions || {})) {
            const c = key as Canon;
            pc._footnote_type_function_strings.set(c, value);
            if (c == 'NT') {
                pc._footnote_type_functions.set(c, FootnoteTypeResolver.CreateNTFootnoteTypeFunction(value));
            } else if (c == 'OT') {
                pc._footnote_type_functions.set(c, FootnoteTypeResolver.CreateOTFootnoteTypeFunction(value));
            } else {
                console.error(`Unsupported custom footnote function: ${c}.`);
            }
        }
        return pc;
    }

    static default_latex_template = latexTemplate;
    static default_css_template = "";

    static default_functions = new Map([
        ['NT', `if (isVerb) {
	if (belowFrequencyThreshold) {
		return FootnoteType.ParsingGloss;
	} else if (!(mood == 'indicative' && tense == 'present')) {
		return FootnoteType.Parsing;
	} else {
		return FootnoteType.None;
	}
} if (isSubstantive) {
	if (belowFrequencyThreshold) {
		return FootnoteType.ParsingGloss;
	} else {
		return FootnoteType.None;
	}
} else {
	if (belowFrequencyThreshold) {
		return FootnoteType.Gloss;
	} else {
		return FootnoteType.None;
	}
}`],
        ['OT', `if (lex_id === 1439638 || isInteroggative) {
	return FootnoteType.None;
}
if (isVerb) {
	if (belowFrequencyThreshold) {
		return FootnoteType.ParsingGloss;
	} else {
		return FootnoteType.Parsing;
	}
} if (isSubstantive) {
	if (belowFrequencyThreshold) {
		return FootnoteType.ParsingGloss;
	} else {
		return FootnoteType.None;
	}
} else {
	if (belowFrequencyThreshold) {
		return FootnoteType.Gloss;
	} else {
		return FootnoteType.None;
	}
}`],
        ['LXX', `(currently not supported)`],
    ]);
}
