const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.js|\.jsx|\.es6$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
  output: {
    publicPath: '/static',
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
};
