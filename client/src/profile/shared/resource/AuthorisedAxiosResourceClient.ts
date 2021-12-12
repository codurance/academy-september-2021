import {ResourceClient} from "./ResourceClient";
import axios from "axios";
import querystring from "qs";
import {AuthenticatedUserService} from "../../../shared/authentication/service/AuthenticatedUserService";

export class AuthorisedAxiosResourceClient implements ResourceClient {

    private readonly axiosClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL ?? 'http://localhost:3004/dev',
    });

    private authenticatedUserService: AuthenticatedUserService;

    constructor(authenticatedUserService: AuthenticatedUserService) {
        this.authenticatedUserService = authenticatedUserService;

        this.addRequestAuthorisationHeader();
        this.handleUnauthorisedResponses();
    }

    async get<T>(path: string, query?: unknown): Promise<T> {
        return this.axiosClient
            .get(path, {params: query, paramsSerializer: params => querystring.stringify(params)})
            .then(response => response.data as T);
    }

    async update<T>(path: string, value: T): Promise<void> {
        return this.axiosClient
            .put(path, value);
    }

    private addRequestAuthorisationHeader(): void {
        this.axiosClient.interceptors.request.use(
            config => {
                const authenticatedUser = this.authenticatedUserService.getAuthenticatedUser();
                const accessToken = authenticatedUser?.accessToken;
                return {
                    ...config,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                };
            }
        );
    }

    private handleUnauthorisedResponses(): void {
        this.axiosClient.interceptors.response.use(
            response => response,
            error => {
                if (error.response && this.isUnauthorisedResponse(error.response)) {
                    this.authenticatedUserService.logout();
                    return new Promise(() => { /* do nothing */
                    });
                }

                return Promise.reject(error);
            }
        );
    }

    private isUnauthorisedResponse(response: { status: number }) {
        const responseStatus = response.status;
        return responseStatus === 401 || responseStatus === 403;
    }
}