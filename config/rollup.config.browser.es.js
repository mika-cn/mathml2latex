import config from './rollup.config'

export default config({
  output: {
    file: 'lib/mathml2latex.browser.es.js',
    format: 'es'
  },
  browser: true
})
