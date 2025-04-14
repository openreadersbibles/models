export interface WrappedBody<T> {
    body: T;
    hash: string;
}

interface SavedPostRequestObject {
    url: string;
    body: unknown;
    hash: string;
}

export class SavedPostRequest {
    private _url!: string;
    private _body!: unknown;
    private _hash!: string;

    private constructor() {
    }

    get url(): string {
        return this._url;
    }

    get body(): unknown {
        return this._body;
    }

    get hash(): string {
        return this._hash;
    }

    static async create(url: string, body: unknown): Promise<SavedPostRequest> {
        const r = new SavedPostRequest();
        r._url = url;
        r._body = body;
        r._hash = "transaction:" + await SavedPostRequest.createHashFromStrings(url, JSON.stringify(body));
        return r;
    }

    static async createHashFromStrings(str1: string, str2: string): Promise<string> {
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

    private static bufferToHex(buffer: ArrayBuffer): string {
        return Array.from(new Uint8Array(buffer))
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
    }

    toString(): string {
        const obj: SavedPostRequestObject = {
            url: this._url,
            body: this._body,
            hash: this._hash
        };
        return JSON.stringify(obj);
    }

    static async fromString(str: string): Promise<SavedPostRequest | undefined> {
        const obj: SavedPostRequestObject = JSON.parse(str);
        if (obj === undefined) {
            return undefined;
        }
        const savedPostRequest = await SavedPostRequest.create(obj.url, obj.body);
        savedPostRequest._hash = obj.hash;
        return savedPostRequest;
    }

}