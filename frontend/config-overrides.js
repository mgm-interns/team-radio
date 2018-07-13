const path = require('path');

module.exports = config =>
  Object.assign({}, config, {
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src'),
      ],
    },
  });
