import config from './rollup.config'

export default config({
  output: {
    file: 'lib/mathml2latex.es.js',
    format: 'es'
  },
  browser: false
})
