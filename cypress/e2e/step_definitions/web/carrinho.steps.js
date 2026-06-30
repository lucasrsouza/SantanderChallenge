import { Then } from "@badeball/cypress-cucumber-preprocessor";
import CartPage from "../../../support/pages/CartPage";

const carrinho = new CartPage();

Then("o produto adicionado deve estar listado no carrinho", () => {
  carrinho.validarProdutoNoCarrinho(Cypress.env("produtoAtual"));
});

Then("a quantidade do produto no carrinho deve ser {string}", (quantidade) => {
  carrinho.validarQuantidade(quantidade);
});
