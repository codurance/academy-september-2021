import {AuthorisedResourceClient} from "./AuthorisedResourceClient";
import axios from "axios";
import {AuthenticatedUserStore} from "../../../shared/authentication/persistence";
import {ApplicationNavigator} from "../../../shared/navigation";
import querystring from "qs";

export class AxiosAuthorisedResourceClient implements AuthorisedResourceClient {

    private readonly axiosClient = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3004/dev',
    });

    private authenticatedUserStore: AuthenticatedUserStore;
    private readonly applicationNavigator: ApplicationNavigator;

    constructor(authenticatedUserStore: AuthenticatedUserStore, applicationNavigator: ApplicationNavigator) {
        this.authenticatedUserStore = authenticatedUserStore;
        this.applicationNavigator = applicationNavigator;

        this.addRequestAuthorisationHeader();
        this.handleUnauthorisedResponses();
    }

    async get<T>(path: string, query?: any): Promise<T> {
        return this.axiosClient
            .get(path, {params: query, paramsSerializer: params => querystring.stringify(params)})
            .then(response => response.data as T);
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
                const responseStatus = error.response.status;
                if (responseStatus === 401 || responseStatus === 403) {
                    this.applicationNavigator.navigateToLogin();
                    return new Promise(() => {
                    });
                }

                return Promise.reject(error);
            }
        );
    }
}