import { ProjectConfiguration } from './ProjectConfiguration';

export interface PublicationConfigurationRow {
    footnoteMarkers: string[];
    polyglossiaOtherLanguage: string;
    chapterHeader: string;
    publication_project_font: string;
    publication_biblical_font: string;
    latex_template: string;
}

export class PublicationConfiguration {
    _project: ProjectConfiguration;

    private _footnoteMarkers: string[];
    private _polyglossiaOtherLanguage: string;
    private _chapterHeader: string;
    private _publication_project_font: string = "Charis SIL";
    private _publication_biblical_font: string = "SBL BibLit";
    private _latex_template: string;

    constructor(project: ProjectConfiguration) {
        this._project = project;

        this._footnoteMarkers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
        this._polyglossiaOtherLanguage = "english";
        this._chapterHeader = "Chapter __CHAPTER__";
        this._latex_template = PublicationConfiguration.default_latex_template;
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

    public get latex_template(): string {
        return this._latex_template;
    }

    public get publicationProjectFont(): string {
        return this._publication_project_font;
    }

    public set publicationProjectFont(font: string) {
        this._publication_project_font = font;
    }

    public get publicationBiblicalFont(): string {
        return this._publication_biblical_font;
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

    getChapterHeader(chapter: number): string {
        let str = this.chapterHeader.replace("__CHAPTER__", chapter.toString());
        return this._project.replaceNumerals(str);
    }

    getFootnoteMarker(index: number): string {
        return this.footnoteMarkers[index % this.footnoteMarkers.length];
    }

    public toObject(): PublicationConfigurationRow {
        return {
            footnoteMarkers: this._footnoteMarkers,
            polyglossiaOtherLanguage: this._polyglossiaOtherLanguage,
            chapterHeader: this._chapterHeader,
            publication_project_font: this._publication_project_font,
            publication_biblical_font: this._publication_biblical_font,
            latex_template: this._latex_template
        };
    }

    static fromRow(row: PublicationConfigurationRow, project: ProjectConfiguration): PublicationConfiguration {
        let pc = new PublicationConfiguration(project);
        pc._footnoteMarkers = row.footnoteMarkers || [];
        pc._polyglossiaOtherLanguage = row.polyglossiaOtherLanguage;
        pc._chapterHeader = row.chapterHeader;
        pc.publicationProjectFont = row.publication_project_font;
        pc.publicationBiblicalFont = row.publication_biblical_font;
        pc.latex_template = row.latex_template;
        return pc;
    }


    static default_latex_template = `\\documentclass{openreader}
\\title{__TITLE__}
\\date{}
\\setmainlanguage{__MAINLANGUAGE__}
\\setmainfont{__MAINLANGUAGEFONT__}
\\setotherlanguage{__BIBLICALLANGUAGE__}
__NEWFONTFAMILYCOMMAND__
\\begin{document}
\\ORBselectlanguage{__BIBLICALLANGUAGE__}
\\maketitle
\\raggedbottom 
\\fontsize{16pt}{24pt}\\selectfont
__CONTENT__
\\end{document}`;

}