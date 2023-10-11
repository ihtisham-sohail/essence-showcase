describe('Login Page and Login Flow Success', () => {
  it('Visits the initial project page and logs in', () => {
    cy.visit('/');
    cy.contains('Welcome to Social Centralize');
    cy.get('#google-sso')
      .should('have.length', 1)
      .and('have.class', 'round-btn');
    cy.implicitLoginFlow();
    cy.wait(1000);
    cy.get('h1').contains('Welcome to your Dashboard');
  });
});
