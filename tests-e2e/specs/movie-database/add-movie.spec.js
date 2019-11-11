describe('Add movie', () => {

    beforeEach(() => {
        cy.fixture('config').then(config => {
            cy.visit(config.movieDatabase.baseUrl);
            cy.get('#addMovie').should('be.visible');
        });
    });

    it('should add and list a new movie', () => {
        const title = 'A new movie shooted on ' + new Date();
        const year = new Date().getFullYear();
        cy.addMovie(title, year);
        cy.get('#moviesList').contains(`${title} (${year})`);
    });

});
