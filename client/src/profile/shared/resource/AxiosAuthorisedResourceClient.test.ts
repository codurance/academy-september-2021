import {setupServer} from "msw/node";
import {rest} from "msw";
import {AxiosAuthorisedResourceClient} from "./AxiosAuthorisedResourceClient";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../../shared/authentication/persistence";
import {instance, mock, verify, when} from "ts-mockito";
import {act, waitFor} from "@testing-library/react";
import {ApplicationNavigator} from "../../../shared/navigation";

describe('axios request client', () => {
    const server = setupServer();

    interface ResultType {
        property: string;
    }

    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const applicationNavigator = mock<ApplicationNavigator>();

    const axiosAuthorisedResourceClient = new AxiosAuthorisedResourceClient(
        instance(authenticatedUserStore),
        instance(applicationNavigator)
    );

    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('performs get request with authorisation header', async () => {
        const authenticatedUser: AuthenticatedUser = {accessToken: "access-token"} as AuthenticatedUser;
        let authorisationHeader: string | null;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        server.use(
            rest.get('http://localhost:3004/dev/path-to-my-resource', (request, response) => {
                authorisationHeader = request.headers.get('Authorization');
                return response();
            })
        );

        await axiosAuthorisedResourceClient.get<ResultType>('/path-to-my-resource');

        return waitFor(() => {
            expect(authorisationHeader).toBe('Bearer access-token');
        });
    })

    it('return result for successful get request', async () => {
        server.use(
            rest.get('http://localhost:3004/dev/path-to-my-resource', (request, response, context) => {
                return response(
                    context.status(200),
                    context.json({
                        property: 'value'
                    })
                );
            })
        );

        const result = await axiosAuthorisedResourceClient.get<ResultType>('/path-to-my-resource');

        expect(result).toEqual({
            property: 'value'
        });
    });

    it('performs get request with query parameters', async () => {
        let queryParameters: any | null;
        server.use(
            rest.get('http://localhost:3004/dev/path-to-my-resource', (request, response) => {
                queryParameters = request.url.search;
                return response();
            })
        );

        await axiosAuthorisedResourceClient.get<ResultType>('/path-to-my-resource', {param1: 'value', param2: ['other', 'values']});

        return waitFor(() => {
            expect(queryParameters).toEqual('?param1=value&param2%5B0%5D=other&param2%5B1%5D=values');
        });
    });

    it.each([401, 403])
    ('navigate to login for intercepted get request with response status of %d', async (statusCode) => {
        server.use(
            rest.get('http://localhost:3004/dev/path-to-my-resource', (request, response, context) => {
                return response(
                    context.status(statusCode),
                );
            })
        );

        act(() => {
            axiosAuthorisedResourceClient.get<ResultType>('/path-to-my-resource');
        });

        return waitFor(() => {
            verify(applicationNavigator.navigateToLogin()).called();
        });
    });

    it('return error for get requests with non authorisation errors', async () => {
        server.use(
            rest.get('http://localhost:3004/dev/path-to-my-resource', (request, response, context) => {
                return response(
                    context.status(400),
                );
            })
        );

        await expect(axiosAuthorisedResourceClient.get<ResultType>('/path-to-my-resource'))
            .rejects
            .toEqual(Error('Request failed with status code 400'));
    });
});