const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'postcss-loader', 'sass?config=sassLoader'] },
    ]
  },
});
