const {test, convert} = require('./test_helper');

test("mfrac", convert({
  from: '<mfrac><mn>4</mn><mi>n</mi></mfrac>',
  to: '\\frac{4}{n}'
}));

test("binomial coefficients", convert({
  from: `
    <mrow>
    <mo> ( </mo>
    <mfrac linethickness="0">
      <mi>a</mi><mi>b</mi>
    </mfrac>
    <mo> ) </mo>
    </mrow>
  `,
  to: '\\binom{a}{b}'
}));

test("bevelled fraction", convert({
  from: `
    <mfrac bevelled="true">
      <mi>a</mi><mi>b</mi>
    </mfrac>
  `,
  to: '{}^{a}/_{b}'
}));
