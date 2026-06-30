/**
 * Page Object do Carrinho de Compras.
 */
export default class CartPage {
  elementos = {
    linkCarrinhoNoMenu: 'a[href="/view_cart"]',
    tabela: "#cart_info_table",
    linhas: "#cart_info_table tbody tr",
    nomeProduto: ".cart_description h4 a",
    quantidade: ".cart_quantity button",
    precoUnitario: ".cart_price p",
    precoTotal: ".cart_total_price",
    botaoProsseguirCheckout: ".check_out",
    // Modal exibido quando usuário não está logado
    modalLogin: '.modal-content a[href="/login"]',
  };

  acessar() {
    cy.visit("/view_cart");
    cy.get(this.elementos.tabela).should("be.visible");
  }

  validarProdutoNoCarrinho(nomeProduto) {
    cy.get(this.elementos.nomeProduto).should("contain", nomeProduto);
  }

  validarQuantidade(quantidadeEsperada) {
    cy.get(this.elementos.quantidade)
      .first()
      .should("have.text", String(quantidadeEsperada));
  }

  prosseguirParaCheckout() {
    cy.get(this.elementos.botaoProsseguirCheckout).click();
  }
}
