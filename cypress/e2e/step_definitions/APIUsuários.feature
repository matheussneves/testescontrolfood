Feature: Gerenciamento de Usuários
  Como um administrador
  Quero gerenciar os usuários do sistema
  Para criar, atualizar, visualizar e remover usuários

  Scenario: Criar um novo usuário
    Given que eu tenho os dados válidos de um novo usuário
    When eu envio uma requisição POST para "/usuarios" com os dados do usuário
    Then eu devo receber um código de status 201
    And devo ver a mensagem "Usuário criado com sucesso"

  Scenario: Listar todos os usuários
    When eu envio uma requisição GET para "/usuarios"
    Then eu devo receber um código de status 200
    And devo ver uma lista de usuários

  Scenario: Listar um usuário por ID
    Given que existe um usuário com o ID 1
    When eu envio uma requisição GET para "/usuarios/1"
    Then eu devo receber um código de status 200
    And devo ver os detalhes do usuário

  Scenario: Listar um usuário inexistente por ID
    Given que não existe um usuário com o ID 999
    When eu envio uma requisição GET para "/usuarios/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Usuário não encontrado"

  Scenario: Atualizar um usuário existente
    Given que existe um usuário com o ID 1
    And eu tenho os dados atualizados do usuário
    When eu envio uma requisição PUT para "/usuarios/1" com os dados atualizados
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Usuário atualizado com sucesso"

  Scenario: Atualizar um usuário inexistente
    Given que não existe um usuário com o ID 999
    When eu envio uma requisição PUT para "/usuarios/999" com os dados atualizados
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Usuário não encontrado"

  Scenario: Remover um usuário existente
    Given que existe um usuário com o ID 1
    When eu envio uma requisição DELETE para "/usuarios/1"
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Usuário removido com sucesso"

  Scenario: Remover um usuário inexistente
    Given que não existe um usuário com o ID 999
    When eu envio uma requisição DELETE para "/usuarios/999"
    Then eu devo receber um código de status 404
    And devo ver a mensagem "Usuário não encontrado"