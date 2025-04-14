/// These are just convenience functions for the database to
/// return an error message and a suggested HTTP reponse code

export function InternalFailure(payload: string) {
    return Promise.reject({ statusCode: 500, body: payload });
}

export function BadRequest(payload: string) {
    return Promise.reject({ statusCode: 400, body: payload });
}

export function Failure(statusCode: number, payload: string) {
    return Promise.reject({ statusCode: statusCode, body: payload });
}

export const returnValueConfig = {
    hash: ''
};
