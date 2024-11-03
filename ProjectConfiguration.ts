import { CANONS } from "./Canons";
import { UserId } from "./UserProfile";
import { Canon, UbsBook, VerseReference } from "./VerseReference";
import { ProjectPublicationSettings } from "./ProjectPublicationSettings";
import { ParsingFormat } from "./parsing-formats/ParsingFormat";

interface ThresholdObject {
    [key: string]: number;
}

interface BooknamesObject {
    [key: string]: string;
}

export type ProjectRole = 'admin' | 'member' | 'disabled';
export const PROJECT_ROLES: ProjectRole[] = ['admin', 'member', 'disabled'];

export interface ProjectRoleRow {
    user_id: string,
    user_role: ProjectRole;
    power_user: 1 | 0;
}

export interface ProjectDescription {
    project_id: ProjectId;
    project_title: string;
    project_description: string;
    allow_joins: boolean;
}

export type ProjectId = string;
export type LayoutDirection = "ltr" | "rtl";

export interface ProjectConfigurationRow {
    project_id: ProjectId;
    project_title: string;
    project_description: string;
    layout_direction: LayoutDirection;
    frequency_thresholds: any;
    bookNames: any;
    canons: any;
    roles: ProjectRoleRow[];
    allow_joins: boolean;
    font_families: string;
    font_size: number | undefined;
    publication_configurations: any;
    footnoteMarkers: string[];
    polyglossiaOtherLanguage: string;
    chapterHeader: string;
    numerals: string[];
    publication_project_font: string;
    publication_biblical_font: string;
    latex_templates: { [key: string]: string };
}

export class ProjectConfiguration {
    private _project_id: ProjectId;
    private _project_title: string = "";
    private _project_description: string = "";
    private _layout_direction: LayoutDirection = "ltr";
    private _frequency_thresholds: Map<Canon, number> = new Map<Canon, number>();
    private _bookNames: Map<UbsBook, string> = new Map<UbsBook, string>();
    private _canons: Canon[] = [];
    private _roles: Map<UserId, ProjectRoleRow> = new Map<UserId, ProjectRoleRow>();
    private _allow_joins: boolean = true;
    private _font_families: string = "";
    private _font_size: number | undefined;
    private _publicationSettings: ProjectPublicationSettings = new ProjectPublicationSettings();

    private _footnoteMarkers: string[];
    private _polyglossiaOtherLanguage: string;
    private _chapterHeader: string;
    private _numerals: string[];

    private _publication_project_font: string = "Charis SIL";
    private _publication_biblical_font: string = "SBL BibLit";

    private _latex_templates: Map<string, string> = new Map<string, string>();

    constructor(project_id: string) {
        this._project_id = project_id;
        /// it's better to have default books names
        this.initializeBookNamesToLatin();
        this._canons = ["OT", "NT"];
        this._frequency_thresholds.set("NT", 30);
        this._frequency_thresholds.set("OT", 50);

        this._footnoteMarkers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
        this._polyglossiaOtherLanguage = "english";
        this._numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this._chapterHeader = "Chapter __CHAPTER__";
    }

    initializeBookNamesToLatin() {
        CANONS.forEach(canon => {
            canon.books.forEach(book => {
                this._bookNames.set(book, VerseReference.ubsBookToLatin(book));
            });
        });
    }

    get layout_direction(): LayoutDirection {
        return this._layout_direction;
    }

    get title(): string {
        return this._project_title;
    }

    get description(): string {
        return this._project_description;
    }

    get allow_joins(): boolean {
        return this._allow_joins;
    }

    get id(): ProjectId {
        return this._project_id;
    }

    get canons(): Canon[] {
        return this._canons;
    }

    get publicationSettings(): ProjectPublicationSettings {
        return this._publicationSettings;
    }

    get font_families(): string {
        return this._font_families;
    }
    get font_size(): number | undefined {
        return this._font_size;
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

    get numerals(): string[] {
        return this._numerals;
    }

    public getLatexTemplate(id: string): string | undefined {
        return this._latex_templates.get(id);
    }

    set latex_templates(value: Map<string, string>) {
        this._latex_templates = value;
    }

    get latex_templates(): Map<string, string> {
        return this._latex_templates;
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

    set numerals(numerals: string[]) {
        this._numerals = numerals;
    }

    set project_id(value: ProjectId) {
        this._project_id = value;
    }

    set title(value: string) {
        this._project_title = value;
    }

    set description(value: string) {
        this._project_description = value;
    }

    set allow_joins(value: boolean) {
        this._allow_joins = value;
    }

    set layout_direction(value: LayoutDirection) {
        this._layout_direction = value;
    }

    set frequency_thresholds(value: Map<Canon, number>) {
        this._frequency_thresholds = value;
    }

    set bookNames(value: Map<UbsBook, string>) {
        this._bookNames = value;
    }

    get bookNames(): Map<UbsBook, string> {
        return this._bookNames;
    }

    set canons(value: Canon[]) {
        this._canons = value;
    }

    get members(): UserId[] {
        return Array.from(this._roles.keys());
    }

    set font_families(ff: string) {
        this._font_families = ff;
    }

    set font_size(size: number | undefined) {
        this._font_size = size;
    }

    setLatexTemplate(id: string, template: string) {
        this._latex_templates.set(id, template);
    }

    member(user_id: UserId): ProjectRoleRow | undefined {
        return this._roles.get(user_id);
    }

    setMember(member: ProjectRoleRow) {
        this._roles.set(member.user_id, member);
    }

    userRole(user_id: UserId): ProjectRole | undefined {
        return this._roles.get(user_id)?.user_role;
    }

    hasCanon(canon: Canon) {
        return this._canons.indexOf(canon) !== -1;
    }

    fallbackCanon(): Canon {
        return this._canons[0];
    }

    getFrequencyThreshold(canon: Canon): number {
        /// default to 50 (mostly just to satisfy typescript)
        return this._frequency_thresholds.get(canon) || 50;
    }

    public formatVerseReference(ref: VerseReference): string {
        return `${this.getBookName(ref.ubs_book)} ${ref.chapter}:${ref.verse}`;
    }

    public getBookName(book: UbsBook): string {
        return this._bookNames.get(book) || `[Unknown: ${book}]`;
    }

    getChapterHeader(chapter: number): string {
        let str = this.chapterHeader.replace("__CHAPTER__", chapter.toString());
        return this.replaceNumerals(str);
    }

    replaceNumerals(str: string): string {
        return ProjectConfiguration.performNumeralReplacement(str, this._numerals);
    }

    static performNumeralReplacement(str: string, numerals: string[]): string {
        if (numerals.length === 10) {
            for (let i = 0; i < 10; i++) {
                str = str.replace(new RegExp(i.toString(), "g"), numerals[i]);
            }
        } else {
            console.error("Numerals array is not of length 10", numerals);
        }
        return str;
    }

    getFootnoteMarker(index: number): string {
        return this.footnoteMarkers[index % this.footnoteMarkers.length];
    }

    getParsingFormat(key: string): ParsingFormat | undefined {
        return this._publicationSettings.getParsingFormat(this.fallbackCanon(), key);
    }

    setParsingFormat(value: ParsingFormat) {
        this._publicationSettings.setParsingFormat(value.canon, value.id, value);
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

    get repositoryName(): string {
        return ProjectConfiguration.getRepositoryName(this._project_id);
    }

    public repositoryNameForTemplate(templateId: string | undefined): string {
        if (templateId === undefined) {
            return this.repositoryName;
        } else {
            return `${this.repositoryName}-${templateId}`;
        }
    }

    static getRepositoryName(project_id: string): string {
        return `pub-${project_id}`;
    };

    static default_latex_template = `\\documentclass{openreader}
\\title{__TITLE__}
\\date{}
\\setmainlanguage{__MAINLANGUAGE__}
\\setmainfont{__MAINLANGUAGEFONT__}
\\setotherlanguage{__BIBLICALLANGUAGE__}
__NEWFONTFAMILYCOMMAND__
\\begin{document}
\\selectlanguage{__BIBLICALLANGUAGE__}
\\maketitle
\\raggedbottom 
\\fontsize{16pt}{24pt}\\selectfont
__CONTENT__
\\end{document}`;

    public toObject(): ProjectConfigurationRow {
        let thresholds: ThresholdObject = {};
        for (let [canon, threshold] of this._frequency_thresholds) {
            thresholds[canon] = threshold;
        }
        let bookNames: BooknamesObject = {};
        for (let [book, name] of this._bookNames) {
            bookNames[book] = name;
        }
        let roles: ProjectRoleRow[] = [];
        for (let [userId, role] of this._roles) {
            roles.push(role);
        }
        let templates: { [key: string]: string } = {};
        this._latex_templates.forEach((value, key) => {
            templates[key] = value;
        });
        return {
            project_id: this._project_id,
            project_title: this._project_title,
            project_description: this._project_description,
            layout_direction: this._layout_direction,
            frequency_thresholds: thresholds,
            bookNames: bookNames,
            canons: this._canons,
            roles: roles,
            allow_joins: this._allow_joins,
            font_families: this._font_families,
            font_size: this._font_size,
            publication_configurations: this._publicationSettings.toObject(),
            footnoteMarkers: this._footnoteMarkers,
            polyglossiaOtherLanguage: this._polyglossiaOtherLanguage,
            chapterHeader: this._chapterHeader,
            numerals: this._numerals,
            publication_project_font: this._publication_project_font,
            publication_biblical_font: this._publication_biblical_font,
            latex_templates: templates
        };
    }

    static fromRow(row: ProjectConfigurationRow): ProjectConfiguration {
        let pc = new ProjectConfiguration(row.project_id);
        pc._project_title = row.project_title;
        pc._project_description = row.project_description;
        pc._layout_direction = row.layout_direction;
        pc._allow_joins = row.allow_joins;
        pc._font_families = row.font_families;
        pc._font_size = row.font_size;
        pc._publicationSettings = ProjectPublicationSettings.fromObject(row.publication_configurations, pc);
        for (let canon in row.frequency_thresholds) {
            if (row.frequency_thresholds.hasOwnProperty(canon)) {
                pc._frequency_thresholds.set(canon as Canon, row.frequency_thresholds[canon]);
            }
        }
        for (let code in row.bookNames) {
            if (row.bookNames.hasOwnProperty(code)) {
                pc._bookNames.set(code as UbsBook, row.bookNames[code])
            }
        }
        pc._canons = row.canons as Canon[];
        for (let role of row.roles) {
            pc._roles.set(role.user_id, role);
        }
        for (let key in row.latex_templates) {
            if (row.latex_templates.hasOwnProperty(key)) {
                pc._latex_templates.set(key, row.latex_templates[key]);
            }
        }
        pc._footnoteMarkers = row.footnoteMarkers || [];
        pc._polyglossiaOtherLanguage = row.polyglossiaOtherLanguage;
        pc._chapterHeader = row.chapterHeader;
        pc._numerals = row.numerals || [];
        pc.publicationProjectFont = row.publication_project_font;
        pc.publicationBiblicalFont = row.publication_biblical_font;
        return pc;
    }

}