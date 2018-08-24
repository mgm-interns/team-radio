const Path = require('path');
const Fs = require('fs');
const Dotenv = require('dotenv-webpack');

module.exports = (env = {}) => {
  const IS_PROD = env.NODE_ENV === 'production';

  const devRules = IS_PROD
    ? []
    : [
        {
          test: /\.ts$/,
          enforce: 'pre',
          exclude: /node_modules/,
          use: [
            {
              loader: 'prettier-loader',
              options: JSON.parse(Fs.readFileSync(Path.resolve('.prettierrc'), 'utf8'))
            }
          ]
        }
      ];

  return {
    mode: IS_PROD ? 'production' : 'development',
    optimization: {
      minimize: false,
      namedModules: true

    },
    entry: Path.resolve('src', 'index.ts'),
    target: 'node',
    externals: ['express',  'graphql-yoga', 'type-graphql', 'ws'],
    watch: env.watch === 'enable',
    output: {
      filename: 'bundle.js',
      path: Path.resolve('dist'),
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.mjs', '.ts', '.js', '.json'],
      modules: [Path.resolve('node_modules'), Path.resolve('..', 'node_modules'), Path.resolve('src')]
    },
    module: {
      rules: [
        ...devRules,
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new Dotenv({
        path: env.envFile
      })
    ]
  };
};
