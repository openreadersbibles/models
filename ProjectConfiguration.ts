import { CANONS } from "./Canons.js";
import { UserId } from "./UserProfile.js";
import { VerseReference } from "./VerseReference.js";
import { PublicationConfiguration } from "./PublicationConfiguration.js";
import { ProjectParsingFormats } from "./ProjectParsingFormats.js";
import { Canon } from "./Canon.js";
import { UbsBook } from "./UbsBook.js";
import { GlossSuggestionMode, LayoutDirection, ProjectConfigurationRow, ProjectRole, ProjectRoleRow } from "./ProjectConfigurationRow.js";
import { PublicationConfigurationRow } from "./PublicationConfigurationRow.js";
import { z } from "zod";

interface ThresholdObject {
    [key: string]: number;
}

interface BooknamesObject {
    [key: string]: string;
}

export const PROJECT_ROLES: ProjectRole[] = ['admin', 'member', 'disabled'];

export const ProjectIdSchema = z.string();
export type ProjectId = z.infer<typeof ProjectIdSchema>;

export class ProjectConfiguration {
    static Default = "default";
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
    private _parsingFormats: ProjectParsingFormats = new ProjectParsingFormats();
    private _numerals: string[];
    private _glossSuggestionMode: GlossSuggestionMode = "byBinyanOrVoice";

    // private _latex_templates: Map<string, string> = new Map<string, string>();
    private _publication_configurations: Map<string, PublicationConfiguration> = new Map<string, PublicationConfiguration>();

    constructor(project_id: string) {
        this._project_id = project_id;
        /// it's better to have default books names
        this.initializeBookNamesToLatin();
        this._canons = ["OT", "NT"];
        this._frequency_thresholds.set("NT", 30);
        this._frequency_thresholds.set("OT", 50);
        this._numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        /// ensure that there is a default publication configuration
        this._publication_configurations.set(ProjectConfiguration.Default, new PublicationConfiguration(ProjectConfiguration.Default, this));
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

    /// alias
    get project_id(): ProjectId {
        return this._project_id;
    }
    get canons(): Canon[] {
        return this._canons;
    }

    get parsingFormats(): ProjectParsingFormats {
        return this._parsingFormats;
    }

    get font_families(): string {
        return this._font_families;
    }

    get font_size(): number | undefined {
        return this._font_size;
    }

    get numerals(): string[] {
        return this._numerals;
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

    get frequency_thresholds() {
        return this._frequency_thresholds;
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

    set numerals(numerals: string[]) {
        this._numerals = numerals;
    }

    get glossSuggestionMode(): GlossSuggestionMode {
        return this._glossSuggestionMode;
    }

    set glossSuggestionMode(mode: GlossSuggestionMode) {
        this._glossSuggestionMode = mode;
    }

    replaceNumerals(str: string): string {
        return ProjectConfiguration.performNumeralReplacement(str, this._numerals);
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

    get repositoryName(): string {
        return ProjectConfiguration.getRepositoryName(this._project_id);
    }

    get publicationUrl(): string {
        return `https://openreadersbibles.github.io/${this.repositoryName}`;
    }

    public deepCopy(): ProjectConfiguration {
        return ProjectConfiguration.fromRow(this.toObject());
    }

    static getRepositoryName(project_id: string): string {
        return `pub-${project_id}`;
    };

    public get publicationConfigurations(): Map<string, PublicationConfiguration> {
        return this._publication_configurations;
    }

    public isPowerUser(user_id: UserId): boolean {
        const role = this._roles.get(user_id);
        return role ? role.power_user === 1 : false;
    }

    public toObject(): ProjectConfigurationRow {
        const thresholds: ThresholdObject = {};
        for (const [canon, threshold] of this._frequency_thresholds) {
            thresholds[canon] = threshold;
        }
        const bookNames: BooknamesObject = {};
        for (const [book, name] of this._bookNames) {
            bookNames[book] = name;
        }
        const roles: ProjectRoleRow[] = [];
        for (const role of this._roles.values()) {
            roles.push(role);
        }
        const configurations: { [key: string]: PublicationConfigurationRow } = {};
        this._publication_configurations.forEach((value, key) => {
            configurations[key] = value.toObject();
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
            parsing_formats: this._parsingFormats.toObject(),
            publication_configurations: configurations,
            numerals: this._numerals,
            glossSuggestionMode: this._glossSuggestionMode,
        };
    }

    static fromRow(row: ProjectConfigurationRow): ProjectConfiguration {
        const pc = new ProjectConfiguration(row.project_id);
        pc._project_title = row.project_title;
        pc._project_description = row.project_description;
        pc._layout_direction = row.layout_direction;
        pc._allow_joins = row.allow_joins;
        pc._font_families = row.font_families;
        pc._font_size = row.font_size;
        pc._numerals = row.numerals || [];
        pc._parsingFormats = ProjectParsingFormats.fromObject(row.parsing_formats, pc);
        for (const canon in row.frequency_thresholds) {
            if (Object.prototype.hasOwnProperty.call(row.frequency_thresholds, canon)) {
                pc._frequency_thresholds.set(canon as Canon, row.frequency_thresholds[canon]);
            }
        }
        for (const code in row.bookNames) {
            if (Object.prototype.hasOwnProperty.call(row.bookNames, code)) {
                pc._bookNames.set(code as UbsBook, row.bookNames[code])
            }
        }
        pc._canons = row.canons as Canon[];
        for (const role of row.roles) {
            pc._roles.set(role.user_id, role);
        }
        if (row.publication_configurations) {
            for (const key in row.publication_configurations) {
                if (Object.prototype.hasOwnProperty.call(row.publication_configurations, key)) {
                    pc.publicationConfigurations.set(key, PublicationConfiguration.fromRow(row.publication_configurations[key], key, pc));
                }
            }
        }
        pc._glossSuggestionMode = row.glossSuggestionMode || 'byBinyanOrVoice';
        return pc;
    }

}