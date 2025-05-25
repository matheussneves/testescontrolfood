import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de ingredientes', () => {
  cy.visit('/ingredientes');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    Descrição: '#ingredientes-page-input-descricao',
    'Contém alérgicos': '#ingredientes-page-input-alergicos',
    'Informações nutricionais': '#ingredientes-page-input-nutricionais',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu deixo os campos {string}, {string} e {string} vazios', (field1, field2, field3) => {
  const fieldIds = {
    Descrição: '#ingredientes-page-input-descricao',
    'Contém alérgicos': '#ingredientes-page-input-alergicos',
    'Informações nutricionais': '#ingredientes-page-input-nutricionais',
  };
  [field1, field2, field3].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um ingrediente com a descrição {string}', (descricao) => {
  cy.get('#ingredientes-page-table-body').contains(descricao).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do ingrediente {string}', (buttonText, descricao) => {
  cy.get('#ingredientes-page-table-body')
    .contains('tr', descricao)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Descrição: '#ingredientes-page-input-descricao',
    'Contém alérgicos': '#ingredientes-page-input-alergicos',
    'Informações nutricionais': '#ingredientes-page-input-nutricionais',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#ingredientes-page-alert').should('contain.text', errorMessage);
});

Then('o ingrediente {string} deve aparecer na lista de ingredientes', (descricao) => {
  cy.get('#ingredientes-page-table-body').contains(descricao).should('exist');
});

Then('o ingrediente {string} não deve mais aparecer na lista de ingredientes', (descricao) => {
  cy.get('#ingredientes-page-table-body').contains(descricao).should('not.exist');
});