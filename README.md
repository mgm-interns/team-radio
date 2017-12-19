
# TeamRadio

A playlist for teams that can be edited collaboratively by all users

## Demo

- *Reserved*

## Installation Guide

### Requirement

* NodeJS 8+

* NPM 5+

* MongoDB

### Production

* Clone this project

* Install dependencies
```
npm install
```

* Start the server
```
npm start
```

### Development

* Clone this project

* Install dependencies
```
npm install
```

* Generate environment variables

After install dependencies, the environment variables will be generated from env.production by default. You can add `--no-scripts` to skip that. (Example: `npm install --no-scripts`)

_Note_: Feel free to change these variables if you want to.

* Start packager
```
npm run dev
```
This script will start the packager for both backend & frontend

* If you just want to work on backend or frontend. There are 2 scripts that will be helpful for you:
```
npm run dev:backend
```
```
npm run dev:frontend
```

## CORS issue

This issue only appears in the development environment because the frontend & backend don't run on the same port.

We can solve this by installing this extension to allow CORS: 
- Chrome: [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

After installing this extension, add the server host address to the whitelist. For example: [http://localhost:8080/api/*]()
