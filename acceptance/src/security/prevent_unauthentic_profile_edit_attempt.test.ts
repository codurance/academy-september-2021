import * as jwt from "jsonwebtoken";

describe('prevent unauthentic profile edit attempt', () => {
    xit('redirects to login for users who are using a token that is not genuine', () => {
        cy.intercept('GET', '*/profile/fake.user@codurance.com').as('getProfile');
        const unauthenticToken = jwt.sign({data: 'foobar'}, 'secret', {expiresIn: '1h'});
        persistFakeUserWithToken(unauthenticToken);

        cy.visit('/profile');
        cy.wait('@getProfile');

        cy.wait(6000);
        cy.location().should((location) => {
            expect(location.pathname).to.eq('/login');
        });
    });

    const persistFakeUserWithToken = (token: string) => {
        const user = {
            accessToken: token,
            name: "Fake User",
            email: "fake.user@codurance.com",
            profileImageUrl: "",
        }
        window.localStorage.setItem('skillset-authenticated-user', JSON.stringify(user));
    };
});