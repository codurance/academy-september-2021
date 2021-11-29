describe('perform simple search queries', () => {
    it('display all results when user selects to view all results', () => {
        cy.loginToGoogleAccount();

        cy.visit('/');

        cy
            .contains('View all')
            .click();

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .get('[data-cy=submit]')
            .type('Steele')
            .submit();

        cy
            .contains('Sam Steele')
            .should('exist');

        cy
            .contains('Jordan Colgan')
            .should('not.exist');

        cy
            .get('[data-cy=submit]')
            .type('Java')
            .submit();

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Sam Steele')
            .should('not.exist');
    });

});