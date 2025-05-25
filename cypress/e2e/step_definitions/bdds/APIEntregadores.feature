Feature: Gerenciamento de Entregadores
  Como um administrador
  Quero gerenciar os entregadores do sistema
  Para criar, atualizar, visualizar e remover entregadores

  Scenario: Criar um novo entregador
    Given que eu tenho os dados válidos de um novo entregador
    When eu envio uma requisição POST para "/entregadores" com os dados do entregador
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Entregador criado com sucesso"

  Scenario: Criar um entregador com dados inválidos
    Given que eu tenho dados inválidos para o entregador
    When eu envio uma requisição POST para "/entregadores" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os entregadores
    When eu envio uma requisição GET para "/entregadores"
    Then eu devo receber um código de status 200
    And devo ver uma lista de entregadores

  Scenario: Listar um entregador por ID
    Given que existe um entregador com o ID 1
    When eu envio uma requisição GET para "/entregadores/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do entregador

  Scenario: Listar um entregador inexistente por ID
    Given que não existe um entregador com o ID 999
    When eu envio uma requisição GET para "/entregadores/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Entregador não encontrado"

  Scenario: Atualizar um entregador existente
    Given que existe um entregador com o ID 1
    And eu tenho os dados atualizados do entregador
    When eu envio uma requisição PUT para "/entregadores/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Entregador atualizado com sucesso"

  Scenario: Atualizar um entregador inexistente
    Given que não existe um entregador com o ID 999
    When eu envio uma requisição PUT para "/entregadores/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Entregador não encontrado"

  Scenario: Remover um entregador existente
    Given que existe um entregador com o ID 1
    When eu envio uma requisição DELETE para "/entregadores/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Entregador removido com sucesso"

  Scenario: Remover um entregador inexistente
    Given que não existe um entregador com o ID 999
    When eu envio uma requisição DELETE para "/entregadores/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Entregador não encontrado"