Cypress.Commands.add('addMovie', (title, year) => {
    cy.shadowGet('#addMovie')
        .shadowFind('form')
        .then(([$form]) => {
            const titleInput = $form.querySelector('input[name="title"]');
            const yearInput = $form.querySelector('input[name="year"]');
            const submitButton = $form.querySelector('input[type="submit"]');
            titleInput.value = title;
            titleInput.dispatchEvent(new Event('input'));
            yearInput.value = year;
            yearInput.dispatchEvent(new Event('input'));
            submitButton.click();
        });
});