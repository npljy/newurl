const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/index.js',
    path: path.resolve(__dirname, './'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'new-url'
    // // libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
  
}