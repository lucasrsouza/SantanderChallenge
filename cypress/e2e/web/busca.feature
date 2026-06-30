# language: pt
@web @busca
Funcionalidade: Busca de produtos
  Como um cliente da loja
  Quero pesquisar produtos pelo nome
  Para encontrar rapidamente o que desejo comprar

  @smoke
  Cenário: Buscar um produto existente
    Dado que estou na página de produtos
    Quando pesquiso pelo termo "Dress"
    Então a listagem deve exibir apenas produtos relacionados a "Dress"

  @regressao
  Esquema do Cenário: Buscar diferentes produtos válidos
    Dado que estou na página de produtos
    Quando pesquiso pelo termo "<termo>"
    Então a listagem deve exibir apenas produtos relacionados a "<termo>"

    Exemplos:
      | termo  |
      | Dress  |
      | Top    |
      | Tshirt |
