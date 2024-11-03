import { WrappedBody } from "./SavedPostRequest";

export interface IReturnValue {
    statusCode: number;
    body: string;
    headers?: any;
}

export const returnValueConfig = {
    hash: ''
};

export function ReturnValue(payload: any): IReturnValue {
    let wrappedBody: WrappedBody = {
        body: payload,
        hash: returnValueConfig.hash
    };
    return {
        statusCode: 200,
        body: JSON.stringify(wrappedBody),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
    };
}

export function ResolvedPromiseReturnValue(payload: any): Promise<IReturnValue> {
    return Promise.resolve(ReturnValue(payload));
}