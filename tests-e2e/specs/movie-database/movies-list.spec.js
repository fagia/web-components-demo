describe('Movies list', () => {

    beforeEach(() => {
        cy.fixture('config').then(config => {
            cy.visit(config.movieDatabase.baseUrl);
            cy.get('#moviesList').should('be.visible');
        });
    });

    it('should contain the default list of movies', () => {
        cy.get('#moviesList')
            .should('contain', 'Interstellar (2014)')
            .and('contain', 'Joker (2019)');
    });

});
