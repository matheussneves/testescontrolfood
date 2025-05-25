// Exemplo de uso no teste
cy.apiRequest({
  endpoint: '/pedidos',
  method: 'POST',
  body: {
    cliente_id_cliente: 1,
    entregador_id_entregador: 2,
    usuarios_id_usuario: 3,
    data_pedido: '2025-05-25',
    tempo_estimado: 30,
    entrega: {
      data_retirada: '2025-05-25',
      data_entrega: '2025-05-25',
      endereco: 'Rua Exemplo, 123',
    },
    pratos: [
      { id_prato: 1 },
      { id_prato: 2 },
    ],
  },
  headers: {
    Authorization: 'Bearer token_exemplo',
  },
}).then((response) => {
  expect(response.status).to.eq(201);
  expect(response.body.message).to.eq('Pedido criado com sucesso');
});