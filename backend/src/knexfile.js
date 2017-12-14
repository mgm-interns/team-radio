// Specify .env file path for Knex-cli to load the config
// to be able to run migrations and seedings
require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_INSTANCE,
  },
};
