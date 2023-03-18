import { it, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

// contexto
describe('Traansactions routes', () => {
  beforeAll(async () => {
    await app.ready() // aguardar que o fastify termine de cadastrar os plugins, caso contrário, erro 404
  })

  afterAll(async () => {
    await app.close() // remover app da memoria
  })

  beforeEach(() => {
    // execSync executa comandos no terminal por dentro do app node
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
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

  it('should be able to list all transactions', async () => {
    const transactionMock = {
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    }

    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send(transactionMock)

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      }),
    ])
  })
})
