// arquivo de conexao com bd

import { knex as setupKnex, Knex } from 'knex'

export const knexConfig: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/db.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(knexConfig)
