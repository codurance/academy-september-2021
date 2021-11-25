import * as jwt from "jsonwebtoken";

describe('check access control to protected views', () => {
    const protectedPages = ['/'];

    before(() => {
        cy.clearLocalStorage();
    });

    protectedPages.forEach(page => {
        it('prevent users who have not logged in yet from accessing ${page}', () => {
            cy.visit(page);

            cy.location().should((location) => {
                expect(location.pathname).to.eq('/login');
            });
        });
    });

    protectedPages.forEach(page => {
        it('prevent users who have attempted fake login from accessing ${page}', () => {
            persistFakeUserWithToken("fake-token");

            cy.visit(page);

            cy.location().should((location) => {
                expect(location.pathname).to.eq('/login');
            });
        });
    });

    protectedPages.forEach(page => {
        xit('prevent users who have attempted unauthentic login from accessing ${page}', () => {
            const unauthenticToken = jwt.sign({data: 'foobar'}, 'secret', {expiresIn: '1h'});
            persistFakeUserWithToken(unauthenticToken);

            cy.visit(page);

            cy.location().should((location) => {
                expect(location.pathname).to.eq('/login');
            });
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
