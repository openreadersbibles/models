import { WrappedBody } from "./SavedPostRequest";

export interface HttpReturnValue {
    statusCode: number;
    body: string;
    headers?: { [key: string]: string | boolean };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SuccessValue(payload: any): HttpReturnValue {
    return { statusCode: 200, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InternalFailure(payload: any): HttpReturnValue {
    return { statusCode: 500, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BadRequest(payload: any): HttpReturnValue {
    return { statusCode: 400, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}

export const returnValueConfig = {
    hash: ''
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ReturnValue(payload: any): HttpReturnValue {
    const wrappedBody: WrappedBody = {
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
