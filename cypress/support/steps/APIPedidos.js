import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo pedido', () => {
  cy.wrap({
    cliente_id_cliente: 1,
    entregador_id_entregador: 2,
    usuarios_id_usuario: 3,
    data_pedido: '2025-05-25',
    tempo_estimado: 30,
    entrega: {
      data_retirada: '2025-05-25',
      data_entrega: '2025-05-25',
      endereco: 'Rua Exemplo, 123',
    },
    pratos: [
      { id_prato: 1 },
      { id_prato: 2 },
    ],
  }).as('validOrderData');
});

Given('que eu tenho dados inválidos para o pedido', () => {
  cy.wrap({
    cliente_id_cliente: null,
    entregador_id_entregador: null,
    usuarios_id_usuario: null,
    data_pedido: '',
    tempo_estimado: -10,
    entrega: {
      data_retirada: '',
      data_entrega: '',
      endereco: '',
    },
    pratos: [],
  }).as('invalidOrderData');
});

Given('que existe um pedido com o ID {int}', (id) => {
  cy.wrap(id).as('existingOrderId');
});

Given('que não existe um pedido com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingOrderId');
});

When('eu envio uma requisição POST para {string} com os dados do pedido', (endpoint) => {
  cy.get('@validOrderData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidOrderData').then((body) => {
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
    cliente_id_cliente: 1,
    entregador_id_entregador: 2,
    usuarios_id_usuario: 3,
    data_pedido: '2025-06-01',
    tempo_estimado: 45,
    entrega: {
      data_retirada: '2025-06-01',
      data_entrega: '2025-06-01',
      endereco: 'Rua Atualizada, 456',
    },
    pratos: [
      { id_prato: 3 },
      { id_prato: 4 },
    ],
  }).as('updatedOrderData');

  cy.get('@updatedOrderData').then((body) => {
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

Then('eu devo ver uma lista de pedidos com informações detalhadas', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do pedido', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('cliente_id_cliente');
    expect(response.body).to.have.property('entregador_id_entregador');
    expect(response.body).to.have.property('usuarios_id_usuario');
    expect(response.body).to.have.property('data_pedido');
    expect(response.body).to.have.property('tempo_estimado');
    expect(response.body).to.have.property('entrega');
    expect(response.body).to.have.property('pratos');
  });
});