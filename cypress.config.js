const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  env: {
    url_api: "https://controlfoodapi-d8a49e8667a8.herokuapp.com/api/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

    },
    specPattern: "cypress/e2e/step_definitions/bdds/*.feature", // Padrão para localizar arquivos de teste
    baseUrl: "https://controlfoodweb-a3dbc52a8c88.herokuapp.com/", // URL base para os testes
  },
});

