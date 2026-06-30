import { Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPage from "../../../support/pages/ProductsPage";

const produtos = new ProductsPage();

Then(
  "a listagem deve exibir apenas produtos relacionados a {string}",
  (termo) => {
    produtos.validarResultadosContendoTermo(termo);
  }
);
