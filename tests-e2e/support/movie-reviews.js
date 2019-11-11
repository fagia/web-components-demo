Cypress.Commands.add('addReview', (review, rating) => {
    cy.get('#addReview')
        .find('input[name="description"]')
        .type(review);
    cy.get('#addReview')
        .find('input[name="rating"]')
        .type(rating);
    cy.get('#addReview')
        .find('input[type="submit"]')
        .click();
});

Cypress.Commands.add('findNewReview', (movie, review, rating) => {
    cy.get('#reviewsList')
        .find('.card')
        .last()
        .should('contain', movie)
        .and('contain', review);
    cy.get('#reviewsList')
        .find('.card')
        .last()
        .find('.fa-star')
        .its('length')
        .should('eq', rating);
});
