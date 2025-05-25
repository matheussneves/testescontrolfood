import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo cliente', () => {
  cy.wrap({
    nome: 'João Silva',
    telefone: '123456789',
    endereco: 'Rua Exemplo, 123',
  }).as('validClientData');
});

Given('que eu tenho dados inválidos para o cliente', () => {
  cy.wrap({
    nome: '',
    telefone: '123456789',
    endereco: '',
  }).as('invalidClientData');
});

When('eu envio uma requisição POST para {string} com os dados do cliente', (endpoint) => {
  cy.get('@validClientData').then((body) => {
    cy.apiRequest({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidClientData').then((body) => {
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
    nome: 'João Atualizado',
    telefone: '987654321',
    endereco: 'Rua Atualizada, 456',
  }).as('updatedClientData');

  cy.get('@updatedClientData').then((body) => {
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

Then('eu devo ver uma lista de clientes', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do cliente', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('nome');
    expect(response.body).to.have.property('telefone');
    expect(response.body).to.have.property('endereco');
  });
});