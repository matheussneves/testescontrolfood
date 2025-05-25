import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo prato', () => {
  cy.wrap({
    nome: 'Pizza Margherita',
    descricao: 'Pizza clássica com molho de tomate, queijo e manjericão',
    preco: 45.99,
    tempo: 30,
    ingredientes: [
      { id_ingrediente: 1, quantidade: 200, medida: 'g' },
      { id_ingrediente: 2, quantidade: 100, medida: 'g' },
    ],
  }).as('validDishData');
});

Given('que eu tenho dados inválidos para o prato', () => {
  cy.wrap({
    nome: '',
    descricao: '',
    preco: -10,
    tempo: -5,
    ingredientes: [],
  }).as('invalidDishData');
});

Given('que existe um prato com o ID {int}', (id) => {
  cy.wrap(id).as('existingDishId');
});

Given('que não existe um prato com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingDishId');
});

When('eu envio uma requisição POST para {string} com os dados do prato', (endpoint) => {
  cy.get('@validDishData').then((body) => {
    cy.apiRequest({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidDishData').then((body) => {
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
    nome: 'Pizza Quatro Queijos',
    descricao: 'Pizza com quatro tipos de queijo',
    preco: 55.99,
    tempo: 35,
    ingredientes: [
      { id_ingrediente: 3, quantidade: 150, medida: 'g' },
      { id_ingrediente: 4, quantidade: 100, medida: 'g' },
    ],
  }).as('updatedDishData');

  cy.get('@updatedDishData').then((body) => {
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

Then('eu devo ver uma lista de pratos com seus ingredientes', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((dish) => {
      expect(dish).to.have.property('nome');
      expect(dish).to.have.property('descricao');
      expect(dish).to.have.property('ingredientes');
    });
  });
});

Then('eu devo ver os detalhes do prato com seus ingredientes', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('nome');
    expect(response.body).to.have.property('descricao');
    expect(response.body).to.have.property('preco');
    expect(response.body).to.have.property('tempo');
    expect(response.body).to.have.property('ingredientes');
  });
});