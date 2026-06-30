# Desafio de Automação F1RST — Testes Web e API

Projeto de testes automatizados desenvolvido para o desafio de automação da **F1RST**, contemplando um cenário **Web** (e-commerce) e um cenário de **API** (Trello).

A automação foi construída no formato **BDD**, utilizando:

| Camada | Tecnologia |
| --- | --- |
| Runner de testes | [Cypress](https://www.cypress.io/) 13 |
| BDD / Gherkin | [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) |
| Bundler dos steps | [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor) + esbuild |
| Linguagem | JavaScript |
| Padrão de projeto | Page Objects |

---

## 1. Pré-requisitos

- **Node.js** 18 ou superior (inclui o `npm`).
- Sistema operacional com suporte ao Cypress (Windows, macOS ou Linux).

> Na primeira execução o Cypress baixa o seu binário automaticamente. Garanta acesso à internet nesse momento.

---

## 2. Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd f1rst-automation
npm install
```

---

## 3. Como executar os testes

| Comando | O que faz |
| --- | --- |
| `npm test` | Executa **todos** os testes (Web + API) em modo headless. |
| `npm run test:web` | Executa apenas os cenários **Web**. |
| `npm run test:api` | Executa apenas os cenários de **API** (Trello). |
| `npm run test:headed` | Executa todos os testes com o navegador visível. |
| `npm run cypress:open` | Abre a interface gráfica do Cypress (Test Runner). |

Exemplo:

```bash
npm install
npm test
```

---

## 4. Estrutura do projeto

```
f1rst-automation/
├── cypress/
│   ├── e2e/
│   │   ├── web/                      # Features Web (.feature, em pt-BR)
│   │   │   ├── login.feature
│   │   │   ├── busca.feature
│   │   │   ├── carrinho.feature
│   │   │   └── pagamento.feature
│   │   ├── api/
│   │   │   └── trello.feature        # Feature da API do Trello
│   │   └── step_definitions/         # Implementação dos passos (Gherkin → código)
│   │       ├── web/
│   │       │   ├── comum.steps.js    # Passos reutilizados entre cenários
│   │       │   ├── login.steps.js
│   │       │   ├── busca.steps.js
│   │       │   ├── carrinho.steps.js
│   │       │   └── pagamento.steps.js
│   │       └── api/
│   │           └── trello.steps.js
│   ├── fixtures/                     # Massa de dados
│   │   └── usuario.json
│   └── support/
│       ├── commands.js               # Comandos customizados (cadastro/login)
│       ├── e2e.js
│       └── pages/                    # Page Objects
│           ├── LoginPage.js
│           ├── ProductsPage.js
│           ├── CartPage.js
│           └── CheckoutPage.js
├── cypress.config.js                 # Configuração + variáveis de ambiente
├── .cypress-cucumber-preprocessorrc.json
├── package.json
└── README.md
```

---

## 5. Cenários cobertos

### 5.1. Web — [automationexercise.com](https://www.automationexercise.com/)

O desafio sugeria um usuário (`teste2021@teste.com.br` / `teste`), porém com a ressalva de que poderíamos criar o nosso próprio usuário. Como o site utilizado exige um cadastro válido para autenticação, **os testes criam um usuário novo automaticamente** (e-mail único gerado por timestamp), garantindo execução independente e repetível, sem depender de uma conta pré-existente.

- **Login** — cadastra um usuário novo e realiza o login, validando a indicação de usuário logado.
- **Busca** — pesquisa um produto e valida que a listagem exibe apenas itens relacionados ao termo (com `Esquema do Cenário` para múltiplos termos).
- **Carrinho** — adiciona o primeiro produto da busca ao carrinho e valida o item e a quantidade.
- **Pagamento** — com usuário autenticado, adiciona o produto e valida que ele aparece corretamente na tela de pagamento/revisão do pedido.

> Os termos de busca (`Dress`, `Top`, `Tshirt`) podem ser ajustados conforme o catálogo vigente do site.

### 5.2. API — Trello

Cenário sobre a action pública `592f11060f95a3d3d46a987a`:

```
GET https://api.trello.com/1/actions/592f11060f95a3d3d46a987a
```

Validações realizadas:

- O **status code** da resposta é `200`.
- O campo `name` da estrutura `list` é exibido.
- O campo `name` da estrutura `list` é igual a **`Professional`**.

> **Observação:** a API do Trello pode passar a exigir autenticação (`key`/`token`). Caso o retorno seja `401`, basta preencher `trelloKey` e `trelloToken` em `cypress.config.js` (ou exportar `CYPRESS_trelloKey` e `CYPRESS_trelloToken`). Os steps já enviam essas credenciais automaticamente quando presentes.

---

## 6. Configurações e variáveis de ambiente

As variáveis ficam em `cypress.config.js`, bloco `env`, e podem ser sobrescritas por linha de comando (prefixo `CYPRESS_`):

| Variável | Descrição | Valor padrão |
| --- | --- | --- |
| `userEmail` / `userPassword` | Credenciais sugeridas para o desafio Web | `teste2021@teste.com.br` / `teste` |
| `trelloApiUrl` | Endpoint da action do Trello | URL da action do desafio |
| `trelloKey` / `trelloToken` | Autenticação opcional do Trello | vazio |

Exemplo de sobrescrita:

```bash
npx cypress run --env trelloKey=SUA_KEY,trelloToken=SEU_TOKEN
```

---

## 7. Boas práticas adotadas

- **BDD em português** — features escritas em linguagem natural (`# language: pt`), legíveis por pessoas não técnicas.
- **Page Objects** — seletores e ações isolados das regras de teste, facilitando manutenção.
- **Passos reutilizáveis** — steps comuns (busca, carrinho) centralizados para evitar duplicação.
- **Massa de dados dinâmica** — usuário gerado em tempo de execução, sem dependência de estado externo.
- **Separação Web × API** — execução independente por meio de scripts e tags (`@web`, `@api`).

---

## 8. Como enviar para o Git (GitHub / Bitbucket)

O projeto já vem com um repositório Git inicializado e um commit inicial. Para publicá-lo:

**1. Crie um repositório vazio** no GitHub ou Bitbucket (sem README, sem .gitignore — o projeto já os possui) e copie a URL (ex.: `https://github.com/seu-usuario/f1rst-automation.git`).

**2. (Opcional) Defina seu nome/e-mail no commit.** Caso queira que o commit inicial fique no seu nome:

```bash
git config user.name "Seu Nome"
git config user.email "seu-email@dominio.com"
git commit --amend --reset-author --no-edit
```

**3. Aponte para o repositório remoto e envie:**

```bash
git remote add origin <URL-DO-SEU-REPOSITORIO>
git branch -M main
git push -u origin main
```

Pronto — o link do repositório é a entrega do desafio de automação.

> Se preferir começar o histórico do zero, basta apagar a pasta `.git` e rodar `git init` novamente.
