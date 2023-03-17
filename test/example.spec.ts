import { test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready() // aguardar que o fastify termine de cadastrar os plugins, caso contrário, erro 404
})

afterAll(async () => {
  await app.close() // remover app da memoria
})

test('o usuario consegue criar nova transação', async () => {
  const transactionMock = {
    title: 'New Transaction',
    amount: 5000,
    type: 'credit',
  }

  // servidor http node puro (por baixo de todo framework sempre existe o servidor do node)
  // supertest precisa receber esse servidor do node como parametro
  const response = await request(app.server)
    .post('/transactions')
    .send(transactionMock)

  expect(response.statusCode).toEqual(201)
})
