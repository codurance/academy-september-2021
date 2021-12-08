import {setupServer} from "msw/node";
import {rest} from "msw";
import {AuthorisedAxiosResourceClient} from "./AuthorisedAxiosResourceClient";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../../shared/authentication/persistence";
import {instance, mock, verify, when} from "ts-mockito";
import {act, waitFor} from "@testing-library/react";
import {ApplicationNavigator} from "../../../shared/navigation";
import {DefaultRequestBody} from "msw/lib/types/handlers/RequestHandler";

describe('axios request client', () => {
    const requestUrl = "http://localhost:3004/dev/path-to-my-resource";
    const server = setupServer();

    interface ResultType {
        property: string;
    }

    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const applicationNavigator = mock<ApplicationNavigator>();

    const authorisedAxiosResourceClient = new AuthorisedAxiosResourceClient(
        instance(authenticatedUserStore),
        instance(applicationNavigator)
    );

    const targets = [
        {
            trigger: () => authorisedAxiosResourceClient.get<ResultType>('/path-to-my-resource'),
            interceptor: rest.get
        },
        {
            trigger: () => authorisedAxiosResourceClient.update('/path-to-my-resource', {}),
            interceptor: rest.put
        }
    ];

    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it.each(targets)('performs request with authorisation header', async (target) => {
        const authenticatedUser: AuthenticatedUser = {accessToken: "access-token"} as AuthenticatedUser;
        let authorisationHeader: string | null;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        server.use(
            target.interceptor(requestUrl, (request, response) => {
                authorisationHeader = request.headers.get('Authorization');
                return response();
            })
        );

        await target.trigger();

        return waitFor(() => {
            expect(authorisationHeader).toBe('Bearer access-token');
        });
    });

    it.each(targets)('navigate to login for intercepted get request with response status of %d', async (target) => {
        for (const statusCode of [401, 403]) {
            server.use(
                target.interceptor(requestUrl, (request, response, context) => {
                    return response(
                        context.status(statusCode),
                    );
                })
            );

            act(() => {
                target.trigger();
            });

            await waitFor(() => {
                verify(applicationNavigator.navigateToLogin()).called();
            });
        }
    });

    it.each(targets)('return error for get requests with non authorisation errors', async (target) => {
        server.use(
            target.interceptor(requestUrl, (request, response, context) => {
                return response(
                    context.status(400),
                );
            })
        );

        await expect(target.trigger())
            .rejects
            .toEqual(Error('Request failed with status code 400'));
    });

    it('return result for successful get request', async () => {
        server.use(
            rest.get(requestUrl, (request, response, context) => {
                return response(
                    context.status(200),
                    context.json({
                        property: 'value'
                    })
                );
            })
        );

        const result = await authorisedAxiosResourceClient.get<ResultType>('/path-to-my-resource');

        expect(result).toEqual({
            property: 'value'
        });
    });

    it('performs get request with query parameters', async () => {
        let queryParameters: unknown;
        server.use(
            rest.get(requestUrl, (request, response) => {
                queryParameters = request.url.search;
                return response();
            })
        );

        await authorisedAxiosResourceClient.get<ResultType>('/path-to-my-resource', {
            param1: 'value',
            param2: ['other', 'values']
        });

        return waitFor(() => {
            expect(queryParameters).toEqual('?param1=value&param2%5B0%5D=other&param2%5B1%5D=values');
        });
    });

    it('perform put request with supplied value to update', async () => {
        interface ResourceValue {
            value: string
        }
        const value: ResourceValue = {
            value: "Value updated"
        };
        let body: DefaultRequestBody;
        server.use(
            rest.put(requestUrl, (request, response) => {
                body = request.body;
                return response();
            })
        );

        await authorisedAxiosResourceClient.update('/path-to-my-resource', value);

        expect(body).toEqual(value);
    });
});