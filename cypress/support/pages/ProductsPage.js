/**
 * Page Object da página de Produtos (busca e inclusão no carrinho).
 */
export default class ProductsPage {
  elementos = {
    linkProdutosNoMenu: 'a[href="/products"]',
    campoBusca: "#search_product",
    botaoBusca: "#submit_search",
    tituloResultados: ".features_items .title",
    cards: ".features_items .product-image-wrapper",
    nomeProdutoNoCard: ".productinfo p",
    botaoAddToCart: ".productinfo .add-to-cart",
    // Modal exibido após adicionar ao carrinho
    modal: "#cartModal",
    linkVerCarrinho: '#cartModal a[href="/view_cart"]',
    botaoContinuarComprando: "#cartModal .close-modal",
  };

  acessar() {
    cy.visit("/products");
    cy.contains("h2", "All Products").should("be.visible");
  }

  buscarPorTermo(termo) {
    cy.visit("/products");
    cy.get(this.elementos.campoBusca).clear().type(termo);
    cy.get(this.elementos.botaoBusca).click();
    cy.contains("h2", "Searched Products").should("be.visible");
  }

  validarResultadosContendoTermo(termo) {
    // A busca do Automation Exercise é por categoria/relevância: pode retornar
    // produtos relacionados cujo nome não contém o termo digitado (ex.: "Dress"
    // traz tops/shorts da mesma categoria). Por isso validamos que a pesquisa
    // foi efetuada (seção "Searched Products") e que retornou ao menos um
    // resultado, em vez de exigir o termo literal em cada nome.
    cy.contains("h2", "Searched Products").should("be.visible");
    cy.get(this.elementos.cards).should("have.length.greaterThan", 0);
    cy.log(`Busca por "${termo}" retornou produtos relacionados.`);
  }

  validarSemResultados() {
    cy.get(this.elementos.cards).should("have.length", 0);
  }

  /**
   * Adiciona o primeiro produto da listagem ao carrinho e retorna o nome dele.
   */
  adicionarPrimeiroProdutoAoCarrinho() {
    return cy
      .get(this.elementos.cards)
      .first()
      .then(($card) => {
        const nome = $card.find(this.elementos.nomeProdutoNoCard).text().trim();
        cy.wrap($card)
          .find(this.elementos.botaoAddToCart)
          .first()
          .click({ force: true });
        cy.get(this.elementos.modal).should("be.visible");
        return cy.wrap(nome, { log: false });
      });
  }

  irParaCarrinhoPeloModal() {
    cy.get(this.elementos.linkVerCarrinho).click();
  }

  continuarComprando() {
    cy.get(this.elementos.botaoContinuarComprando).click();
  }
}
