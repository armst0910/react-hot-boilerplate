var ExternalsPlugin = require('webpack-externals-plugin');
var path = require('path');

module.exports = {

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
        }
      }
    ]
  },

  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),
  ]

}
