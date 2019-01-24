const Path = require('path');
const Fs = require('fs');

/**
 * Generate aliased modules to synchronize with tsconfig.json
 */
const alias = getDirectories(Path.resolve('src')).reduce(
  (prev, curr) => {
    return {
      ...prev,
      [`@${curr}`]: Path.resolve(__dirname, `src/${curr}`)
    };
  },
  {
    '@App': Path.resolve(__dirname, 'src/App.tsx'),
    '@router': Path.resolve(__dirname, 'src/router.tsx')
  }
);

module.exports = {
  webpack: {
    alias,
    configure: (config, { env, paths }) => {

      config.module.rules.unshift({
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
      return config;
    }
  }
};

function isDirectory(source) {
  return Fs.lstatSync(source).isDirectory();
}

function getDirectories(source) {
  return Fs.readdirSync(source)
      .map(name => Path.resolve(source, name))
      .filter(isDirectory)
      .map(path => path.replace(/(.*)src\\/, ''));
}
