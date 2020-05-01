const knex = require("knex");

const config = require("../knexfile");

const dbEnv = process.env.ENVIRONMENT || 'development'

module.exports = knex(config[dbEnv]);