Feature: Login na aplicação
  Como um usuário
  Quero realizar login na aplicação
  Para acessar as funcionalidades disponíveis

  Scenario: Login com sucesso
    Given que eu estou na página de login
    And eu preencho o campo "E-mail" com "usuario@exemplo.com"
    And eu preencho o campo "Senha" com "senha123"
    When eu clico no botão "Entrar"
    Then eu devo ser redirecionado para a página "/Home"
    And eu devo ver a mensagem "Login realizado com sucesso!"

  Scenario: Login com campos vazios
    Given que eu estou na página de login
    And eu deixo os campos "E-mail" e "Senha" vazios
    When eu clico no botão "Entrar"
    Then eu devo ver a mensagem de erro "Por favor, preencha todos os campos."

  Scenario: Login com credenciais inválidas
    Given que eu estou na página de login
    And eu preencho o campo "E-mail" com "usuario@exemplo.com"
    And eu preencho o campo "Senha" com "senhaInvalida"
    When eu clico no botão "Entrar"
    Then eu devo ver a mensagem de erro "Senha ou email invalido!"