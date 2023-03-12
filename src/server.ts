import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transaction'

const app = fastify()

// criando primeira rota
// http://localhost:3333/hello

app.register(transactionsRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server running')
  })
