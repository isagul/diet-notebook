describe('Login', () => {
  beforeEach(() => {
    cy.login(Cypress.env().email, Cypress.env().password);
  });

  it('should login and navigate to home page successfully', () => {
    cy.url().should('include', '/home');
  });
});
