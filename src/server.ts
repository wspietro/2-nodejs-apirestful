import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

// criando primeira rota
// http://localhost:3333/hello

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running')
  })
