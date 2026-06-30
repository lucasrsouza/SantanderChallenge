// Arquivo de suporte global do Cypress.
// Carregado automaticamente antes de cada arquivo de teste.
import "./commands";

// O site de demonstração eventualmente lança exceções de scripts de terceiros
// (anúncios/analytics) que não fazem parte do escopo do teste. Evitamos que
// essas exceções não tratadas falhem os cenários funcionais.
Cypress.on("uncaught:exception", () => false);
