describe('view logged in user home', () => {
    it('user can see their name', () => {
        cy.loginToGoogleAccount();

        cy.visit('/home');

        cy.contains('Logged In');
        cy.contains('Name: name');
    });
});
