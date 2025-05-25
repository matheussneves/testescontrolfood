import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de login', () => {
  cy.visit('/');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  if (field === 'E-mail') {
    cy.get('#login-page-email-input').type(value);
  } else if (field === 'Senha') {
    cy.get('#login-page-password-input').type(value);
  }
});

Given('eu deixo os campos {string} e {string} vazios', (field1, field2) => {
  cy.get('#login-page-email-input').clear();
  cy.get('#login-page-password-input').clear();
});

When('eu clico no botão {string}', (buttonText) => {
  cy.get('#login-page-submit-button').contains(buttonText).click();
});

Then('eu devo ser redirecionado para a página {string}', (url) => {
  cy.url().should('include', url);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#login-page-error-alert').should('contain.text', errorMessage);
});