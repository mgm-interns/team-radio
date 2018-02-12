var database = {};

database.driver = 'this is driver';
database.host = process.env.DATABASE_URL;
database.port = process.env.DATABASE_PORT;

module.exports = database;