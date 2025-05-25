import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de entregadores', () => {
  cy.visit('/entregadores');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    Nome: '#entregadores-form-nome',
    Senha: '#entregadores-form-senha',
    Telefone: '#entregadores-form-telefone',
    Veículo: '#entregadores-form-veiculo',
    Placa: '#entregadores-form-placa',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu deixo os campos {string}, {string}, {string}, {string} e {string} vazios', (field1, field2, field3, field4, field5) => {
  const fieldIds = {
    Nome: '#entregadores-form-nome',
    Senha: '#entregadores-form-senha',
    Telefone: '#entregadores-form-telefone',
    Veículo: '#entregadores-form-veiculo',
    Placa: '#entregadores-form-placa',
  };
  [field1, field2, field3, field4, field5].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um entregador com o nome {string}', (name) => {
  cy.get('#entregadores-list').contains(name).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do entregador {string}', (buttonText, delivererName) => {
  cy.get('#entregadores-list')
    .contains('li', delivererName)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Nome: '#entregadores-form-nome',
    Senha: '#entregadores-form-senha',
    Telefone: '#entregadores-form-telefone',
    Veículo: '#entregadores-form-veiculo',
    Placa: '#entregadores-form-placa',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#entregadores-page-error-alert').should('contain.text', errorMessage);
});

Then('o entregador {string} deve aparecer na lista de entregadores', (delivererName) => {
  cy.get('#entregadores-list').contains(delivererName).should('exist');
});

Then('o entregador {string} não deve mais aparecer na lista de entregadores', (delivererName) => {
  cy.get('#entregadores-list').contains(delivererName).should('not.exist');
});