Feature: Gestão de Clientes
  Como um administrador
  Quero gerenciar os clientes do sistema
  Para adicionar, atualizar, visualizar e remover clientes

  Scenario: Adicionar um novo cliente com sucesso
    Given que eu estou na página de gestão de clientes
    And eu preencho o campo "Nome" com "João Silva"
    And eu preencho o campo "Telefone" com "123456789"
    And eu preencho o campo "Endereco" com "Rua Exemplo, 123"
    When eu clico no botão "Adicionar Cliente"
    Then eu devo ver a mensagem "Cliente criado com sucesso!"
    And o cliente "João Silva" deve aparecer na lista de clientes

  Scenario: Atualizar um cliente existente
    Given que eu estou na página de gestão de clientes
    And existe um cliente com o nome "João Silva"
    When eu clico no botão "Editar" do cliente "João Silva"
    And eu atualizo o campo "Nome" para "João Atualizado"
    And eu clico no botão "Atualizar Cliente"
    Then eu devo ver a mensagem "Cliente atualizado com sucesso!"
    And o cliente "João Atualizado" deve aparecer na lista de clientes

  Scenario: Excluir um cliente existente
    Given que eu estou na página de gestão de clientes
    And existe um cliente com o nome "João Silva"
    When eu clico no botão "Excluir" do cliente "João Silva"
    Then eu devo ver a mensagem "Cliente excluído com sucesso!"
    And o cliente "João Silva" não deve mais aparecer na lista de clientes

  Scenario: Tentar adicionar um cliente com campos vazios
    Given que eu estou na página de gestão de clientes
    And eu deixo os campos "Nome", "Telefone" e "Endereco" vazios
    When eu clico no botão "Adicionar Cliente"
    Then eu devo ver a mensagem de erro "Erro ao salvar cliente"