describe('Add review', () => {

    beforeEach(() => {
        cy.fixture('config').then(config => {
            cy.visit(config.movieReviews.baseUrl);
            cy.get('#addReview').should('be.visible');
        });
    });

    describe('for already existing movie', () => {

        it('should add and list a new review', () => {
            const review = 'A new review (for already existing movie) entered on ' + new Date();
            const rating = Math.floor(Math.random() * 5) + 1;
            cy.addReview(review, rating);
            cy.findNewReview('Interstellar (2014)', review, rating);
        });

    });

    describe('for not existing movie', () => {

        it('should add new movie and then add and list a new review', () => {
            const title = 'A new movie shooted on ' + new Date();
            const year = new Date().getFullYear();
            const review = 'A new review (for not existing movie) entered on ' + new Date();
            const rating = Math.floor(Math.random() * 5) + 1;
            cy.get('#goToAddMovie').click();
            cy.addMovie(title, year);
            cy.addReview(review, rating);
            cy.findNewReview(`${title} (${year})`, review, rating);
        });

    });

});
