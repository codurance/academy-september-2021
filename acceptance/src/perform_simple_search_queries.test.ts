describe('perform simple search queries', () => {
    it('display all results when user selects to view all results', () => {
        cy.loginToGoogleAccount();

        cy.visit('/');

        cy
            .contains('View all')
            .click();

        cy
            .get('Jordan Colgan')
            .should('exist');

    });

});