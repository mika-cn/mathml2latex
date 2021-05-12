
// https://github.com/substack/tape


const test = require('tape');
const MathML2LaTeX = require('../lib/mathml2latex.cjs.js');

function convert(options) {
  return (t) => {
    const {from, to} = options;
    t.plan(1);
    // Do the convert
    const mathmlHtml = mathml(from);
    const convertedLatex = MathML2LaTeX.convert(mathmlHtml);
    t.equal(convertedLatex, to);
  }
}

function mathml(innerHtml){
  return `<math xmlns="http://www.w3.org/1998/Math/MathML">${innerHtml}</math>`;
}

module.exports = {
  test: test,
  convert: convert
}
