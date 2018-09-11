const Path = require('path');
const Fs = require('fs');
const { getBabelLoader, compose } = require('react-app-rewired');
const rewireTypescript = require('react-app-rewire-typescript');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = (config, env) => {
  config = compose(
    rewireTypescript,
    rewireReactHotLoader
  )(config, env);

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    enforce: 'pre',
    exclude: /node_modules/,
    use: [
      {
        loader: 'prettier-loader',
        options: JSON.parse(Fs.readFileSync(Path.resolve('..', '.prettierrc'), 'utf8'))
      }
    ]
  });

  config.resolve.modules.push(Path.resolve(process.cwd(), 'src'));

  // Force all node_modules file js to go through babel-loader
  // Resolve graphql-ast-types issue
  if (env === 'production') {
    const babelLoader = getBabelLoader(config.module.rules);

    config.module.rules.push({
      test: /.js$/,
      include: /node_modules/,
      use: [{ loader: babelLoader.loader, options: babelLoader.options }]
    });
  }
  return config;
};
