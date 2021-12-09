
describe("user profile creation", () => {
    xit("a user should be able to input their details and create a user profile", () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');

        cy
            .contains("It looks like this is your first time creating a profile")
            .should('exist');

        cy
            .contains('Select Skill')
            .click();

        cy
            .contains("Rust")
            .click();

        cy
            .contains('Select Level')
            .click();

        cy
            .contains("I am able to do this without much reference material")
            .click();

        cy
            .contains("Add Skill")
            .click()

        cy
            .contains('Save')
            .click()

        cy
            .visit('/');

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type("TypeScript");

        cy
            .get('form')
            .submit()

        cy
            .get("div[class='ui container'")
            .contains('Sam Steele')
            .should('exist');
    })
})