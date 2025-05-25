import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu estou na página de gestão de pratos', () => {
  cy.visit('/pratos');
});

Given('eu preencho o campo {string} com {string}', (field, value) => {
  const fieldIds = {
    'Nome do Prato': '#pratos-page-input-nome',
    Preço: '#pratos-page-input-preco',
    'Tempo de Preparo (min)': '#pratos-page-input-tempo',
    'Descrição do Prato': '#pratos-page-input-descricao',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Given('eu seleciono os ingredientes {string} e {string}', (ingrediente1, ingrediente2) => {
  cy.get('#pratos-page-input-ingredientes').click();
  cy.contains('li', ingrediente1).click();
  cy.contains('li', ingrediente2).click();
  cy.get('#pratos-page-input-ingredientes').type('{esc}');
});

Given('eu deixo os campos {string}, {string}, {string}, {string} e {string} vazios', (field1, field2, field3, field4, field5) => {
  const fieldIds = {
    'Nome do Prato': '#pratos-page-input-nome',
    Preço: '#pratos-page-input-preco',
    'Tempo de Preparo (min)': '#pratos-page-input-tempo',
    'Descrição do Prato': '#pratos-page-input-descricao',
    Ingredientes: '#pratos-page-input-ingredientes',
  };
  [field1, field2, field3, field4, field5].forEach((field) => {
    cy.get(fieldIds[field]).clear();
  });
});

Given('existe um prato com o nome {string}', (nomePrato) => {
  cy.get('#pratos-page-table-body').contains(nomePrato).should('exist');
});

When('eu clico no botão {string}', (buttonText) => {
  cy.contains('button', buttonText).click();
});

When('eu clico no botão {string} do prato {string}', (buttonText, nomePrato) => {
  cy.get('#pratos-page-table-body')
    .contains('tr', nomePrato)
    .within(() => {
      cy.contains('button', buttonText).click();
    });
});

When('eu atualizo o campo {string} para {string}', (field, value) => {
  const fieldIds = {
    Preço: '#pratos-page-input-preco',
  };
  cy.get(fieldIds[field]).clear().type(value);
});

Then('eu devo ver a mensagem {string}', (message) => {
  cy.contains(message).should('be.visible');
});

Then('eu devo ver a mensagem de erro {string}', (errorMessage) => {
  cy.get('#pratos-page-error-alert').should('contain.text', errorMessage);
});

Then('o prato {string} deve aparecer na lista de pratos', (nomePrato) => {
  cy.get('#pratos-page-table-body').contains(nomePrato).should('exist');
});

Then('o prato {string} deve ter o preço {string} na lista de pratos', (nomePrato, preco) => {
  cy.get('#pratos-page-table-body')
    .contains('tr', nomePrato)
    .within(() => {
      cy.contains(preco).should('exist');
    });
});

Then('o prato {string} não deve mais aparecer na lista de pratos', (nomePrato) => {
  cy.get('#pratos-page-table-body').contains(nomePrato).should('not.exist');
});