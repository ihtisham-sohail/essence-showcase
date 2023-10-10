describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Welcome to Social Centralize');
    cy.get('#google-sso')
      .should('have.length', 1)
      .and('have.class', 'round-btn')
      .click();
  });
});
