describe("display expanded profile view", () => {
    it("modal containing additional profile information opens when clicking card in results page", () => {
        cy.loginToGoogleAccount();

        findPeopleWithJavaSkills();

        openModalBelongingTo('Sam Steele');

        checkSectionPresentInModal('Skills');
    })

    const checkSectionPresentInModal = (heading: string) => {
        cy
            .get('.modal')
            .contains('Sam Steele')
            .parents('.modal')
            .within(() => {
                cy
                    .contains(heading)
                    .should('exist');
            });
    };

    const findPeopleWithJavaSkills = () => {
        cy.visit('/');

        cy
            .get('[placeholder="Java, TypeScript, React..."]')
            .clear()
            .type('Java');

        cy
            .get('form')
            .submit()
    };

    const openModalBelongingTo = (consultant: string) => {
        cy
            .get('.card')
            .contains(consultant)
            .click();
    };
})