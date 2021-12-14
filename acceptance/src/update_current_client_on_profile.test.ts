describe("update current client on profile", () => {
    xit("updated client appears when searching", () => {
        cy.loginToGoogleAccount();

        findPeopleWithJavaSkills();

        checkCurrentClientInSearchResults('Academy');

        updateClient('New Client');

        findPeopleWithJavaSkills();

        checkCurrentClientInSearchResults('New Client');
    });

    const findPeopleWithJavaSkills = () => {
        cy.visit('/');

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type('Java');

        cy
            .get('form')
            .submit()
    };

    const checkCurrentClientInSearchResults = (client: string) => {
        cy
            .get('.card')
            .contains('Sam Steele')
            .parents('.card')
            .within(() => {
                cy
                    .contains(client)
                    .should('exist');
            });
    };

    const updateClient = (client: string) => {
        cy.visit('/profile');

        cy
            .contains('Current Client')
            .parent()
            .within(() => {
                cy.get('input')
                    .clear()
                    .type(client);
            });

        cy
            .contains('Save')
            .click();

        cy
            .contains('Profile Saved')
            .should('exist');
    };
})