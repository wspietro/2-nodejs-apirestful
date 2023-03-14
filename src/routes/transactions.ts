import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

// fastify plugin
// route prefix: transactions
export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first() // first não retorna array

    return { transaction }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    // Given any Zod schema, you can call its .parse method to check data is valid. If it is, a value is returned with full type information! Otherwise, an error is thrown.
    // retorna erro na validacao do schema (se houver)
    // tratativa de erros
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/', // para quais rotas o cookie estará disponível
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // creating transaction
    // Em rotas de criação, geralmente não fazemos retornos (bd), apenas códigos HTTP.
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
