import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo item de estoque', () => {
  cy.wrap({
    quantidade: 100,
    medida: 'kg',
    quantidade_minima: 10,
    ingrediente_Id_ingrediente: 1,
  }).as('validStockItemData');
});

Given('que eu tenho dados inválidos para o item de estoque', () => {
  cy.wrap({
    quantidade: -10,
    medida: '',
    quantidade_minima: -5,
    ingrediente_Id_ingrediente: null,
  }).as('invalidStockItemData');
});

Given('que existe um item no estoque com o ID {int}', (id) => {
  cy.wrap(id).as('existingStockItemId');
});

Given('que não existe um item no estoque com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingStockItemId');
});

When('eu envio uma requisição POST para {string} com os dados do item', (endpoint) => {
  cy.get('@validStockItemData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidStockItemData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição GET para {string}', (endpoint) => {
  cy.chamarApi({
    endpoint,
    method: 'GET',
  }).as('apiResponse');
});

When('eu envio uma requisição GET para {string} com o ID {int}', (endpoint, id) => {
  cy.chamarApi({
    endpoint: `${endpoint}/${id}`,
    method: 'GET',
  }).as('apiResponse');
});

When('eu envio uma requisição PUT para {string} com o ID {int} e os dados atualizados', (endpoint, id) => {
  cy.wrap({
    quantidade: 200,
    medida: 'litros',
    quantidade_minima: 20,
    ingrediente_Id_ingrediente: 2,
  }).as('updatedStockItemData');

  cy.get('@updatedStockItemData').then((body) => {
    cy.chamarApi({
      endpoint: `${endpoint}/${id}`,
      method: 'PUT',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição DELETE para {string} com o ID {int}', (endpoint, id) => {
  cy.chamarApi({
    endpoint: `${endpoint}/${id}`,
    method: 'DELETE',
  }).as('apiResponse');
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

Then('eu devo ver uma lista de itens do estoque', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do item do estoque', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('quantidade');
    expect(response.body).to.have.property('medida');
    expect(response.body).to.have.property('quantidade_minima');
    expect(response.body).to.have.property('ingrediente_Id_ingrediente');
  });
});