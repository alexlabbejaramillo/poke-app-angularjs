const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['ng-annotate', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2$/,
        loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=image/svg+xml' }
    ]
  },
  devtool: 'source-map',
  resolve: {
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, '..', 'src/scss')],
    sourceMap: true
  },

  postcss() {
    return [autoprefixer];
  }
};
