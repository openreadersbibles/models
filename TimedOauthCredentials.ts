
export interface CognitoTokenResponse {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_token: string;
    token_type: string;
}

export interface CognitoUserInfoResponse {
    email: string;
    email_verified: "true" | "false";
    sub: string;
    username: string;
}

export class TimedOauthCredentials {
    private _response: CognitoTokenResponse;
    private _createdTime: Date = new Date();
    static readonly TOKEN_EXPIRATION_MARGIN = 60; // seconds

    constructor(response: CognitoTokenResponse) {
        this._response = response;
    }

    get isExpired(): boolean {
        return this._createdTime.getTime() + (this._response.expires_in * 1000) + TimedOauthCredentials.TOKEN_EXPIRATION_MARGIN < Date.now();
    }

    get accessToken(): string | undefined {
        if (this.isExpired) {
            return undefined;
        } else {
            return this._response.access_token;
        }
    }

    get idToken(): string | undefined {
        if (this.isExpired) {
            return undefined;
        } else {
            return this._response.id_token;
        }
    }

    get refreshToken(): string {
        return this._response.refresh_token;
    }

    toObject(): any {
        return {
            response: this._response,
            createdTime: this._createdTime,
        };
    }

    toString(): string {
        return JSON.stringify(this.toObject());
    }

    static fromObject(obj: any): TimedOauthCredentials {
        const token = new TimedOauthCredentials(obj.response);
        token._createdTime = new Date(obj.createdTime);
        return token;
    }

    static fromString(str: string): TimedOauthCredentials {
        return TimedOauthCredentials.fromObject(JSON.parse(str));
    }
}