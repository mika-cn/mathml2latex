const initMathML2LaTeX = require('./mathml2latex');
const domTool = require('./dom-tool-server');

const MathML2LaTeX = initMathML2LaTeX(domTool);

module.exports = MathML2LaTeX;
