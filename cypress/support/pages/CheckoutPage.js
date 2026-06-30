/**
 * Page Object da tela de Checkout / Pagamento.
 * No Automation Exercise, a confirmação dos produtos ("Review Your Order")
 * ocorre na tela de checkout, imediatamente antes do pagamento.
 */
export default class CheckoutPage {
  elementos = {
    tituloEnderecoEntrega: "#address_delivery",
    tituloRevisao: ".step-one h2", // "Review Your Order"
    tabelaRevisao: "#cart_info",
    nomeProduto: "#cart_info .cart_description h4 a",
    precoTotal: "#cart_info .cart_total_price",
    comentario: 'textarea[name="message"]',
    botaoFazerPedido: ".check_out", // "Place Order"
    // Tela de pagamento (cartão)
    nomeNoCartao: 'input[data-qa="name-on-card"]',
    numeroCartao: 'input[data-qa="card-number"]',
    cvc: 'input[data-qa="cvc"]',
    mesValidade: 'input[data-qa="expiry-month"]',
    anoValidade: 'input[data-qa="expiry-year"]',
    botaoPagar: 'button[data-qa="pay-button"]',
    pedidoConfirmado: '[data-qa="order-placed"]',
  };

  validarTelaDeCheckout() {
    cy.url().should("include", "/checkout");
    cy.get(this.elementos.tabelaRevisao).should("be.visible");
  }

  validarProdutoNaRevisao(nomeProduto) {
    cy.get(this.elementos.nomeProduto).should("contain", nomeProduto);
  }

  fazerPedido(comentario = "Pedido de teste automatizado") {
    cy.get(this.elementos.comentario).clear().type(comentario);
    cy.get(this.elementos.botaoFazerPedido).click();
  }

  preencherPagamento(dados) {
    cy.get(this.elementos.nomeNoCartao).type(dados.nome);
    cy.get(this.elementos.numeroCartao).type(dados.numero);
    cy.get(this.elementos.cvc).type(dados.cvc);
    cy.get(this.elementos.mesValidade).type(dados.mes);
    cy.get(this.elementos.anoValidade).type(dados.ano);
    cy.get(this.elementos.botaoPagar).click();
  }

  validarPedidoConfirmado() {
    cy.get(this.elementos.pedidoConfirmado).should("be.visible");
  }
}
