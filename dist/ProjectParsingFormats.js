import { ParsingFormatFactory } from "./parsing-formats/ParsingFormat.js";
export class ProjectParsingFormats {
    constructor() {
        /// Different canons require different settings
        this._settings = new Map();
    }
    addCanonSettings(canon, settings) {
        this._settings.set(canon, settings);
    }
    getSettingsForCanon(canon) {
        return this._settings.get(canon);
    }
    isEmpty() {
        return this._settings.size === 0;
    }
    hasFormatForCanon(canon) {
        return this._settings.has(canon);
    }
    getNumberOfConfigurations(canon) {
        const settings = this.getSettingsForCanon(canon);
        if (settings === undefined) {
            return 0;
        }
        else {
            return settings.size;
        }
    }
    getParsingFormat(canon, key) {
        const settings = this.getSettingsForCanon(canon);
        if (settings) {
            return settings.get(key);
        }
        return undefined;
    }
    getParsingFormatFromId(key) {
        for (const canonSettings of this._settings.values()) {
            const format = canonSettings.get(key);
            if (format) {
                return format;
            }
        }
        return undefined;
    }
    setParsingFormat(canon, key, format) {
        let settings = this.getSettingsForCanon(canon);
        if (settings === undefined) {
            settings = new Map();
            this.addCanonSettings(canon, settings);
        }
        settings.set(key, format);
    }
    removeParsingFormat(c, key) {
        const settings = this.getSettingsForCanon(c);
        if (settings) {
            settings.delete(key);
        }
    }
    toObject() {
        const obj = {};
        this._settings.forEach((value, canon) => {
            if (!Object.prototype.hasOwnProperty.call(obj, canon)) {
                obj[canon] = {};
            }
            value.forEach((value, key) => {
                obj[canon][key] = value.toObject();
            });
        });
        return obj;
    }
    static fromObject(obj, project) {
        const settings = new ProjectParsingFormats();
        /// for each canon, create a map of parsing formats
        for (const key in obj) {
            const canon = key;
            const canonSettings = new Map();
            const canonObj = obj[canon];
            for (const key in canonObj) {
                const settings = canonObj[key];
                canonSettings.set(key, ParsingFormatFactory.createParsingFormat(settings.id, project.replaceNumerals.bind(project), settings.template, settings.translations));
            }
            settings.addCanonSettings(canon, canonSettings);
        }
        return settings;
    }
}
//# sourceMappingURL=ProjectParsingFormats.js.map