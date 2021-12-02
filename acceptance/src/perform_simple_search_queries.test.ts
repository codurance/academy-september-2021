describe('perform simple search queries', () => {
    it('display relevant results when user searches for a skill', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        findPeopleWithKotlinSkill();

        findPeopleWithJavascriptSkill();

        findPeopleWithKotlinAndJavascriptSkill();

        findNoPeopleWithPythonSkill();
    });

    const findPeopleWithKotlinSkill = () => {
        searchForSkills('Kotlin');

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Niall Bambury')
            .should('not.exist');
    };

    const findPeopleWithJavascriptSkill = () => {
        searchForSkills('Javascript');

        cy
            .contains('Jordan Colgan')
            .should('not.exist');

        cy
            .contains('Niall Bambury')
            .should('exist');
    };

    const findPeopleWithKotlinAndJavascriptSkill = () => {
        searchForSkills('Kotlin, Javascript');

        cy
            .contains('Jordan Colgan')
            .should('exist');

        cy
            .contains('Niall Bambury')
            .should('exist');

        cy
            .contains('Simon Rosenberg')
            .should('not.exist');
    };

    const findNoPeopleWithPythonSkill = () => {
        searchForSkills('Python');

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
});