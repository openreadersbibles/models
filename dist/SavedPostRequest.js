export class SavedPostRequest {
    constructor() {
    }
    get url() {
        return this._url;
    }
    get body() {
        return this._body;
    }
    get hash() {
        return this._hash;
    }
    static async create(url, body) {
        const r = new SavedPostRequest();
        r._url = url;
        r._body = body;
        r._hash = "transaction:" + await SavedPostRequest.createHashFromStrings(url, JSON.stringify(body));
        return r;
    }
    static async createHashFromStrings(str1, str2) {
        const encoder = new TextEncoder();
        const data1 = encoder.encode(str1);
        const data2 = encoder.encode(str2);
        const buffer1 = await crypto.subtle.digest('SHA-256', data1);
        const buffer2 = await crypto.subtle.digest('SHA-256', data2);
        const combinedBuffer = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        combinedBuffer.set(new Uint8Array(buffer1), 0);
        combinedBuffer.set(new Uint8Array(buffer2), buffer1.byteLength);
        const finalBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);
        return this.bufferToHex(finalBuffer);
        // const hash = createHash('sha256');
        // hash.update(str1);
        // hash.update(str2);
        // return hash.digest('hex');
    }
    static bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }
    toString() {
        const obj = {
            url: this._url,
            body: this._body,
            hash: this._hash
        };
        return JSON.stringify(obj);
    }
    static async fromString(str) {
        const obj = JSON.parse(str);
        if (obj === undefined) {
            return undefined;
        }
        const savedPostRequest = await SavedPostRequest.create(obj.url, obj.body);
        savedPostRequest._hash = obj.hash;
        return savedPostRequest;
    }
}
//# sourceMappingURL=SavedPostRequest.js.map