import { ParsingFormat, ParsingFormatId } from './parsing-formats/ParsingFormat';
import { ProjectConfiguration } from './ProjectConfiguration';
import { Canon } from './VerseReference';
import latexTemplate from './assets/default_latex_template.json';
import cssTemplate from './assets/style.json';

export interface PublicationConfigurationRow {
    footnoteMarkers: string[];
    polyglossiaOtherLanguage: string;
    chapterHeader: string;
    publication_project_font: string;
    publication_biblical_font: string;
    latex_template: string;
    parsing_formats: { [key: string]: string };
    css_template: string;
    footnote_style: PublicationFootnoteStyle;
}

export type PublicationFootnoteStyle = "lettered-by-verse" | "numbered-by-page";

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

    public get latex_template(): string {
        return this._latex_template;
    }

    public get publicationProjectFont(): string {
        return this._publication_project_font;
    }

    public get css_template(): string {
        return this._css_template;
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
        let canons = this._project.canons.filter(c => !this._parsing_formats.has(c));
        return canons;
    }

    get canonsWithParsingFormats(): Canon[] {
        let canons = this._project.canons.filter(c => this._parsing_formats.has(c));
        return canons;
    }

    getParsingFormat(canon: Canon): ParsingFormat | undefined {
        let parsingFormatId = this._parsing_formats.get(canon);
        if (parsingFormatId === undefined) {
            return undefined;
        }
        return this._project.getParsingFormat(parsingFormatId)!;
    }

    getChapterHeader(chapter: number): string {
        let str = this.chapterHeader.replace("__CHAPTER__", chapter.toString());
        return this._project.replaceNumerals(str);
    }

    getFootnoteMarker(index: number): string {
        return this.footnoteMarkers[index % this.footnoteMarkers.length];
    }

    demoChapterHeader(number: string) {
        return this.chapterHeader.replace('__CHAPTER__', this.project.replaceNumerals(number));
    }

    demoFootnoteMarkers(howmany: number) {
        let markers = this.footnoteMarkers;
        let result = "";
        for (let i = 0; i < howmany; i++) {
            result += markers[i % markers.length] + ' ';
        }
        return result;
    }

    public toObject(): PublicationConfigurationRow {
        let parsing_formats: { [key: string]: string } = {};
        this._parsing_formats.forEach((value, key) => {
            parsing_formats[key] = value;
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
        };
    }

    static fromRow(row: PublicationConfigurationRow, id: string, project: ProjectConfiguration): PublicationConfiguration {
        let pc = new PublicationConfiguration(id, project);
        pc._footnoteMarkers = row.footnoteMarkers || [];
        pc._polyglossiaOtherLanguage = row.polyglossiaOtherLanguage;
        pc._chapterHeader = row.chapterHeader;
        pc.publicationProjectFont = row.publication_project_font;
        pc.publicationBiblicalFont = row.publication_biblical_font;
        pc.latex_template = row.latex_template || PublicationConfiguration.default_latex_template;
        pc.css_template = row.css_template || PublicationConfiguration.default_css_template;
        pc.footnote_style = row.footnote_style || "lettered-by-verse";
        pc._parsing_formats = new Map<Canon, ParsingFormatId>();
        for (const [key, value] of Object.entries(row.parsing_formats || [])) {
            pc._parsing_formats.set(key as Canon, value);
        }
        return pc;
    }

    static default_latex_template = latexTemplate.content;
    static default_css_template = cssTemplate.content;
}
