import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../support/pages/LoginPage";

const loginPage = new LoginPage();

Given("que eu cadastro um novo usuário válido", () => {
  cy.gerarUsuario().then((usuario) => {
    cy.cadastrarUsuario(usuario);
  });
});

When("eu realizo o login com o usuário cadastrado", () => {
  const usuario = Cypress.env("usuarioAtual");
  // Garante o estado deslogado antes de testar o login.
  cy.visit("/logout");
  cy.fazerLogin(usuario.email, usuario.senha);
});

Then(
  "devo visualizar a indicação de que estou logado com o meu nome",
  () => {
    const usuario = Cypress.env("usuarioAtual");
    loginPage.validarUsuarioLogado(usuario.nome);
  }
);
