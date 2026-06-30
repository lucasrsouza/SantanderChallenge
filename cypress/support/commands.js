import LoginPage from "./pages/LoginPage";

const loginPage = new LoginPage();

/**
 * Gera um usuário único (e-mail com timestamp) a partir da fixture base
 * e o armazena em Cypress.env("usuarioAtual") para reuso entre steps.
 */
Cypress.Commands.add("gerarUsuario", () => {
  return cy.fixture("usuario").then((base) => {
    const usuario = { ...base, email: `qa_${Date.now()}@teste.com.br` };
    Cypress.env("usuarioAtual", usuario);
    return cy.wrap(usuario, { log: false });
  });
});

/**
 * Realiza o cadastro completo de um novo usuário pela interface.
 */
Cypress.Commands.add("cadastrarUsuario", (usuario) => {
  loginPage.acessar();
  loginPage.preencherCadastroInicial(usuario.nome, usuario.email);
  loginPage.preencherDetalhesDaConta(usuario);
  loginPage.criarConta();
  loginPage.validarContaCriada();
  loginPage.continuarAposCriacao();
});

/**
 * Realiza login pela interface com e-mail e senha informados.
 */
Cypress.Commands.add("fazerLogin", (email, senha) => {
  loginPage.acessar();
  loginPage.efetuarLogin(email, senha);
});

/**
 * Setup rápido para cenários que exigem usuário autenticado
 * (ex.: checkout). Cria um usuário novo e já o deixa logado.
 */
Cypress.Commands.add("autenticarUsuarioNovo", () => {
  return cy.gerarUsuario().then((usuario) => {
    cy.cadastrarUsuario(usuario); // ao final do cadastro o usuário já fica logado
    return cy.wrap(usuario, { log: false });
  });
});
