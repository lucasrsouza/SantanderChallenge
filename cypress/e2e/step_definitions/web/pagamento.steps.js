import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../../support/pages/CartPage";
import CheckoutPage from "../../../support/pages/CheckoutPage";

const carrinho = new CartPage();
const checkout = new CheckoutPage();

Given("que possuo um usuário autenticado na loja", () => {
  cy.autenticarUsuarioNovo();
});

When("prossigo para a tela de pagamento", () => {
  carrinho.prosseguirParaCheckout();
  checkout.validarTelaDeCheckout();
});

Then("o produto adicionado deve estar listado na tela de pagamento", () => {
  checkout.validarProdutoNaRevisao(Cypress.env("produtoAtual"));
});
