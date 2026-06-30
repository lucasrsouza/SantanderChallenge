# language: pt
@api @trello
Funcionalidade: Consulta de ação via API do Trello
  Como consumidor da API do Trello
  Quero enviar um GET para uma action
  Para validar o status code e o nome da lista associada

  @smoke
  Cenário: Buscar uma action e validar o nome da lista
    Quando envio uma requisição GET para a action do Trello
    Então o status code da resposta deve ser 200
    E o campo "name" da estrutura "list" deve ser exibido
    E o campo "name" da estrutura "list" deve ser igual a "Professional"
