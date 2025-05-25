import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de pedidos', () => {
  cy.visit('/pedidos');
});

Given('eu seleciono o cliente {string}', (cliente) => {
  cy.get('#pedidos-page-input-cliente').click();
  cy.contains('li', cliente).click();
});

Given('eu seleciono o entregador {string}', (entregador) => {
  cy.get('#pedidos-page-input-entregador').click();
  cy.contains('li', entregador).click();
});

Given('eu seleciono os pratos {string} e {string}', (prato1, prato2) => {
  cy.get('[name="pratos_id_prato"]').click();
  cy.contains('li', prato1).click();
  cy.contains('li', prato2).click();
  cy.get('[name="pratos_id_prato"]').type('{esc}');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    'Data do Pedido': '#pedidos-page-input-data',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu deixo os campos {string}, {string}, {string} e {string} vazios', (field1, field2, field3, field4) => {
  const fieldIds = {
    Cliente: '#pedidos-page-input-cliente',
    Entregador: '#pedidos-page-input-entregador',
    Pratos: '[name="pratos_id_prato"]',
    'Data do Pedido': '#pedidos-page-input-data',
  };
  [field1, field2, field3, field4].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um pedido do cliente {string}', (cliente) => {
  cy.get('#pedidos-page-table-body').contains(cliente).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do pedido do cliente {string}', (buttonText, cliente) => {
  cy.get('#pedidos-page-table-body')
    .contains('tr', cliente)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    'Data do Pedido': '#pedidos-page-input-data',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('.MuiAlert-message').should('contain.text', errorMessage);
});

Then('o pedido do cliente {string} deve aparecer na lista de pedidos', (cliente) => {
  cy.get('#pedidos-page-table-body').contains(cliente).should('exist');
});

Then('o pedido do cliente {string} deve ter a data {string} na lista de pedidos', (cliente, data) => {
  cy.get('#pedidos-page-table-body')
    .contains('tr', cliente)
    .within(() => {
      cy.contains(data).should('exist');
    });
});

Then('o pedido do cliente {string} não deve mais aparecer na lista de pedidos', (cliente) => {
  cy.get('#pedidos-page-table-body').contains(cliente).should('not.exist');
});