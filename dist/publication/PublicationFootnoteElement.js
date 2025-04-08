/// This class represents part of the footnote of a publication. 
/// It contains the text of the footnote and the markers that are used to reference it in the publication.
/// Multiple markers are possible, for instance, if two words with the same root occur in the footnote text.
export class PublicationFootnoteElement {
    constructor(marker, text) {
        this._markers = new Array();
        this._text = "";
        this._markers.push(marker);
        this._text = text;
    }
    get text() {
        return this._text;
    }
    addMarker(marker) {
        this._markers.push(marker);
    }
    markerText() {
        return this._markers.join(",");
    }
}
//# sourceMappingURL=PublicationFootnoteElement.js.map