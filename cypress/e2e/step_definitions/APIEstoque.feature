Feature: Gerenciamento de Estoque
  Como um administrador
  Quero gerenciar os itens do estoque
  Para criar, atualizar, visualizar e remover itens

  Scenario: Criar um novo item no estoque
    Given que eu tenho os dados válidos de um novo item de estoque
    When eu envio uma requisição POST para "/estoque" com os dados do item
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Item de estoque criado com sucesso"

  Scenario: Criar um item no estoque com dados inválidos
    Given que eu tenho dados inválidos para o item de estoque
    When eu envio uma requisição POST para "/estoque" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os itens do estoque
    When eu envio uma requisição GET para "/estoque"
    Then eu devo receber um código de status 200
    And devo ver uma lista de itens do estoque

  Scenario: Listar um item do estoque por ID
    Given que existe um item no estoque com o ID 1
    When eu envio uma requisição GET para "/estoque/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do item do estoque

  Scenario: Listar um item inexistente do estoque por ID
    Given que não existe um item no estoque com o ID 999
    When eu envio uma requisição GET para "/estoque/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Item de estoque não encontrado"

  Scenario: Atualizar um item existente no estoque
    Given que existe um item no estoque com o ID 1
    And eu tenho os dados atualizados do item
    When eu envio uma requisição PUT para "/estoque/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Item de estoque atualizado com sucesso"

  Scenario: Atualizar um item inexistente no estoque
    Given que não existe um item no estoque com o ID 999
    When eu envio uma requisição PUT para "/estoque/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Item de estoque não encontrado"

  Scenario: Remover um item existente do estoque
    Given que existe um item no estoque com o ID 1
    When eu envio uma requisição DELETE para "/estoque/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Item de estoque removido com sucesso"

  Scenario: Remover um item inexistente do estoque
    Given que não existe um item no estoque com o ID 999
    When eu envio uma requisição DELETE para "/estoque/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Item de estoque não encontrado"