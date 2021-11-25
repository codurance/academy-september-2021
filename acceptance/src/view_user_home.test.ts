describe('view logged in user home', () => {
    it('user can see their name', () => {
        cy.loginToGoogleAccount();

        cy.visit('/');

        cy.contains('Logged in as: Samuel Steele');
    });
});
