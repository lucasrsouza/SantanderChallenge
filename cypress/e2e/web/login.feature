# language: pt
@web @login
Funcionalidade: Autenticação na loja
  Como um cliente da loja
  Quero acessar minha conta
  Para realizar compras de forma autenticada

  @smoke
  Cenário: Cadastrar um novo usuário e realizar login
    Dado que eu cadastro um novo usuário válido
    Quando eu realizo o login com o usuário cadastrado
    Então devo visualizar a indicação de que estou logado com o meu nome
