import { WrappedBody } from "./SavedPostRequest.js";

export interface HttpReturnValue {
    statusCode: number;
    body: string;
    headers?: { [key: string]: string | boolean };
}

export function SuccessValue(payload: unknown): HttpReturnValue {
    return { statusCode: 200, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}

export function InternalFailure(payload: unknown) {
    return Promise.reject({ statusCode: 500, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } });
}

export function BadRequest(payload: unknown) {
    return Promise.reject({ statusCode: 400, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } });
}

export function Failure(statusCode: number, payload: unknown) {
    return Promise.reject({ statusCode: statusCode, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } });
}

export const returnValueConfig = {
    hash: ''
};

export function ReturnValue(payload: unknown): HttpReturnValue {
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
