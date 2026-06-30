import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let resposta;

When("envio uma requisição GET para a action do Trello", () => {
  const qs = {};
  // A API do Trello pode exigir autenticação (key/token). Caso estejam
  // configurados em cypress.env.json eles são enviados; do contrário a
  // requisição segue sem eles (endpoint público de leitura).
  if (Cypress.env("trelloKey")) qs.key = Cypress.env("trelloKey");
  if (Cypress.env("trelloToken")) qs.token = Cypress.env("trelloToken");

  cy.request({
    method: "GET",
    url: Cypress.env("trelloApiUrl"),
    qs,
    failOnStatusCode: false,
  }).then((res) => {
    resposta = res;
  });
});

Then("o status code da resposta deve ser {int}", (statusEsperado) => {
  expect(resposta.status).to.eq(statusEsperado);
});

Then(
  "o campo {string} da estrutura {string} deve ser exibido",
  (campo, estrutura) => {
    const valor = resposta.body.data[estrutura][campo];
    expect(valor, `data.${estrutura}.${campo}`).to.be.a("string").and.not.be
      .empty;
    cy.log(`${estrutura}.${campo} = ${valor}`);
  }
);

Then(
  "o campo {string} da estrutura {string} deve ser igual a {string}",
  (campo, estrutura, valorEsperado) => {
    expect(resposta.body.data[estrutura][campo]).to.eq(valorEsperado);
  }
);
