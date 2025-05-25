Feature: Gestão de Estoque
  Como um administrador
  Quero gerenciar os itens do estoque
  Para adicionar, atualizar, visualizar e remover itens

  Scenario: Adicionar um novo item ao estoque com sucesso
    Given que eu estou na página de gestão de estoque
    And eu seleciono o ingrediente "Tomate"
    And eu preencho o campo "Quantidade" com "100"
    And eu preencho o campo "Medida" com "kg"
    And eu preencho o campo "Quantidade Mínima" com "10"
    When eu clico no botão "Adicionar Item"
    Then eu devo ver a mensagem "Item adicionado com sucesso"
    And o item "Tomate" deve aparecer na lista de estoques

  Scenario: Atualizar um item existente no estoque
    Given que eu estou na página de gestão de estoque
    And existe um item no estoque com o ingrediente "Tomate"
    When eu clico no botão "Editar" do item "Tomate"
    And eu atualizo o campo "Quantidade" para "200"
    And eu clico no botão "Atualizar Item"
    Then eu devo ver a mensagem "Item atualizado com sucesso"
    And o item "Tomate" deve ter a quantidade "200" na lista de estoques

  Scenario: Excluir um item existente do estoque
    Given que eu estou na página de gestão de estoque
    And existe um item no estoque com o ingrediente "Tomate"
    When eu clico no botão "Excluir" do item "Tomate"
    Then eu devo ver a mensagem "Item excluído com sucesso"
    And o item "Tomate" não deve mais aparecer na lista de estoques

  Scenario: Tentar adicionar um item ao estoque com campos vazios
    Given que eu estou na página de gestão de estoque
    And eu deixo os campos "Ingrediente", "Quantidade", "Medida" e "Quantidade Mínima" vazios
    When eu clico no botão "Adicionar Item"
    Then eu devo ver a mensagem de erro "Erro ao salvar estoque"