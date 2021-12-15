describe('check basic client access control to protected views', () => {
    const protectedPages = ['/', '/results', '/profile'];

    protectedPages.forEach(page => {
        it(`prevent users who have not logged in yet from accessing ${page}`, () => {
            cy.visit(page);

            cy.location().should((location) => {
                expect(location.pathname).to.eq('/login');
            });
        });
    });

    protectedPages.forEach(page => {
        it(`prevent users who have attempted fake login from accessing ${page}`, () => {
            persistFakeUserWithToken("fake-token");

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
