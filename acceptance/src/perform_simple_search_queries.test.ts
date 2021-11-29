describe('perform simple search queries', () => {
    it('display all results when user selects to view all results', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        cy
            .contains('Java, TypeScript, React...')
            .type('Java')
            .submit();

        //put in listen request to wait for API response

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Sam Steele')
            .should('not.exist');
    });

});