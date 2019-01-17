const Path = require('path');
const Fs = require('fs');
const { compose } = require('react-app-rewired');
const rewireTypescript = require('react-app-rewire-typescript');

module.exports = (config, env) => {
  // global config
  config = compose(rewireTypescript)(config, env);

  config.resolve.modules.push(Path.resolve(process.cwd(), 'src'));

  // Production config
  if (env === 'production') {
  }
  // Development config
  else {
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
  }
  return config;
};
