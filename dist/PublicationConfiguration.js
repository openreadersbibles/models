// import latexTemplate from './assets/default_latex_template.json' with { type: "json" };
// import cssTemplate from './assets/style.json' with { type: "json" };
import latexTemplate from './assets/default_latex_template.json';
import cssTemplate from './assets/style.json';
export class PublicationConfiguration {
    constructor(id, project) {
        this._publication_project_font = "Charis SIL";
        this._publication_biblical_font = "SBL BibLit";
        this._parsing_formats = new Map();
        this._id = id;
        this._project = project;
        this._footnoteMarkers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"];
        this._polyglossiaOtherLanguage = "english";
        this._chapterHeader = "Chapter __CHAPTER__";
        this._footnote_style = "lettered-by-verse";
        this._latex_template = PublicationConfiguration.default_latex_template;
        this._css_template = PublicationConfiguration.default_css_template;
    }
    get id() {
        return this._id;
    }
    get project() {
        return this._project;
    }
    get footnoteMarkers() {
        return this._footnoteMarkers;
    }
    get polyglossiaOtherLanguage() {
        return this._polyglossiaOtherLanguage;
    }
    get chapterHeader() {
        return this._chapterHeader;
    }
    get parsing_formats() {
        return this._parsing_formats;
    }
    get latex_template() {
        return this._latex_template;
    }
    get publicationProjectFont() {
        return this._publication_project_font;
    }
    get css_template() {
        return this._css_template;
    }
    set css_template(value) {
        this._css_template = value;
    }
    set publicationProjectFont(font) {
        this._publication_project_font = font;
    }
    get publicationBiblicalFont() {
        return this._publication_biblical_font;
    }
    get footnote_style() {
        return this._footnote_style;
    }
    set footnote_style(value) {
        this._footnote_style = value;
    }
    set publicationBiblicalFont(font) {
        this._publication_biblical_font = font;
    }
    set latex_template(value) {
        this._latex_template = value;
    }
    set footnoteMarkers(markers) {
        this._footnoteMarkers = markers;
    }
    set polyglossiaOtherLanguage(other) {
        this._polyglossiaOtherLanguage = other;
    }
    set chapterHeader(header) {
        this._chapterHeader = header;
    }
    get canonsWithoutParsingFormats() {
        const canons = this._project.canons.filter(c => !this._parsing_formats.has(c));
        return canons;
    }
    get canonsWithParsingFormats() {
        const canons = this._project.canons.filter(c => this._parsing_formats.has(c));
        return canons;
    }
    getParsingFormat(canon) {
        const parsingFormatId = this._parsing_formats.get(canon);
        if (parsingFormatId === undefined) {
            return undefined;
        }
        return this._project.parsingFormats.getParsingFormatFromId(parsingFormatId);
    }
    getChapterHeader(chapter) {
        const str = this.chapterHeader.replace("__CHAPTER__", chapter.toString());
        return this._project.replaceNumerals(str);
    }
    getFootnoteMarker(index) {
        return this.footnoteMarkers[index % this.footnoteMarkers.length];
    }
    demoChapterHeader(number) {
        return this.chapterHeader.replace('__CHAPTER__', this.project.replaceNumerals(number));
    }
    demoFootnoteMarkers(howmany) {
        const markers = this.footnoteMarkers;
        let result = "";
        for (let i = 0; i < howmany; i++) {
            result += markers[i % markers.length] + ' ';
        }
        return result;
    }
    toObject() {
        const parsing_formats = {};
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
    static fromRow(row, id, project) {
        const pc = new PublicationConfiguration(id, project);
        pc._footnoteMarkers = row.footnoteMarkers || [];
        pc._polyglossiaOtherLanguage = row.polyglossiaOtherLanguage;
        pc._chapterHeader = row.chapterHeader;
        pc.publicationProjectFont = row.publication_project_font;
        pc.publicationBiblicalFont = row.publication_biblical_font;
        pc.latex_template = row.latex_template || PublicationConfiguration.default_latex_template;
        pc.css_template = row.css_template || PublicationConfiguration.default_css_template;
        pc.footnote_style = row.footnote_style || "lettered-by-verse";
        pc._parsing_formats = new Map();
        for (const [key, value] of Object.entries(row.parsing_formats || [])) {
            pc._parsing_formats.set(key, value);
        }
        return pc;
    }
}
PublicationConfiguration.default_latex_template = latexTemplate.content;
PublicationConfiguration.default_css_template = cssTemplate.content;
//# sourceMappingURL=PublicationConfiguration.js.map