
const path = require('path');

export default {
  entry: {
    app: './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }],
  },
};
