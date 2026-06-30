import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "../../../support/pages/ProductsPage";
import CartPage from "../../../support/pages/CartPage";

const produtos = new ProductsPage();
const carrinho = new CartPage();

Given("que estou na página de produtos", () => {
  produtos.acessar();
});

When("pesquiso pelo termo {string}", (termo) => {
  produtos.buscarPorTermo(termo);
});

When("adiciono o primeiro produto da listagem ao carrinho", () => {
  produtos.adicionarPrimeiroProdutoAoCarrinho().then((nome) => {
    Cypress.env("produtoAtual", nome);
  });
});

When("acesso o carrinho de compras", () => {
  carrinho.acessar();
});
