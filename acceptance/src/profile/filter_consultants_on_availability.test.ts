describe('performs search query based on availability', () => {
    it('filters our available consultants', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');
        cy.intercept('PUT', '*/profile').as('saveProfile');

        checkCurrentProfileNotInAvailableSearchResults();

        changeProfileAvailability();

        saveProfile();

        checkCurrentProfileInAvailableSearchResults();

        resetProfileAvailability();

        saveProfile();
    })

    const changeProfileAvailability = () => {
        cy.visit('/profile');

        cy
            .contains('I am available to be placed onto a client')
            .click();
    }

    const resetProfileAvailability = () => {
        cy.visit('/profile');

        cy
            .contains('I am available to be placed onto a client')
            .click();

        updateClient('Academy')

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

    const checkCurrentProfileInAvailableSearchResults = () => {
        cy.visit('/');
        toggleAvailabilityFilter();
        searchForSkills('Java');

        cy
            .get('.card')
            .contains('Jordan Colgan')
            .should('exist');
    };

    const toggleAvailabilityFilter = () => {
        cy.visit('/');
        cy
            .contains('Only show available consultants')
            .click();
    }

    const checkCurrentProfileNotInAvailableSearchResults = () => {
        toggleAvailabilityFilter();
        searchForSkills('Java');

        cy
            .get('.card')
            .contains('Jordan Colgan')
            .should('not.exist');
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

    const searchForSkills = (skills: string) => {
        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type(skills);

        cy
            .get('form')
            .submit()
    };
})