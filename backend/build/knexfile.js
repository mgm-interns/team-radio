'use strict';

// Specify .env file path for Knex-cli to load the config
// to be able to run migrations and seedings
require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process && process.env && process.env.DATABASE_HOST || '127.0.0.1',
      port: process && process.env && process.env.DATABASE_PORT || '5432',
      user: process && process.env && process.env.DATABASE_USER || 'postgres',
      password: process && process.env && process.env.DATABASE_PASSWORD || '865301',
      database: process && process.env && process.env.DATABASE_NAME || 'team-radio-dev'
    }
  },
  staged: {
    client: 'pg',
    connection: `pg://${process && process.env && process.env.DATABASE_USER || 'postgres'}:${process && process.env && process.env.DATABASE_PASSWORD || '865301'}@${process && process.env && process.env.DATABASE_IP_ADDRESS || ''}/${process && process.env && process.env.DATABASE_NAME || 'team-radio-dev'}?host=/cloudsql/${process && process.env && process.env.DATABASE_INSTANCE_NAME || ''}`
  },
  production: {
    client: 'pg',
    connection: {
      host: `/cloudsql/${process && process.env && process.env.DATABASE_INSTANCE_NAME || ''}`,
      user: process && process.env && process.env.DATABASE_USER || 'postgres',
      password: process && process.env && process.env.DATABASE_PASSWORD || '865301',
      database: process && process.env && process.env.DATABASE_NAME || 'team-radio-dev'
    }
  }
};