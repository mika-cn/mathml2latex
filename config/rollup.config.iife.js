import config from './rollup.config'

export default config({
  output: {
    file: 'dist/mathml2latex.js',
    format: 'iife',
    name: 'MathML2LaTeX'
  },
  browser: true
})
