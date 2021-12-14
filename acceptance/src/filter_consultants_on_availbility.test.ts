describe('performs search query based on availability', () => {
    it('filters our available consultants', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        cy
            .contains('Only show available consultants')
            .should('exist');

        cy
            .contains('Only show available consultants')
            .click();

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type('React');

        cy
            .get('form')
            .submit()

        cy
            .contains('Niall Bambury')
            .should('exist');

        consultantsWhoAreNotAvailable();
    })

    const consultantsWhoAreNotAvailable = () => {

        cy.get("div[class='ui container'")
            .contains('Simon Rosenberg')
            .should('not.exist')
    };
})