Feature: Gerenciamento de Pratos
  Como um administrador
  Quero gerenciar os pratos do sistema
  Para criar, atualizar, visualizar e remover pratos

  Scenario: Criar um novo prato
    Given que eu tenho os dados válidos de um novo prato
    When eu envio uma requisição POST para "/pratos" com os dados do prato
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Prato criado com sucesso"

  Scenario: Criar um prato com dados inválidos
    Given que eu tenho dados inválidos para o prato
    When eu envio uma requisição POST para "/pratos" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os pratos
    When eu envio uma requisição GET para "/pratos"
    Then eu devo receber um código de status 200
    And devo ver uma lista de pratos com seus ingredientes

  Scenario: Listar um prato por ID
    Given que existe um prato com o ID 1
    When eu envio uma requisição GET para "/pratos/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do prato com seus ingredientes

  Scenario: Listar um prato inexistente por ID
    Given que não existe um prato com o ID 999
    When eu envio uma requisição GET para "/pratos/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Prato não encontrado"

  Scenario: Atualizar um prato existente
    Given que existe um prato com o ID 1
    And eu tenho os dados atualizados do prato
    When eu envio uma requisição PUT para "/pratos/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Prato atualizado com sucesso"

  Scenario: Atualizar um prato inexistente
    Given que não existe um prato com o ID 999
    When eu envio uma requisição PUT para "/pratos/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Prato não encontrado"

  Scenario: Remover um prato existente
    Given que existe um prato com o ID 1
    When eu envio uma requisição DELETE para "/pratos/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Prato removido com sucesso"

  Scenario: Remover um prato inexistente
    Given que não existe um prato com o ID 999
    When eu envio uma requisição DELETE para "/pratos/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Prato não encontrado"