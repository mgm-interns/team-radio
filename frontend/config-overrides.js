/* eslint-disable */
var path = require('path');

module.exports = (config, env) => {
  config = Object.assign({}, config, {
    resolve: {
      modules: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules')
      ],
      alias: {
        '~': 'src',
      },
      extensions: ['.js', '.jsx']
    },
  });

  return config;
}
