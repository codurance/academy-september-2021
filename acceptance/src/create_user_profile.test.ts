describe("user profile creation", () => {
    xit("a user should be able to input their details and create a user profile", () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');

        updateRole('Principal Craftsperson');

        updateLocation('London');

        updateClient('EcW');

        addNewSkill('Rust', 3);

        saveProfile();

        findPeopleWithReactSkills();

        checkRoleInSearchResults('Principal Craftsperson');

        checkLocationInSearchResults('London');

        checkCurrentClientInSearchResults('EcW');
    })

    const addNewSkill = (skill: string, level: number) => {
        cy
            .contains('Select Skill')
            .click();

        cy
            .contains(skill)
            .click();

        cy
            .contains('Select Level')
            .click();

        cy
            .contains(level)
            .click();

        cy
            .contains("Add Skill")
            .click()
    }

    const findPeopleWithReactSkills = () => {
        cy.visit('/');

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type('React');

        cy
            .get('form')
            .submit()
    };

    const updateLocation = (location: string) => {
        cy
            .contains('Location')
            .click();

        cy
            .contains(location)
            .click();
    }

    const updateRole = (role: string) => {
        cy
            .contains('Select role')
            .click();

        cy
            .contains(role)
            .click();
    }

    const updateClient = (client: string) => {
        cy.visit('/profile');

        cy
            .contains('Current Client')
            .parent()
            .within(() => {
                cy.get('input')
                    .clear()
                    .type(client);
            });
    };

    const saveProfile = () => {
        cy
            .contains('Save')
            .click();

        cy
            .contains('Profile Saved')
            .should('exist');
    }

    const checkProfileExistsInSearchResults = () => {
        cy
            .get("div[class='ui container'")
            .contains('Sam Steele')
            .should('exist');
    }

    const checkRoleInSearchResults = (role: string) => {
        cy
            .get('.card')
            .contains('Sam Steele')
            .parents('.card')
            .within(() => {
                cy
                    .contains(role)
                    .should('exist');
            });
    };

    const checkCurrentClientInSearchResults = (client: string) => {
        cy
            .get('.card')
            .contains('Sam Steele')
            .parents('.card')
            .within(() => {
                cy
                    .contains(client)
                    .should('exist');
            });
    };

    const checkLocationInSearchResults = (location: string) => {
        cy
            .get('.card')
            .contains('Sam Steele')
            .parents('.card')
            .within(() => {
                cy
                    .contains(location)
                    .should('exist');
            });
    };
})