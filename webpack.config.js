
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    browser: './src/index-browser.js',
    server: './src/index-server.js'
  },
  output: {
    filename: 'mathml2latex-[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
