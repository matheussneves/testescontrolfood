Feature: Gerenciamento de Pedidos
  Como um administrador
  Quero gerenciar os pedidos do sistema
  Para criar, atualizar, visualizar e remover pedidos

  Scenario: Criar um novo pedido
    Given que eu tenho os dados válidos de um novo pedido
    When eu envio uma requisição POST para "/pedidos" com os dados do pedido
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Pedido criado com sucesso"

  Scenario: Criar um pedido com dados inválidos
    Given que eu tenho dados inválidos para o pedido
    When eu envio uma requisição POST para "/pedidos" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os pedidos
    When eu envio uma requisição GET para "/pedidos"
    Then eu devo receber um código de status 200
    And devo ver uma lista de pedidos com informações detalhadas

  Scenario: Listar um pedido por ID
    Given que existe um pedido com o ID 1
    When eu envio uma requisição GET para "/pedidos/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do pedido

  Scenario: Listar um pedido inexistente por ID
    Given que não existe um pedido com o ID 999
    When eu envio uma requisição GET para "/pedidos/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Pedido não encontrado"

  Scenario: Atualizar um pedido existente
    Given que existe um pedido com o ID 1
    And eu tenho os dados atualizados do pedido
    When eu envio uma requisição PUT para "/pedidos/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Pedido atualizado com sucesso"

  Scenario: Atualizar um pedido inexistente
    Given que não existe um pedido com o ID 999
    When eu envio uma requisição PUT para "/pedidos/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Pedido não encontrado"

  Scenario: Remover um pedido existente
    Given que existe um pedido com o ID 1
    When eu envio uma requisição DELETE para "/pedidos/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Pedido, entrega e pratos removidos com sucesso"

  Scenario: Remover um pedido inexistente
    Given que não existe um pedido com o ID 999
    When eu envio uma requisição DELETE para "/pedidos/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Pedido ou entrega não encontrados"