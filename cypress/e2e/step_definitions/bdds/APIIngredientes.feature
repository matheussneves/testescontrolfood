Feature: Gerenciamento de Ingredientes
  Como um administrador
  Quero gerenciar os ingredientes do sistema
  Para criar, atualizar, visualizar e remover ingredientes

  Scenario: Criar um novo ingrediente
    Given que eu tenho os dados válidos de um novo ingrediente
    When eu envio uma requisição POST para "/ingredientes" com os dados do ingrediente
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Ingrediente criado com sucesso"

  Scenario: Criar um ingrediente com dados inválidos
    Given que eu tenho dados inválidos para o ingrediente
    When eu envio uma requisição POST para "/ingredientes" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os ingredientes
    When eu envio uma requisição GET para "/ingredientes"
    Then eu devo receber um código de status 200
    And devo ver uma lista de ingredientes

  Scenario: Listar um ingrediente por ID
    Given que existe um ingrediente com o ID 1
    When eu envio uma requisição GET para "/ingredientes/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do ingrediente

  Scenario: Listar um ingrediente inexistente por ID
    Given que não existe um ingrediente com o ID 999
    When eu envio uma requisição GET para "/ingredientes/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Ingrediente não encontrado"

  Scenario: Atualizar um ingrediente existente
    Given que existe um ingrediente com o ID 1
    And eu tenho os dados atualizados do ingrediente
    When eu envio uma requisição PUT para "/ingredientes/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Ingrediente atualizado com sucesso"

  Scenario: Atualizar um ingrediente inexistente
    Given que não existe um ingrediente com o ID 999
    When eu envio uma requisição PUT para "/ingredientes/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Ingrediente não encontrado"

  Scenario: Remover um ingrediente existente
    Given que existe um ingrediente com o ID 1
    When eu envio uma requisição DELETE para "/ingredientes/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Ingrediente removido com sucesso"

  Scenario: Remover um ingrediente inexistente
    Given que não existe um ingrediente com o ID 999
    When eu envio uma requisição DELETE para "/ingredientes/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Ingrediente não encontrado"