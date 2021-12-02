describe('perform simple search queries', () => {
    it('display relevant results when user searches for a skill', () => {
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
            .should('not.exist')
            .get('[placeholder="Java, TypeScript, React..."]')
            .type('Javascript, Kotlin')
            .get('form')
            .submit();
        //
        // cy
        //     .get('[placeholder="Java, TypeScript, React..."]')
        //     .type('Javascript, Kotlin')

        // cy
        //     .get('form')
        //     .submit()

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