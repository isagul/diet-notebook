
describe('Login', () => {
  beforeEach(() => {
    cy.login(Cypress.env().email, Cypress.env().password);
  });

  it('should login and navigate to other routes', () => {
    cy.get("[data-cy=btn-dropdown-menu]").click();
    cy.contains('Diyet Özetim').click();
    cy.url().should('include', 'summary');
    cy.get('h4').contains('Diyet Özetim');
    cy.get("[data-cy=btn-dropdown-menu]").click();
    cy.contains('Ana Sayfa').click();
    cy.url().should('include', 'home');
    cy.get('h4').contains('Günlük Liste');
  });
});