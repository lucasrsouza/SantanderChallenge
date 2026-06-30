const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    // Loja Web utilizada nos testes (Automation Exercise).
    baseUrl: "https://www.automationexercise.com",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      // Retornar a config é obrigatório para o preprocessor funcionar.
      return config;
    },

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 90000,
    requestTimeout: 15000,
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
    screenshotOnRunFailure: true,
    // O site de demonstração possui anúncios/erros de terceiros que não
    // devem derrubar os testes funcionais.
    experimentalModifyObstructiveThirdPartyCode: true,
  },

  env: {
    // ----- Credenciais Web (Desafio Web) -----
    // O desafio sugere o usuário abaixo. Caso o site exija um usuário próprio,
    // os testes criam um usuário novo automaticamente (ver login.feature).
    userEmail: "teste2021@teste.com.br",
    userPassword: "teste",

    // ----- API (Desafio API) -----
    trelloApiUrl: "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a",
    // Caso o Trello passe a exigir autenticação, preencha key/token abaixo
    // (ou via CYPRESS_trelloKey / CYPRESS_trelloToken).
    trelloKey: "",
    trelloToken: "",
  },
});
