import { ParsingFormat, ParsingFormatFactory, ParsingFormatId, ParsingFormatObject } from "./parsing-formats/ParsingFormat";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Canon } from "./VerseReference";

type CanonPublicationSettings = Map<ParsingFormatId, ParsingFormat>;

export class ProjectPublicationSettings {
    /// Different canons require different settings
    private _settings: Map<Canon, CanonPublicationSettings> = new Map<Canon, CanonPublicationSettings>();

    public addCanonSettings(canon: Canon, settings: CanonPublicationSettings) {
        this._settings.set(canon, settings);
    }

    public getSettingsForCanon(canon: Canon): CanonPublicationSettings | undefined {
        return this._settings.get(canon);
    }

    public getNumberOfConfigurations(canon: Canon): number {
        let settings = this.getSettingsForCanon(canon);
        if (settings === undefined) {
            return 0;
        } else {
            return settings.size;
        }
    }

    public getParsingFormat(canon: Canon, key: ParsingFormatId): ParsingFormat | undefined {
        let settings = this.getSettingsForCanon(canon);
        if (settings) {
            return settings.get(key);
        }
        return undefined;
    }

    public getParsingFormatFromId(key: ParsingFormatId): ParsingFormat | undefined {
        for (let canonSettings of this._settings.values()) {
            let format = canonSettings.get(key);
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
        let settings = this.getSettingsForCanon(c);
        if (settings) {
            settings.delete(key);
        }
    }

    toObject(): any {
        let obj: any = {};
        this._settings.forEach((value: CanonPublicationSettings, canon: Canon) => {
            if (!obj.hasOwnProperty(canon)) {
                obj[canon] = {};
            }
            value.forEach((value, key) => {
                obj[canon][key] = value.toObject();
            });
        });
        return obj;
    }

    static fromObject(obj: any, project: ProjectConfiguration): ProjectPublicationSettings {
        let settings = new ProjectPublicationSettings();
        for (let key in obj) {
            let canon = key as Canon;
            let canonSettings = new Map<string, ParsingFormat>();
            let canonObj = obj[key];
            for (let key in canonObj) {
                let settings = canonObj[key] as ParsingFormatObject;
                canonSettings.set(key, ParsingFormatFactory.createParsingFormat(settings.id, project.replaceNumerals.bind(project), settings.template, settings.translations));
            }
            settings.addCanonSettings(canon, canonSettings);
        }
        return settings;
    }

}
