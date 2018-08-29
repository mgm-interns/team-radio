const Path = require('path');
const Fs = require('fs');
const Webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: Path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
    hot: true,
    stats: { colors: true },
    headers: { 'Access-Control-Allow-Origin': '*' },
    open: 'http://localhost:8080'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'prettier-loader',
            options: JSON.parse(Fs.readFileSync(Path.resolve('..', '.prettierrc'), 'utf8'))
          }
        ]
      }
    ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
