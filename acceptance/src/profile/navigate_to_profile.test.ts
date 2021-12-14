describe('navigate to profile', () => {
    it('displays profile information', () => {
        cy.intercept('GET', '*/profile/jordan.colgan@codurance.com').as('getProfile');
        cy.loginToGoogleAccount();

        cy.visit('/');

        cy
            .contains('Jordan Colgan')
            .first()
            .click();

        cy
            .contains('Profile')
            .click();

        cy.wait('@getProfile')

        expectInputToHaveValue('Name', 'Jordan Colgan');
        expectInputToHaveValue('Email', 'jordan.colgan@codurance.com');
        expectDropdownToHaveSelectedValue('Role', 'Software Craftsperson in Training');
        expectCheckboxToHaveState('I am able available to be placed onto a client', false);
        expectInputToHaveValue('Current Client', 'Academy');
        expectSkillsToBeShown(['Angular', 'Kotlin', 'Android', 'TypeScript', 'React', 'Java']);
    });

    const expectInputToHaveValue = (label: string, value: string) => {
        cy
            .contains(label)
            .parent()
            .within(() => {
                cy
                    .get('input')
                    .should('have.value', value);
            });
    };

    function expectDropdownToHaveSelectedValue(label: string, value: string) {
        cy
            .contains(label)
            .parent()
            .within(() => {
                cy
                    .get('.default')
                    .should('have.text', value);
            });
    }

    const expectCheckboxToHaveState = (label: string, isChecked: boolean) => {
        cy
            .contains(label)
            .parent()
            .within(() => {
                const checkbox = cy.get('input')
                if (isChecked) checkbox.should('be.checked');
                else checkbox.should('not.be.checked');
            });
    };

    const expectSkillsToBeShown = (skills: string[]) => {
        cy
            .contains('My Skills')
            .click()
            .parents('.accordion')
            .within(() => {
                skills.forEach(skill => {
                    cy
                        .get('.column')
                        .contains(skill)
                        .should('exist');
                });
            });
    };
});