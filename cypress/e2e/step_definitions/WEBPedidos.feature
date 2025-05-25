Feature: Gestão de Pedidos
  Como um administrador
  Quero gerenciar os pedidos do sistema
  Para adicionar, atualizar, visualizar e remover pedidos

  Scenario: Adicionar um novo pedido com sucesso
    Given que eu estou na página de gestão de pedidos
    And eu seleciono o cliente "João Silva"
    And eu seleciono o entregador "Carlos Souza"
    And eu seleciono os pratos "Pizza Margherita" e "Lasanha"
    And eu preencho o campo "Data do Pedido" com "2025-05-25T12:00"
    When eu clico no botão "Adicionar Pedido"
    Then eu devo ver a mensagem "Pedido adicionado com sucesso"
    And o pedido do cliente "João Silva" deve aparecer na lista de pedidos

  Scenario: Atualizar um pedido existente
    Given que eu estou na página de gestão de pedidos
    And existe um pedido do cliente "João Silva"
    When eu clico no botão "Editar" do pedido do cliente "João Silva"
    And eu atualizo o campo "Data do Pedido" para "2025-05-26T14:00"
    And eu clico no botão "Atualizar Pedido"
    Then eu devo ver a mensagem "Pedido atualizado com sucesso"
    And o pedido do cliente "João Silva" deve ter a data "26/05/2025 14:00" na lista de pedidos

  Scenario: Excluir um pedido existente
    Given que eu estou na página de gestão de pedidos
    And existe um pedido do cliente "João Silva"
    When eu clico no botão "Excluir" do pedido do cliente "João Silva"
    Then eu devo ver a mensagem "Pedido excluído com sucesso"
    And o pedido do cliente "João Silva" não deve mais aparecer na lista de pedidos

  Scenario: Tentar adicionar um pedido com campos vazios
    Given que eu estou na página de gestão de pedidos
    And eu deixo os campos "Cliente", "Entregador", "Pratos" e "Data do Pedido" vazios
    When eu clico no botão "Adicionar Pedido"
    Then eu devo ver a mensagem de erro "Erro ao salvar pedido"