const { resolve } = require('path')
const { IgnorePlugin } = require('webpack')

module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'RedditWallpapers.min.js',
      library: 'RedditWallpapers',
      libraryTarget: 'window',
      libraryExport: 'default'
    },
    plugins: [new IgnorePlugin(/fs|tls|net|navigator|xmlhttprequest|location|child_process$/)],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }]
    }
  }
]
