const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  env: {
    url_api: "https://controlfoodapi-d8a49e8667a8.herokuapp.com/api/",
  },
  e2e: {
    testIsolation: false,
    numTestsKeptInMemory: 5,
    userAgent: "None",
    experimentalMemoryManagement: false,
    experimentalRunAllSpecs: true,
    viewportWidth: 1280, // Largura da viewport
    viewportHeight: 768, // Altura da viewport
    chromeWebSecurity: false, // Desativa a segurança do Chrome
    defaultCommandTimeout: 60000, // Timeout padrão para comandos
    responseTimeout: 60000, // Timeout para respostas
    requestTimeout: 60000, // Timeout para requisições
    trashAssetsBeforeRuns: false, // Não remove assets antes das execuções
    watchForFileChanges: false, // Não observa mudanças nos arquivos
    cacheAcrossSpecs: false, // Não mantém cache entre specs
    video: false, // Desativa gravação de vídeo
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());

    },
    specPattern: "cypress/e2e/step_definitions/*.feature", // Padrão para localizar arquivos de teste
    baseUrl: "https://controlfoodweb-a3dbc52a8c88.herokuapp.com/", // URL base para os testes
  },
});

    
    
    
    
    
    
    
    
    
    
    
    
    
    // reporter: "mochawesome", // Configura o reporter
    // reporterOptions: {
    //   reportDir: "mochawesome-report", // Diretório do relatório
    //   overwrite: true, // Sobrescreve relatórios existentes
    //   html: true, // Gera relatório em HTML
    //   json: true, // Gera relatório em JSON
    //   timestamp: "mmddyyyy_hhmmss", // Formato do timestamp
    // },
    // specPattern: "*/.feature", // Padrão para localizar arquivos de teste
    // baseUrl: urlFrontend, // URL base para os testes
    // setupNodeEvents(on, config) {
    //   on("before:browser:launch", (browser, launchOptions) => {
    //     if (["chrome", "edge"].includes(browser.name)) {
    //       if (browser.isHeadless) {
    //         launchOptions.args.push("--no-sandbox");
    //         launchOptions.args.push("--disable-gl-drawing-for-tests");
    //         launchOptions.args.push("--disable-gpu");
    //       }
    //       launchOptions.args.push("--js-flags=--max-old-space-size=3500");
    //     }
    //     return launchOptions;
    //  });