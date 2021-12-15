describe("user profile updating", () => {
    it("a user should be able to input their details to update their user profile", () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');
        cy.intercept('PUT', '*/profile').as('saveProfile');

        updateClient('EcW');

        updateRole('Principal Software Craftsperson');

        updateLocation('London');

        addNewSkill('Rust', 'I could lead a pairing session on this');

        saveProfile();

        findPeopleWithReactSkills();

        checkRoleInSearchResults('Principal Software Craftsperson');

        checkLocationInSearchResults('London');

        checkCurrentClientInSearchResults('EcW');
    })

    const addNewSkill = (skill: string, level: string) => {
        cy
            .contains('My Skills')
            .click();

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
            .parent()
            .within(() => {
                cy.get('.location-selector')
                    .click()
                    .contains(location)
                    .click();
            });
    }

    const updateRole = (role: string) => {
        cy
            .contains('Role')
            .parent()
            .within(() => {
                cy.get('.role-selector')
                    .click()
                    .contains(role)
                    .click();
            });
    }

    const updateClient = (client: string) => {
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

        cy.wait('@saveProfile');

        cy
            .contains('Profile Saved')
            .should('exist');
    }

    const checkRoleInSearchResults = (role: string) => {
        cy
            .get('.card')
            .contains('Jordan Colgan')
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
            .contains('Jordan Colgan')
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
            .contains('Jordan Colgan')
            .parents('.card')
            .within(() => {
                cy
                    .contains(location)
                    .should('exist');
            });
    };
})