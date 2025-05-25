import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de usuários', () => {
  cy.visit('/usuarios');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    Nome: '#user-form-input-nome',
    Email: '#user-form-input-email',
    Senha: '#user-form-input-senha',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu marco os acessos {string} e {string}', (access1, access2) => {
  const accessIds = {
    'Criar Usuário': '#user-form-checkbox-create-user',
    Dashboard: '#user-form-checkbox-dashboard',
    'Criar Pedido': '#user-form-checkbox-create-order',
    Estoque: '#user-form-checkbox-stock',
  };
  cy.get(accessIds[access1]).check();
  cy.get(accessIds[access2]).check();
});

Given('eu deixo os campos {string}, {string} e {string} vazios', (field1, field2, field3) => {
  const fieldIds = {
    Nome: '#user-form-input-nome',
    Email: '#user-form-input-email',
    Senha: '#user-form-input-senha',
  };
  [field1, field2, field3].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um usuário com o nome {string}', (nomeUsuario) => {
  cy.get('#user-list').contains(nomeUsuario).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do usuário {string}', (buttonText, nomeUsuario) => {
  cy.get('#user-list')
    .contains('li', nomeUsuario)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Nome: '#user-form-input-nome',
    Email: '#user-form-input-email',
    Senha: '#user-form-input-senha',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#user-page-error-alert').should('contain.text', errorMessage);
});

Then('o usuário {string} deve aparecer na lista de usuários', (nomeUsuario) => {
  cy.get('#user-list').contains(nomeUsuario).should('exist');
});

Then('o usuário {string} não deve mais aparecer na lista de usuários', (nomeUsuario) => {
  cy.get('#user-list').contains(nomeUsuario).should('not.exist');
});