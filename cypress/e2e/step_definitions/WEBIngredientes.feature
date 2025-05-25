Feature: Gestão de Ingredientes
  Como um administrador
  Quero gerenciar os ingredientes do sistema
  Para adicionar, atualizar, visualizar e remover ingredientes

  Scenario: Adicionar um novo ingrediente com sucesso
    Given que eu estou na página de gestão de ingredientes
    And eu preencho o campo "Descrição" com "Tomate"
    And eu preencho o campo "Contém alérgicos" com "0"
    And eu preencho o campo "Informações nutricionais" com "Rico em vitamina C"
    When eu clico no botão "Adicionar Ingrediente"
    Then eu devo ver a mensagem "Ingrediente criado com sucesso"
    And o ingrediente "Tomate" deve aparecer na lista de ingredientes

  Scenario: Atualizar um ingrediente existente
    Given que eu estou na página de gestão de ingredientes
    And existe um ingrediente com a descrição "Tomate"
    When eu clico no botão "Editar" do ingrediente "Tomate"
    And eu atualizo o campo "Descrição" para "Tomate Atualizado"
    And eu clico no botão "Atualizar Ingrediente"
    Then eu devo ver a mensagem "Ingrediente atualizado com sucesso"
    And o ingrediente "Tomate Atualizado" deve aparecer na lista de ingredientes

  Scenario: Excluir um ingrediente existente
    Given que eu estou na página de gestão de ingredientes
    And existe um ingrediente com a descrição "Tomate"
    When eu clico no botão "Excluir" do ingrediente "Tomate"
    Then eu devo ver a mensagem "Ingrediente excluído com sucesso"
    And o ingrediente "Tomate" não deve mais aparecer na lista de ingredientes

  Scenario: Tentar adicionar um ingrediente com campos vazios
    Given que eu estou na página de gestão de ingredientes
    And eu deixo os campos "Descrição", "Contém alérgicos" e "Informações nutricionais" vazios
    When eu clico no botão "Adicionar Ingrediente"
    Then eu devo ver a mensagem de erro "Erro ao salvar ingrediente"