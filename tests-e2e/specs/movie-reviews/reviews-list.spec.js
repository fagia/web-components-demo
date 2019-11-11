describe('Reviews list', () => {

    beforeEach(() => {
        cy.fixture('config').then(config => {
            cy.visit(config.movieReviews.baseUrl);
            cy.get('#reviewsList').should('be.visible');
        });
    });

    it('should contain the default list of reviews', () => {
        cy.get('#reviewsList')
            .should('contain', 'Interstellar (2014)')
            .and('contain', 'Joker (2019)');
    });

});
