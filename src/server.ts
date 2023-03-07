import fastify from 'fastify'

const app = fastify()

// criando primeira rota
// http://localhost:3333/hello

app.get('/hello', () => {
  return 'Hello nodejs'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running')
  })
