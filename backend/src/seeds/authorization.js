const users = require('../seedData/authorization/userData');
// const users = [];

// eslint-disable-next-line func-names, no-unused-vars
exports.seed = function(knex, Promise) {
  return knex
    .table('users')
    .truncate()
    .then(() => knex.table('users').insert(users));
};
