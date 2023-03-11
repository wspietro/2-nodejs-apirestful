import { Knex } from 'knex'

// açoes que a migration vai realizar no BD
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now).notNullable() // evitar erro na troca do banco knex.fn
  })
}

// reversão do up
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
