
describe("user profile creation", () => {
    xit("a user should be able to input their details and create a user profile", () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');

        cy
            .contains("It looks like this is your first time creating a profile")
            .should('exist');

        cy
            .contains("Sam")
            .should('exist');

        cy
            .contains("Steele")
            .should('exist');

        cy
            .contains('Select Skill')
            .click();

        cy
            .contains("TypeScript")
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
            .contains("Update Profile")
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
            .contains('Sam Steele')
            .should('exist');

    })
})