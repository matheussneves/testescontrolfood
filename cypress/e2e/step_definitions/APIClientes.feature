
Feature: Gerenciamento de Clientes
  Como um administrador
  Quero gerenciar os clientes do sistema
  Para criar, atualizar, visualizar e remover clientes

  Scenario: Criar um novo cliente
    Given que eu tenho os dados válidos de um novo cliente
    When eu envio uma requisição POST para "/clientes" com os dados do cliente
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Cliente criado com sucesso"

  Scenario: Criar um cliente com dados inválidos
    Given que eu tenho dados inválidos para o cliente
    When eu envio uma requisição POST para "/clientes" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os clientes
    When eu envio uma requisição GET para "/clientes"
    Then eu devo receber um código de status 200
    And devo ver uma lista de clientes

  Scenario: Listar um cliente por ID
    Given que existe um cliente com o ID 1
    When eu envio uma requisição GET para "/clientes/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do cliente

  Scenario: Listar um cliente inexistente por ID
    Given que não existe um cliente com o ID 999
    When eu envio uma requisição GET para "/clientes/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Cliente não encontrado"

  Scenario: Atualizar um cliente existente
    Given que existe um cliente com o ID 1
    And eu tenho os dados atualizados do cliente
    When eu envio uma requisição PUT para "/clientes/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Cliente atualizado com sucesso"

  Scenario: Atualizar um cliente inexistente
    Given que não existe um cliente com o ID 999
    When eu envio uma requisição PUT para "/clientes/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Cliente não encontrado"

  Scenario: Remover um cliente existente
    Given que existe um cliente com o ID 1
    When eu envio uma requisição DELETE para "/clientes/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Cliente removido com sucesso"

  Scenario: Remover um cliente inexistente
    Given que não existe um cliente com o ID 999
    When eu envio uma requisição DELETE para "/clientes/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Cliente não encontrado"