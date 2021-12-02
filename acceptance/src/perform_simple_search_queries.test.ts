describe('perform simple search queries', () => {
    it('display all results when user selects to view all results', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .type('Kotlin')

        cy
            .get('form')
            .submit()

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Sam Steele')
            .should('not.exist');

        cy
            .contains('Kotlin')
            .type('Javascript, Kotlin')
            .submit();

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Sam Steele')
            .should('exist');

        cy
            .contains('Simon Rosenberg')
            .should('not.exist');
    });
});