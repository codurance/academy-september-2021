export interface Response {
    statusCode: number;
    headers: ResponseHeaders;
    body: string;
}

interface ResponseHeaders {
    'Access-Control-Allow-Origin': string,
}