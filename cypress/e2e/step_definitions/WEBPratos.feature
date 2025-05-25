Feature: Gestão de Pratos
  Como um administrador
  Quero gerenciar os pratos do sistema
  Para adicionar, atualizar, visualizar e remover pratos

  Scenario: Adicionar um novo prato com sucesso
    Given que eu estou na página de gestão de pratos
    And eu preencho o campo "Nome do Prato" com "Pizza Margherita"
    And eu preencho o campo "Preço" com "45.99"
    And eu preencho o campo "Tempo de Preparo (min)" com "30"
    And eu preencho o campo "Descrição do Prato" com "Pizza clássica com molho de tomate, queijo e manjericão"
    And eu seleciono os ingredientes "Tomate" e "Queijo"
    When eu clico no botão "Salvar Prato"
    Then eu devo ver a mensagem "Prato salvo com sucesso"
    And o prato "Pizza Margherita" deve aparecer na lista de pratos

  Scenario: Atualizar um prato existente
    Given que eu estou na página de gestão de pratos
    And existe um prato com o nome "Pizza Margherita"
    When eu clico no botão "Editar" do prato "Pizza Margherita"
    And eu atualizo o campo "Preço" para "49.99"
    And eu clico no botão "Salvar Prato"
    Then eu devo ver a mensagem "Prato atualizado com sucesso"
    And o prato "Pizza Margherita" deve ter o preço "R$ 49.99" na lista de pratos

  Scenario: Excluir um prato existente
    Given que eu estou na página de gestão de pratos
    And existe um prato com o nome "Pizza Margherita"
    When eu clico no botão "Excluir" do prato "Pizza Margherita"
    Then eu devo ver a mensagem "Prato excluído com sucesso"
    And o prato "Pizza Margherita" não deve mais aparecer na lista de pratos

  Scenario: Tentar adicionar um prato com campos vazios
    Given que eu estou na página de gestão de pratos
    And eu deixo os campos "Nome do Prato", "Preço", "Tempo de Preparo (min)", "Descrição do Prato" e "Ingredientes" vazios
    When eu clico no botão "Salvar Prato"
    Then eu devo ver a mensagem de erro "Erro ao salvar prato"