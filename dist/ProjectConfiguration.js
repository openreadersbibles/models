import { CANONS } from "./Canons.js";
import { VerseReference } from "./VerseReference.js";
import { PublicationConfiguration } from "./PublicationConfiguration.js";
import { ProjectParsingFormats } from "./ProjectParsingFormats.js";
export const PROJECT_ROLES = ['admin', 'member', 'disabled'];
export class ProjectConfiguration {
    constructor(project_id) {
        this._project_title = "";
        this._project_description = "";
        this._layout_direction = "ltr";
        this._frequency_thresholds = new Map();
        this._bookNames = new Map();
        this._canons = [];
        this._roles = new Map();
        this._allow_joins = true;
        this._font_families = "";
        this._parsingFormats = new ProjectParsingFormats();
        // private _latex_templates: Map<string, string> = new Map<string, string>();
        this._publication_configurations = new Map();
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
    get layout_direction() {
        return this._layout_direction;
    }
    get title() {
        return this._project_title;
    }
    get description() {
        return this._project_description;
    }
    get allow_joins() {
        return this._allow_joins;
    }
    get id() {
        return this._project_id;
    }
    get canons() {
        return this._canons;
    }
    get parsingFormats() {
        return this._parsingFormats;
    }
    get font_families() {
        return this._font_families;
    }
    get font_size() {
        return this._font_size;
    }
    get numerals() {
        return this._numerals;
    }
    set project_id(value) {
        this._project_id = value;
    }
    set title(value) {
        this._project_title = value;
    }
    set description(value) {
        this._project_description = value;
    }
    set allow_joins(value) {
        this._allow_joins = value;
    }
    set layout_direction(value) {
        this._layout_direction = value;
    }
    set frequency_thresholds(value) {
        this._frequency_thresholds = value;
    }
    set bookNames(value) {
        this._bookNames = value;
    }
    get bookNames() {
        return this._bookNames;
    }
    set canons(value) {
        this._canons = value;
    }
    get members() {
        return Array.from(this._roles.keys());
    }
    set font_families(ff) {
        this._font_families = ff;
    }
    set font_size(size) {
        this._font_size = size;
    }
    set numerals(numerals) {
        this._numerals = numerals;
    }
    replaceNumerals(str) {
        return ProjectConfiguration.performNumeralReplacement(str, this._numerals);
    }
    member(user_id) {
        return this._roles.get(user_id);
    }
    setMember(member) {
        this._roles.set(member.user_id, member);
    }
    userRole(user_id) {
        return this._roles.get(user_id)?.user_role;
    }
    hasCanon(canon) {
        return this._canons.indexOf(canon) !== -1;
    }
    fallbackCanon() {
        return this._canons[0];
    }
    getFrequencyThreshold(canon) {
        /// default to 50 (mostly just to satisfy typescript)
        return this._frequency_thresholds.get(canon) || 50;
    }
    formatVerseReference(ref) {
        return `${this.getBookName(ref.ubs_book)} ${ref.chapter}:${ref.verse}`;
    }
    getBookName(book) {
        return this._bookNames.get(book) || `[Unknown: ${book}]`;
    }
    static performNumeralReplacement(str, numerals) {
        if (numerals.length === 10) {
            for (let i = 0; i < 10; i++) {
                str = str.replace(new RegExp(i.toString(), "g"), numerals[i]);
            }
        }
        else {
            console.error("Numerals array is not of length 10", numerals);
        }
        return str;
    }
    setParsingFormat(value) {
        this.parsingFormats.setParsingFormat(value.canon, value.id, value);
    }
    get repositoryName() {
        return ProjectConfiguration.getRepositoryName(this._project_id);
    }
    get publicationUrl() {
        return `https://openreadersbibles.github.io/${this.repositoryName}`;
    }
    deepCopy() {
        return ProjectConfiguration.fromRow(this.toObject());
    }
    static getRepositoryName(project_id) {
        return `pub-${project_id}`;
    }
    ;
    get publicationConfigurations() {
        return this._publication_configurations;
    }
    toObject() {
        const thresholds = {};
        for (const [canon, threshold] of this._frequency_thresholds) {
            thresholds[canon] = threshold;
        }
        const bookNames = {};
        for (const [book, name] of this._bookNames) {
            bookNames[book] = name;
        }
        const roles = [];
        for (const role of this._roles.values()) {
            roles.push(role);
        }
        const configurations = {};
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
        };
    }
    static fromRow(row) {
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
                pc._frequency_thresholds.set(canon, row.frequency_thresholds[canon]);
            }
        }
        for (const code in row.bookNames) {
            if (Object.prototype.hasOwnProperty.call(row.bookNames, code)) {
                pc._bookNames.set(code, row.bookNames[code]);
            }
        }
        pc._canons = row.canons;
        for (const role of row.roles) {
            pc._roles.set(role.user_id, role);
        }
        for (const key in row.publication_configurations) {
            if (Object.prototype.hasOwnProperty.call(row.publication_configurations, key)) {
                pc.publicationConfigurations.set(key, PublicationConfiguration.fromRow(row.publication_configurations[key], key, pc));
            }
        }
        return pc;
    }
}
ProjectConfiguration.Default = "default";
//# sourceMappingURL=ProjectConfiguration.js.map