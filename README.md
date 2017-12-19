# **Welcome to the team-radio wiki!**

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

## Document

* Development

```
npm run dev
```

* Production

```
npm start
```

## Editor & Code convention

We recommend using VS Code to enhance coding experience. You can download it from [here](https://code.visualstudio.com).

Recommend extensions for VS Code:
- Babel ES6/ES7
- Editor Config for VS Code
- ESLint
- Prettier-Standard - JavaScript formatter
- jsx

Use these file for better code convention.

`.editorconfig`
```
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

`.vscode/setting.json`
```
{
  "javascript.validate.enable": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "prettier.tabWidth": 2,
  "eslint.autoFixOnSave": true
}
```
