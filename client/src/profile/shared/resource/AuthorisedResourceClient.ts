export interface AuthorisedResourceClient {

    get<T>(path: string, query?: any): Promise<T>; // eslint-disable-line @typescript-eslint/no-explicit-any

}