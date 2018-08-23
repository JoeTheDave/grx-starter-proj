const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: '../dist',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GRX Application Starter Kit',
    }),
  ],
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
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
  },
};
