import { ParsingFormat, ParsingFormatFactory, ParsingFormatId, ParsingFormatObject } from "./parsing-formats/ParsingFormat";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Canon } from "./VerseReference";

type CanonParsingFormats = Map<ParsingFormatId, ParsingFormat>;
export type ProjectParsingFormatsObject = Partial<Record<Canon, Record<ParsingFormatId, ParsingFormatObject>>>;

export class ProjectParsingFormats {
    /// Different canons require different settings
    private _settings: Map<Canon, CanonParsingFormats> = new Map<Canon, CanonParsingFormats>();

    public addCanonSettings(canon: Canon, settings: CanonParsingFormats) {
        this._settings.set(canon, settings);
    }

    public getSettingsForCanon(canon: Canon): CanonParsingFormats | undefined {
        return this._settings.get(canon);
    }

    public isEmpty(): boolean {
        return this._settings.size === 0;
    }

    public hasFormatForCanon(canon: Canon): boolean {
        return this._settings.has(canon);
    }

    public getNumberOfConfigurations(canon: Canon): number {
        const settings = this.getSettingsForCanon(canon);
        if (settings === undefined) {
            return 0;
        } else {
            return settings.size;
        }
    }

    public getParsingFormat(canon: Canon, key: ParsingFormatId): ParsingFormat | undefined {
        const settings = this.getSettingsForCanon(canon);
        if (settings) {
            return settings.get(key);
        }
        return undefined;
    }

    public getParsingFormatFromId(key: ParsingFormatId): ParsingFormat | undefined {
        for (const canonSettings of this._settings.values()) {
            const format = canonSettings.get(key);
            if (format) {
                return format;
            }
        }
        return undefined;
    }

    public setParsingFormat(canon: Canon, key: ParsingFormatId, format: ParsingFormat) {
        let settings = this.getSettingsForCanon(canon);
        if (settings === undefined) {
            settings = new Map<ParsingFormatId, ParsingFormat>();
            this.addCanonSettings(canon, settings);
        }
        settings.set(key, format);
    }

    public removeParsingFormat(c: Canon, key: string) {
        const settings = this.getSettingsForCanon(c);
        if (settings) {
            settings.delete(key);
        }
    }

    toObject(): ProjectParsingFormatsObject {
        const obj: ProjectParsingFormatsObject = {};
        this._settings.forEach((value: CanonParsingFormats, canon: Canon) => {
            if (!Object.prototype.hasOwnProperty.call(obj, canon)) {
                obj[canon] = {};
            }
            value.forEach((value, key) => {
                obj[canon]![key] = value.toObject();
            });
        });
        return obj;
    }

    static fromObject(obj: ProjectParsingFormatsObject, project: ProjectConfiguration): ProjectParsingFormats {
        const settings = new ProjectParsingFormats();
        /// for each canon, create a map of parsing formats
        for (const key in obj) {
            const canon = key as Canon;
            const canonSettings = new Map<string, ParsingFormat>();
            const canonObj = obj[canon];
            for (const key in canonObj) {
                const settings = canonObj[key] as ParsingFormatObject;
                canonSettings.set(key, ParsingFormatFactory.createParsingFormat(settings.id, project.replaceNumerals.bind(project), settings.template, settings.translations));
            }
            settings.addCanonSettings(canon, canonSettings);
        }
        return settings;
    }

}
