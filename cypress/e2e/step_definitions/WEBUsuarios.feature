Feature: Gestão de Usuários
  Como um administrador
  Quero gerenciar os usuários do sistema
  Para adicionar, atualizar, visualizar e remover usuários

  Scenario: Adicionar um novo usuário com sucesso
    Given que eu estou na página de gestão de usuários
    And eu preencho o campo "Nome" com "João Silva"
    And eu preencho o campo "Email" com "joao.silva@exemplo.com"
    And eu preencho o campo "Senha" com "senha123"
    And eu marco os acessos "Criar Usuário" e "Dashboard"
    When eu clico no botão "Salvar"
    Then eu devo ver a mensagem "Usuário criado com sucesso"
    And o usuário "João Silva" deve aparecer na lista de usuários

  Scenario: Atualizar um usuário existente
    Given que eu estou na página de gestão de usuários
    And existe um usuário com o nome "João Silva"
    When eu clico no botão "Editar" do usuário "João Silva"
    And eu atualizo o campo "Nome" para "João Atualizado"
    And eu clico no botão "Salvar"
    Then eu devo ver a mensagem "Usuário atualizado com sucesso"
    And o usuário "João Atualizado" deve aparecer na lista de usuários

  Scenario: Excluir um usuário existente
    Given que eu estou na página de gestão de usuários
    And existe um usuário com o nome "João Silva"
    When eu clico no botão "Excluir" do usuário "João Silva"
    Then eu devo ver a mensagem "Usuário excluído com sucesso"
    And o usuário "João Silva" não deve mais aparecer na lista de usuários

  Scenario: Tentar adicionar um usuário com campos vazios
    Given que eu estou na página de gestão de usuários
    And eu deixo os campos "Nome", "Email" e "Senha" vazios
    When eu clico no botão "Salvar"
    Then eu devo ver a mensagem de erro "Erro ao salvar usuário"