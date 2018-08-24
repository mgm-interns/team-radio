const Path = require('path');
const Fs = require('fs');
const Glob = require('glob');
const Dotenv = require('dotenv-webpack');
const NodeExternals = require('webpack-node-externals');

module.exports = (env = {}) => {
  return {
    ...getBaseConfig(env),
    entry: {
      // Main application bundle
      'bundle': Path.resolve('src', 'index.ts'),
      // Main migration service bundle
      'migrate': Path.resolve('src', 'config', 'migrations', 'migrate.ts'),
      // Migration files
      ...Glob.sync(Path.resolve('src', 'migrations') + '/**.*ts').reduce((current, entry) => {
        // Get standardize static page id
        // -> path under "migrations" without ".js"
        const id = entry.replace(/^.*\/?migrations\//, 'migrations/').replace(/\.(tsx|ts)/, '');
        current[id] = entry;
        return current;
      }, {})
    },
    output: {
      filename: '[name].js',
      path: Path.resolve(process.cwd(), 'dist'),
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: ['.ts'],
      modules: [Path.resolve('node_modules'), Path.resolve('..', 'node_modules'), Path.resolve('src')]
    }
  };
};

function getBaseConfig(env) {
  const IS_PROD = env.NODE_ENV === 'production';

  const config = {
    mode: IS_PROD ? 'production' : 'development',
    optimization: {
      minimize: false,
      namedModules: true
    },
    target: 'node',
    externals: [NodeExternals()],
    watch: env.watch === 'enable',

    module: {
      rules: [
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

  if (!IS_PROD) {
    config.module.rules.push({
      test: /\.ts$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: [
        {
          loader: 'prettier-loader',
          options: JSON.parse(Fs.readFileSync(Path.resolve('..', '.prettierrc'), 'utf8'))
        }
      ]
    });
  }

  return config;
}
