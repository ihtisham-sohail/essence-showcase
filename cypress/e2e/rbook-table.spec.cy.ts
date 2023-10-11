describe('Rbook Feature table usage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.implicitLoginFlow();
    cy.wait(1000);
    cy.visit('/home/social');
    cy.wait(1000);
  });

  it('should be redirected to Rbook page', () => {
    cy.contains('Weclome to RBook');
  });

  it('should have the table populated', () => {
    cy.get('tbody').find('tr').should('have.length', 15);
    cy.get('tbody>tr').eq(0).get('td').eq(2).contains('Eliseo@gardner.biz');
  });

  it('should sort the table by header click', () => {
    cy.get('thead>tr').eq(0).get('th').eq(2).contains('Email').click().click();
    cy.get('tbody>tr').eq(0).get('td').eq(0).contains('52');

    cy.get('thead>tr').eq(0).get('th').eq(1).contains('Name').click();
    cy.get('tbody>tr').eq(0).get('td').eq(0).contains('33');
  });

  it('should search the table through input field', () => {
    cy.get('input').type('Juston.Ruecker@scot.tv');
    cy.get('tbody').find('tr').should('have.length', 1);
    cy.get('tbody>tr').eq(0).get('td').eq(0).contains('95');
  });
});
