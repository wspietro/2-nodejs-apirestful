import 'dotenv/config' // export valores .env em process.env (global)

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), // geralmente informado automaticamente, ambiente que estamos executando
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

// Given any Zod schema, you can call its .parse method to check data is valid. If it is, a value is returned with full type information! Otherwise, an error is thrown.
// retorna erro na validacao do schema (se houver)
// tratativa de erros
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalidd environment variables.')
}

export const env = _env.data
