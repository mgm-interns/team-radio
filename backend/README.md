# Team Radio Backend

Backend project for Team Radio

## Instruction

- Clone this project
- `cp .env.development .env`
- `npm i` to install dependencies
- `npm run migrate:rollback` or/and `npm run migrate:latest` to migrate the server
- `npm run dev` to start the server
- Open the browser and use `GRAPHIQL` to test the apis
- `npm run test` for `mocha` test
- `npm run lint` to run `eslint`

## Documents

- Start the server: `npm run dev`
- Run `npm run doc` to generate documents
- Open `doc/index.html` in the browser

## Big Note

- Please DO NOT write any ES6+ syntax in ./src/seeds. Knex JS runtime are not compiled by Babel. Writing any ES6+ syntax will make the application crash.
