import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho um email e senha válidos', () => {
  cy.wrap({
    email: 'usuario@exemplo.com',
    senha: 'senha123',
  }).as('validLoginData');
});

Given('que eu tenho um email ou senha inválidos', () => {
  cy.wrap({
    email: 'usuario@exemplo.com',
    senha: 'senhaInvalida',
  }).as('invalidLoginData');
});

Given('que eu não preenchi o email ou a senha', () => {
  cy.wrap({
    email: '',
    senha: '',
  }).as('emptyLoginData');
});

When('eu envio uma requisição POST para {string} com o email e a senha', (endpoint) => {
  cy.get('@validLoginData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com o email e a senha inválidos', (endpoint) => {
  cy.get('@invalidLoginData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} sem preencher todos os campos', (endpoint) => {
  cy.get('@emptyLoginData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

Then('eu devo receber um código de status {int}', (statusCode) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body.message).to.eq(message);
  });
});