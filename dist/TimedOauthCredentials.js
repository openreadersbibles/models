;
export class TimedOauthCredentials {
    constructor(response) {
        this._createdTime = new Date();
        this._response = response;
    }
    get isExpired() {
        return this._createdTime.getTime() + (this._response.expires_in * 1000) + TimedOauthCredentials.TOKEN_EXPIRATION_MARGIN < Date.now();
    }
    get accessToken() {
        if (this.isExpired) {
            return undefined;
        }
        else {
            return this._response.access_token;
        }
    }
    get idToken() {
        if (this.isExpired) {
            return undefined;
        }
        else {
            return this._response.id_token;
        }
    }
    get refreshToken() {
        return this._response.refresh_token;
    }
    toObject() {
        return {
            response: this._response,
            createdTime: this._createdTime,
        };
    }
    toString() {
        return JSON.stringify(this.toObject());
    }
    static fromObject(obj) {
        const token = new TimedOauthCredentials(obj.response);
        token._createdTime = new Date(obj.createdTime);
        return token;
    }
    static fromString(str) {
        return TimedOauthCredentials.fromObject(JSON.parse(str));
    }
}
TimedOauthCredentials.TOKEN_EXPIRATION_MARGIN = 60; // seconds
//# sourceMappingURL=TimedOauthCredentials.js.map