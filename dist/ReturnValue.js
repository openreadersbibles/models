// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SuccessValue(payload) {
    return { statusCode: 200, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InternalFailure(payload) {
    return { statusCode: 500, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BadRequest(payload) {
    return { statusCode: 400, body: JSON.stringify(payload), headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true } };
}
export const returnValueConfig = {
    hash: ''
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ReturnValue(payload) {
    const wrappedBody = {
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
//# sourceMappingURL=ReturnValue.js.map