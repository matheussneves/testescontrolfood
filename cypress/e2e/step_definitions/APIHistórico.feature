Feature: Gerenciamento de Histórico
  Como um administrador
  Quero gerenciar os registros de histórico do sistema
  Para criar, atualizar, visualizar e remover registros de histórico

  Scenario: Criar um novo registro de histórico
    Given que eu tenho os dados válidos de um novo registro de histórico
    When eu envio uma requisição POST para "/historico" com os dados do registro
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Histórico criado com sucesso"

  Scenario: Criar um registro de histórico com dados inválidos
    Given que eu tenho dados inválidos para o registro de histórico
    When eu envio uma requisição POST para "/historico" com os dados inválidos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Dados inválidos"

  Scenario: Listar todos os registros de histórico
    When eu envio uma requisição GET para "/historico"
    Then eu devo receber um código de status 200
    And devo ver uma lista de registros de histórico

  Scenario: Listar um registro de histórico por ID
    Given que existe um registro de histórico com o ID 1
    When eu envio uma requisição GET para "/historico/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do registro de histórico

  Scenario: Listar um registro de histórico inexistente por ID
    Given que não existe um registro de histórico com o ID 999
    When eu envio uma requisição GET para "/historico/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Registro de histórico não encontrado"

  Scenario: Atualizar um registro de histórico existente
    Given que existe um registro de histórico com o ID 1
    And eu tenho os dados atualizados do registro
    When eu envio uma requisição PUT para "/historico/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Registro de histórico atualizado com sucesso"

  Scenario: Atualizar um registro de histórico inexistente
    Given que não existe um registro de histórico com o ID 999
    When eu envio uma requisição PUT para "/historico/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Registro de histórico não encontrado"

  Scenario: Remover um registro de histórico existente
    Given que existe um registro de histórico com o ID 1
    When eu envio uma requisição DELETE para "/historico/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Registro de histórico removido com sucesso"

  Scenario: Remover um registro de histórico inexistente
    Given que não existe um registro de histórico com o ID 999
    When eu envio uma requisição DELETE para "/historico/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Registro de histórico não encontrado"