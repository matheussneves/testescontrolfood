import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo usuário', () => {
  cy.wrap({
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    senha: 'senha123',
    acesso_criar_usuario: true,
    acesso_dashboard: true,
    acesso_criar_pedido: true,
    acesso_estoque: true,
  }).as('validUserData');
});

Given('que existe um usuário com o ID {int}', (id) => {
  cy.wrap(id).as('existingUserId');
});

Given('que não existe um usuário com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingUserId');
});

Given('que eu tenho os dados atualizados do usuário', () => {
  cy.wrap({
    nome: 'João Atualizado',
    email: 'joao.atualizado@exemplo.com',
    senha: 'novaSenha123',
    acesso_criar_usuario: false,
    acesso_dashboard: true,
    acesso_criar_pedido: false,
    acesso_estoque: true,
  }).as('updatedUserData');
});

When('eu envio uma requisição POST para {string} com os dados do usuário', (endpoint) => {
  cy.get('@validUserData').then((body) => {
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
  cy.get('@updatedUserData').then((body) => {
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

Then('eu devo ver uma lista de usuários', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do usuário', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('nome');
    expect(response.body).to.have.property('email');
    expect(response.body).to.have.property('acesso_criar_usuario');
    expect(response.body).to.have.property('acesso_dashboard');
    expect(response.body).to.have.property('acesso_criar_pedido');
    expect(response.body).to.have.property('acesso_estoque');
  });
});