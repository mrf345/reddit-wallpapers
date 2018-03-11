const path = require('path')
const Mini = require('babel-minify-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin'),
    library: 'redditWallpapers',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  plugins: [
    new Mini()
  ]
}
