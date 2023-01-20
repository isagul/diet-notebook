
describe('Home', () => {
  beforeEach(() => {
    cy.login(Cypress.env().email, Cypress.env().password);
  });

  it('should navigate to other routes in the dropdown', () => {
    cy.get("[data-cy=btn-dropdown-menu]").click();
    cy.contains('Diyet Özetim').click();
    cy.url().should('include', 'summary');
    cy.get('h4').contains('Diyet Özetim');
    cy.get("[data-cy=btn-dropdown-menu]").click();
    cy.contains('Ana Sayfa').click();
    cy.url().should('include', 'home');
    cy.get('h4').contains('Günlük Liste');
  });

  it('should add meal input ant button works as expected', () => {
    cy.get("[data-cy=input-meal-name]").type("Yumurta");
    cy.get("[data-cy=btn-add-meal]").click();
    cy.get("[data-cy=input-meal-name]").should('have.value', '');
    cy.get('.ant-list-items').children().should('have.length', 1);
  });

  it('should update meal modal works as expected', () => {
    cy.get('li').should("have.text", "Yumurta");
    cy.get("[data-cy=btn-edit-meal]").click();
    cy.get("[data-cy=input-update-meal]").should('have.value', 'Yumurta');
    cy.get("[data-cy=input-update-meal]").clear();
    cy.get("[data-cy=input-update-meal]").type("Yumurta 1");
    cy.get('button').contains('Kaydet').click();
    cy.get('.ant-list-items').children().should('have.length', 1);
    cy.get('li').should("have.text", "Yumurta 1");
  });

  it('should delete meal button works as expected', () => {
    cy.get("[data-cy=btn-delete-meal]").click();
    cy.get('button').contains('Evet').click();
    cy.get('.ant-empty-image').should("be.visible");
  });
});