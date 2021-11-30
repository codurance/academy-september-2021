export interface AuthorisedResourceClient {

    get<T>(path: string, query?: any): Promise<T>;

}