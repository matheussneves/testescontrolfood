Feature: Gestão de Entregadores
  Como um administrador
  Quero gerenciar os entregadores do sistema
  Para adicionar, atualizar, visualizar e remover entregadores

  Scenario: Adicionar um novo entregador com sucesso
    Given que eu estou na página de gestão de entregadores
    And eu preencho o campo "Nome" com "Carlos Silva"
    And eu preencho o campo "Senha" com "senha123"
    And eu preencho o campo "Telefone" com "(11) 98765-4321"
    And eu preencho o campo "Veículo" com "Moto"
    And eu preencho o campo "Placa" com "ABC1234"
    When eu clico no botão "Salvar"
    Then eu devo ver a mensagem "Entregador salvo com sucesso."
    And o entregador "Carlos Silva" deve aparecer na lista de entregadores

  Scenario: Atualizar um entregador existente
    Given que eu estou na página de gestão de entregadores
    And existe um entregador com o nome "Carlos Silva"
    When eu clico no botão "Editar" do entregador "Carlos Silva"
    And eu atualizo o campo "Nome" para "Carlos Atualizado"
    And eu clico no botão "Salvar"
    Then eu devo ver a mensagem "Entregador salvo com sucesso."
    And o entregador "Carlos Atualizado" deve aparecer na lista de entregadores

  Scenario: Excluir um entregador existente
    Given que eu estou na página de gestão de entregadores
    And existe um entregador com o nome "Carlos Silva"
    When eu clico no botão "Excluir" do entregador "Carlos Silva"
    Then eu devo ver a mensagem "Entregador excluído com sucesso."
    And o entregador "Carlos Silva" não deve mais aparecer na lista de entregadores

  Scenario: Tentar adicionar um entregador com campos vazios
    Given que eu estou na página de gestão de entregadores
    And eu deixo os campos "Nome", "Senha", "Telefone", "Veículo" e "Placa" vazios
    When eu clico no botão "Salvar"
    Then eu devo ver a mensagem de erro "Falha ao salvar o entregador."