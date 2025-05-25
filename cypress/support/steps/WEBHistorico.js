import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo registro de histórico', () => {
  cy.wrap({
    quantidade: 50,
    preco_pago: 100.5,
    data_vencimento: '2025-12-31',
    marca: 'Marca Exemplo',
    medida: 'kg',
    ingrediente_Id_ingrediente: 1,
  }).as('validHistoryData');
});

Given('que eu tenho dados inválidos para o registro de histórico', () => {
  cy.wrap({
    quantidade: -10,
    preco_pago: -50,
    data_vencimento: '',
    marca: '',
    medida: '',
    ingrediente_Id_ingrediente: null,
  }).as('invalidHistoryData');
});

Given('que existe um registro de histórico com o ID {int}', (id) => {
  cy.wrap(id).as('existingHistoryId');
});

Given('que não existe um registro de histórico com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingHistoryId');
});

When('eu envio uma requisição POST para {string} com os dados do registro', (endpoint) => {
  cy.get('@validHistoryData').then((body) => {
    cy.apiRequest({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidHistoryData').then((body) => {
    cy.apiRequest({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição GET para {string}', (endpoint) => {
  cy.apiRequest({
    endpoint,
    method: 'GET',
  }).as('apiResponse');
});

When('eu envio uma requisição GET para {string} com o ID {int}', (endpoint, id) => {
  cy.apiRequest({
    endpoint: `${endpoint}/${id}`,
    method: 'GET',
  }).as('apiResponse');
});

When('eu envio uma requisição PUT para {string} com o ID {int} e os dados atualizados', (endpoint, id) => {
  cy.wrap({
    quantidade: 100,
    preco_pago: 200.75,
    data_vencimento: '2026-01-01',
    marca: 'Marca Atualizada',
    medida: 'litros',
    ingrediente_Id_ingrediente: 2,
  }).as('updatedHistoryData');

  cy.get('@updatedHistoryData').then((body) => {
    cy.apiRequest({
      endpoint: `${endpoint}/${id}`,
      method: 'PUT',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição DELETE para {string} com o ID {int}', (endpoint, id) => {
  cy.apiRequest({
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

Then('eu devo ver uma lista de registros de histórico', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do registro de histórico', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('quantidade');
    expect(response.body).to.have.property('preco_pago');
    expect(response.body).to.have.property('data_vencimento');
    expect(response.body).to.have.property('marca');
    expect(response.body).to.have.property('medida');
    expect(response.body).to.have.property('ingrediente_Id_ingrediente');
  });
});