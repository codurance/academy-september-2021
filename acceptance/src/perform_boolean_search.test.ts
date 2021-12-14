describe("perform boolean search", () => {
    xit("show only consultants who match every skill searched for", () => {
        cy.loginToGoogleAccount;

        toggleBooleanSearch();

        findPeopleWithKotlinAndJavascriptSkill();

        findNoPeopleWithKotlinAndJavaScriptAndPhpSkill();
    })

    const toggleBooleanSearch = () => {
        cy
            .contains('Boolean search')
            .click();
    }

    const findPeopleWithKotlinAndJavascriptSkill = () => {
        searchForSkills('Kotlin, Javascript');

        cy
            .contains('Jordan Colgan')
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