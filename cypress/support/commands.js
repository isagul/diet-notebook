// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, pw) => {
  cy.visit('http://localhost:3000');
  cy.get("[data-cy=btn-home-login]").click();
  cy.url().should('include', '/auth/login');
  cy.get('h3').contains('Giriş Yap');
  cy.get("[data-cy=email]").type(email);
  cy.get("[data-cy=password]").type(pw);
  cy.get("[data-cy=btn-login]").click();
  cy.url().should('include', '/home');
});