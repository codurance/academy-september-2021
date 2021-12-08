import {AuthorisedResourceClient} from "./AuthorisedResourceClient";
import axios from "axios";
import {AuthenticatedUserStore} from "../../../shared/authentication/persistence";
import {ApplicationNavigator} from "../../../shared/navigation";
import querystring from "qs";

export class AxiosAuthorisedResourceClient implements AuthorisedResourceClient {

    private readonly axiosClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL ?? 'http://localhost:3004/dev',
    });

    private authenticatedUserStore: AuthenticatedUserStore;
    private readonly applicationNavigator: ApplicationNavigator;

    constructor(authenticatedUserStore: AuthenticatedUserStore, applicationNavigator: ApplicationNavigator) {
        this.authenticatedUserStore = authenticatedUserStore;
        this.applicationNavigator = applicationNavigator;

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
                const authenticatedUser = this.authenticatedUserStore.get();
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
                    this.applicationNavigator.navigateToLogin();
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