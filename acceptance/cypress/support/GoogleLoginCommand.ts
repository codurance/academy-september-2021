
declare namespace Cypress {
    interface Chainable {
        loginToGoogleAccount: typeof loginToGoogleAccount;
    }
}

const loginToGoogleAccount = () => {
    cy.log('Logging in to Google');

    cy.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        body: {
            grant_type: 'refresh_token',
            client_id: Cypress.env('googleClientId'),
            client_secret: Cypress.env('googleClientSecret'),
            refresh_token: Cypress.env('googleRefreshToken'),
        },
    }).then(({body}) => {
        const {id_token} = body
        window.localStorage.setItem('proof-of-concept-access-token', id_token)
    });
};

Cypress.Commands.add('loginToGoogleAccount', loginToGoogleAccount);