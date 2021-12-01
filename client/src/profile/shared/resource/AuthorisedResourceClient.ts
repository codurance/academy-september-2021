export interface AuthorisedResourceClient {

    get<T>(path: string, query?: unknown): Promise<T>;

}