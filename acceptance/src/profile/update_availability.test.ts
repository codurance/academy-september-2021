describe("update availability", () => {
    it("appears when searching after update", () => {
        cy.intercept('PUT', '*/profile').as('saveProfile');
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
            .contains('Jordan Colgan')
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

        cy.wait('@saveProfile');
    };
})