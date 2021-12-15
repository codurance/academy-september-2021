describe('update skills', () => {
    it('can add searchable skill', () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');
        cy.intercept('PUT', '*/profile').as('saveProfile');

        addNewSkill('Rust', '3');

        saveProfile();

        checkProfileHasSkillInSearchResults('Rust');
    });

    it('can remove searchable skill', () => {
        cy.loginToGoogleAccount();
        cy.visit('/profile');
        cy.intercept('PUT', '*/profile').as('saveProfile');

        removeSkill('Kotlin');

        saveProfile();

        checkNoProfileWithSkill('Kotlin');
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
            .click()
            .parent()
            .within(() => {
                cy
                    .contains(level)
                    .click();
            });

        cy
            .contains("Add Skill")
            .click()
    }

    const removeSkill = (skill: string) => {
        cy
            .contains('My Skills')
            .click();

        cy
            .contains(skill)
            .parents('.segment')
            .within(() => {
                cy
                    .get('.delete')
                    .click();
            });
    }

    const saveProfile = () => {
        cy
            .contains('Save')
            .click();

        cy.wait('@saveProfile');

        cy
            .contains('Profile Saved')
            .should('exist');
    }

    const checkProfileHasSkillInSearchResults = (skill: string) => {
        cy.visit('/');
        searchForSkills(skill);

        cy
            .get('.card')
            .contains('Jordan Colgan')
            .should('exist');
    };

    const checkNoProfileWithSkill = (skill: string) => {
        cy.visit('/');
        searchForSkills(skill);

        cy
            .contains('No results found')
            .should('exist');
    };

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