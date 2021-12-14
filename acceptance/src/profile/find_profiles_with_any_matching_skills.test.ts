describe('find profiles with any matching skills', () => {
    it('displays relevant results for profiles that match', () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        findPeopleWithCSharpSkill();

        findPeopleWithJavascriptSkill();

        findPeopleWithCSharpAndJavascriptSkill();

        findNoPeopleWithPythonSkill();
    });

    const findPeopleWithCSharpSkill = () => {
        searchForSkills('C#');

        cy
            .contains('Alexander Howson')
            .should('exist');

        cy
            .contains('Niall Bambury')
            .should('not.exist');
    };

    const findPeopleWithJavascriptSkill = () => {
        searchForSkills('Javascript');

        cy
            .contains('Simon Rosenberg')
            .should('not.exist');

        cy
            .contains('Niall Bambury')
            .should('exist');
    };

    const findPeopleWithCSharpAndJavascriptSkill = () => {
        searchForSkills('C#, Javascript');

        cy
            .contains('Alexander Howson')
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