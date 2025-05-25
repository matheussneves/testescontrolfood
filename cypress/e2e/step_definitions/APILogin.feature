Feature: Login no sistema
  Como um usuário
  Quero realizar login no sistema
  Para acessar minhas funcionalidades e permissões

  Scenario: Login bem-sucedido
    Given que eu tenho um email e senha válidos
    When eu envio uma requisição POST para "/login" com o email e a senha
    Then eu devo receber um código de status 200
    And devo ver a mensagem "Login realizado com sucesso"

  Scenario: Login com credenciais inválidas
    Given que eu tenho um email ou senha inválidos
    When eu envio uma requisição POST para "/login" com o email e a senha inválidos
    Then eu devo receber um código de status 401
    And devo ver a mensagem "Credenciais inválidas"

  Scenario: Login com campos vazios
    Given que eu não preenchi o email ou a senha
    When eu envio uma requisição POST para "/login" sem preencher todos os campos
    Then eu devo receber um código de status 400
    And devo ver a mensagem "Por favor, preencha todos os campos"