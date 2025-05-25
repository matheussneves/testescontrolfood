import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de estoque', () => {
  cy.visit('/estoque');
});

Given('eu seleciono o ingrediente {string}', (ingrediente) => {
  cy.get('#estoque-page-form-ingrediente-select').click();
  cy.contains('li', ingrediente).click();
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    Quantidade: '#estoque-page-form-quantidade-input',
    Medida: '#estoque-page-form-medida-input',
    'Quantidade Mínima': '#estoque-page-form-quantidade-minima-input',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu deixo os campos {string}, {string}, {string} e {string} vazios', (field1, field2, field3, field4) => {
  const fieldIds = {
    Ingrediente: '#estoque-page-form-ingrediente-select',
    Quantidade: '#estoque-page-form-quantidade-input',
    Medida: '#estoque-page-form-medida-input',
    'Quantidade Mínima': '#estoque-page-form-quantidade-minima-input',
  };
  [field1, field2, field3, field4].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um item no estoque com o ingrediente {string}', (ingrediente) => {
  cy.get('#estoque-page-table-body').contains(ingrediente).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do item {string}', (buttonText, ingrediente) => {
  cy.get('#estoque-page-table-body')
    .contains('tr', ingrediente)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Quantidade: '#estoque-page-form-quantidade-input',
    Medida: '#estoque-page-form-medida-input',
    'Quantidade Mínima': '#estoque-page-form-quantidade-minima-input',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#estoque-page-error-alert').should('contain.text', errorMessage);
});

Then('o item {string} deve aparecer na lista de estoques', (ingrediente) => {
  cy.get('#estoque-page-table-body').contains(ingrediente).should('exist');
});

Then('o item {string} deve ter a quantidade {string} na lista de estoques', (ingrediente, quantidade) => {
  cy.get('#estoque-page-table-body')
    .contains('tr', ingrediente)
    .within(() => {
      cy.contains(quantidade).should('exist');
    });
});

Then('o item {string} não deve mais aparecer na lista de estoques', (ingrediente) => {
  cy.get('#estoque-page-table-body').contains(ingrediente).should('not.exist');
});