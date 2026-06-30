# language: pt
@web @carrinho
Funcionalidade: Inclusão de produto no carrinho
  Como um cliente da loja
  Quero adicionar produtos ao carrinho
  Para concluir minha compra

  @smoke
  Cenário: Adicionar um produto ao carrinho a partir da busca
    Dado que estou na página de produtos
    E pesquiso pelo termo "Dress"
    Quando adiciono o primeiro produto da listagem ao carrinho
    E acesso o carrinho de compras
    Então o produto adicionado deve estar listado no carrinho
    E a quantidade do produto no carrinho deve ser "1"
