require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
