describe("perform boolean search", () => {
    it("show only consultants who match every skill searched for", () => {
        cy.loginToGoogleAccount();
        cy.visit('/');

        toggleBooleanSearch();

        findPeopleWithKotlinAndJavascriptSkill();

        findNoPeopleWithKotlinAndJavaScriptAndPhpSkill();
    })

    const toggleBooleanSearch = () => {
        cy
            .contains('Only show exact matches')
            .click();
    }

    const findPeopleWithKotlinAndJavascriptSkill = () => {
        searchForSkills('PHP, Javascript');

        cy
            .contains('Sam Steele')
            .should('exist');

        cy
            .contains('Niall Bambury')
            .should('not.exist');

    };

    const findNoPeopleWithKotlinAndJavaScriptAndPhpSkill = () => {
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
})