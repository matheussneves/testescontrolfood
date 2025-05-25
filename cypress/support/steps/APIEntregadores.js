import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo entregador', () => {
  cy.wrap({
    nome: 'Carlos Souza',
    telefone: '(11) 98765-4321',
    senha: 'senha123',
    veiculo: 'Moto',
    placa: 'ABC1234',
  }).as('validDelivererData');
});

Given('que eu tenho dados inválidos para o entregador', () => {
  cy.wrap({
    nome: '',
    telefone: '',
    senha: '',
    veiculo: '',
    placa: '',
  }).as('invalidDelivererData');
});

Given('que existe um entregador com o ID {int}', (id) => {
  cy.wrap(id).as('existingDelivererId');
});

Given('que não existe um entregador com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingDelivererId');
});

Given('eu tenho os dados atualizados do entregador', () => {
  cy.wrap({
    nome: 'Carlos Atualizado',
    telefone: '(11) 91234-5678',
    senha: 'novaSenha123',
    veiculo: 'Carro',
    placa: 'XYZ5678',
  }).as('updatedDelivererData');
});

When('eu envio uma requisição POST para {string} com os dados do entregador', (endpoint) => {
  cy.get('@validDelivererData').then((body) => {
    cy.apiRequest({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidDelivererData').then((body) => {
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
  cy.get('@updatedDelivererData').then((body) => {
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

Then('devo ver a mensagem {string}', (message) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body.message).to.eq(message);
  });
});

Then('eu devo ver uma lista de entregadores', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do entregador', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('nome');
    expect(response.body).to.have.property('telefone');
    expect(response.body).to.have.property('veiculo');
    expect(response.body).to.have.property('placa');
  });
});