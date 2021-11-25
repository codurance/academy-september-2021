
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
        const {access_token, id_token} = body
        cy.request({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            headers: { Authorization: `Bearer ${access_token}` },
        }).then(({ body }) => {
            const user = {
                accessToken: id_token,
                name: body.name,
                email: body.email,
                profileImageUrl: body.picture,
            }

            window.localStorage.setItem('skillset-authenticated-user', JSON.stringify(user));
        });
    });
};

Cypress.Commands.add('loginToGoogleAccount', loginToGoogleAccount);