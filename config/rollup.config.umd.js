import config from './rollup.config'

export default config({
  output: {
    file: 'lib/mathml2latex.umd.js',
    format: 'umd',
    name: 'MathML2LaTeX'
  }
})
