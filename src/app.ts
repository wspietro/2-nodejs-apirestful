import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

// fastify plugin
app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
