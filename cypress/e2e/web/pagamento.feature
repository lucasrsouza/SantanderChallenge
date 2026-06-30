# language: pt
@web @pagamento
Funcionalidade: Validação dos produtos na tela de pagamento
  Como um cliente autenticado
  Quero conferir os produtos do carrinho na tela de pagamento
  Para garantir que estou pagando pelos itens corretos

  Contexto:
    Dado que possuo um usuário autenticado na loja

  @smoke
  Cenário: Validar o produto do carrinho na tela de pagamento
    Quando pesquiso pelo termo "Dress"
    E adiciono o primeiro produto da listagem ao carrinho
    E acesso o carrinho de compras
    E prossigo para a tela de pagamento
    Então o produto adicionado deve estar listado na tela de pagamento
