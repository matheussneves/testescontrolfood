import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu tenho os dados válidos de um novo ingrediente', () => {
  cy.wrap({
    descricao: 'Tomate',
    contem_alergicos: false,
    informacoes_nutricionais: 'Rico em vitamina C',
  }).as('validIngredientData');
});

Given('que eu tenho dados inválidos para o ingrediente', () => {
  cy.wrap({
    descricao: '',
    contem_alergicos: null,
    informacoes_nutricionais: '',
  }).as('invalidIngredientData');
});

Given('que existe um ingrediente com o ID {int}', (id) => {
  cy.wrap(id).as('existingIngredientId');
});

Given('que não existe um ingrediente com o ID {int}', (id) => {
  cy.wrap(id).as('nonExistingIngredientId');
});

When('eu envio uma requisição POST para {string} com os dados do ingrediente', (endpoint) => {
  cy.get('@validIngredientData').then((body) => {
    cy.chamarApi({
      endpoint,
      method: 'POST',
      body,
    }).as('apiResponse');
  });
});

When('eu envio uma requisição POST para {string} com os dados inválidos', (endpoint) => {
  cy.get('@invalidIngredientData').then((body) => {
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
    descricao: 'Tomate Atualizado',
    contem_alergicos: true,
    informacoes_nutricionais: 'Rico em antioxidantes',
  }).as('updatedIngredientData');

  cy.get('@updatedIngredientData').then((body) => {
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

Then('eu devo ver uma lista de ingredientes', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
  });
});

Then('eu devo ver os detalhes do ingrediente', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('descricao');
    expect(response.body).to.have.property('contem_alergicos');
    expect(response.body).to.have.property('informacoes_nutricionais');
  });
});