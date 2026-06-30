/**
 * Page Object da página de Login/Cadastro (Automation Exercise).
 */
export default class LoginPage {
  // ----- Seletores -----
  elementos = {
    linkLoginNoMenu: 'a[href="/login"]',
    // Cadastro (New User Signup)
    nomeCadastro: 'input[data-qa="signup-name"]',
    emailCadastro: 'input[data-qa="signup-email"]',
    botaoCadastro: 'button[data-qa="signup-button"]',
    // Login (Login to your account)
    emailLogin: 'input[data-qa="login-email"]',
    senhaLogin: 'input[data-qa="login-password"]',
    botaoLogin: 'button[data-qa="login-button"]',
    // Detalhes da conta (/signup)
    tituloMr: "#id_gender1",
    senha: 'input[data-qa="password"]',
    dia: "#days",
    mes: "#months",
    ano: "#years",
    primeiroNome: 'input[data-qa="first_name"]',
    ultimoNome: 'input[data-qa="last_name"]',
    empresa: 'input[data-qa="company"]',
    endereco: 'input[data-qa="address"]',
    pais: 'select[data-qa="country"]',
    estado: 'input[data-qa="state"]',
    cidade: 'input[data-qa="city"]',
    cep: 'input[data-qa="zipcode"]',
    celular: 'input[data-qa="mobile_number"]',
    botaoCriarConta: 'button[data-qa="create-account"]',
    // Resultado
    contaCriada: 'h2[data-qa="account-created"]',
    botaoContinuar: 'a[data-qa="continue-button"]',
  };

  acessar() {
    cy.visit("/");
    cy.get(this.elementos.linkLoginNoMenu).click();
    cy.contains("h2", "New User Signup!").should("be.visible");
  }

  // ----- Cadastro -----
  preencherCadastroInicial(nome, email) {
    cy.get(this.elementos.nomeCadastro).clear().type(nome);
    cy.get(this.elementos.emailCadastro).clear().type(email);
    cy.get(this.elementos.botaoCadastro).click();
    cy.contains("b", "Enter Account Information").should("be.visible");
  }

  preencherDetalhesDaConta(usuario) {
    cy.get(this.elementos.tituloMr).check();
    cy.get(this.elementos.senha).clear().type(usuario.senha);
    cy.get(this.elementos.dia).select(usuario.diaNascimento);
    cy.get(this.elementos.mes).select(usuario.mesNascimento);
    cy.get(this.elementos.ano).select(usuario.anoNascimento);
    cy.get(this.elementos.primeiroNome).clear().type(usuario.nome);
    cy.get(this.elementos.ultimoNome).clear().type("Automation");
    cy.get(this.elementos.empresa).clear().type(usuario.empresa);
    cy.get(this.elementos.endereco).clear().type(usuario.endereco);
    cy.get(this.elementos.pais).select(usuario.pais);
    cy.get(this.elementos.estado).clear().type(usuario.estado);
    cy.get(this.elementos.cidade).clear().type(usuario.cidade);
    cy.get(this.elementos.cep).clear().type(usuario.cep);
    cy.get(this.elementos.celular).clear().type(usuario.celular);
  }

  criarConta() {
    cy.get(this.elementos.botaoCriarConta).click();
  }

  validarContaCriada() {
    cy.get(this.elementos.contaCriada).should("be.visible");
  }

  continuarAposCriacao() {
    cy.get(this.elementos.botaoContinuar).click();
  }

  // ----- Login -----
  efetuarLogin(email, senha) {
    cy.contains("h2", "Login to your account").should("be.visible");
    cy.get(this.elementos.emailLogin).clear().type(email);
    cy.get(this.elementos.senhaLogin).clear().type(senha);
    cy.get(this.elementos.botaoLogin).click();
  }

  validarUsuarioLogado(nome) {
    cy.contains("li", "Logged in as").should("be.visible").and("contain", nome);
  }
}
