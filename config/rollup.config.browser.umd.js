import config from './rollup.config'

export default config({
  output: {
    file: 'lib/mathml2latex.browser.umd.js',
    format: 'umd',
    name: 'MathML2LaTeX'
  },
  browser: true
})
