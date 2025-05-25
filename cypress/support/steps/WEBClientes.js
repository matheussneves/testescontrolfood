import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de clientes', () => {
  cy.visit('/clientes');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    Nome: '#clientes-page-input-nome',
    Telefone: '#clientes-page-input-telefone',
    Endereco: '#clientes-page-input-endereco',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu deixo os campos {string}, {string} e {string} vazios', (field1, field2, field3) => {
  const fieldIds = {
    Nome: '#clientes-page-input-nome',
    Telefone: '#clientes-page-input-telefone',
    Endereco: '#clientes-page-input-endereco',
  };
  cy.get(fieldIds[field1]).clear();
  cy.get(fieldIds[field2]).clear();
  cy.get(fieldIds[field3]).clear();
});

Given('existe um cliente com o nome {string}', (name) => {
  cy.get('#clientes-page-table-body').contains(name).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do cliente {string}', (buttonText, clientName) => {
  cy.get('#clientes-page-table-body')
    .contains('tr', clientName)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Nome: '#clientes-page-input-nome',
    Telefone: '#clientes-page-input-telefone',
    Endereco: '#clientes-page-input-endereco',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#clientes-page-error-alert').should('contain.text', errorMessage);
});

Then('o cliente {string} deve aparecer na lista de clientes', (clientName) => {
  cy.get('#clientes-page-table-body').contains(clientName).should('exist');
});

Then('o cliente {string} não deve mais aparecer na lista de clientes', (clientName) => {
  cy.get('#clientes-page-table-body').contains(clientName).should('not.exist');
});