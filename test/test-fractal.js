const {test, convert} = require('./test_helper');

test("mfrac", convert({
  from: '<mfrac><mn>4</mn><mi>n</mi></mfrac>',
  to: '\\frac{4}{n}'
}));

test("mfrac linethickness is none", convert({
  from: `
  <mrow>
    <mfrac linethickness="0">
      <mi>a</mi><mi>b</mi>
    </mfrac>
  </mrow>
  `,
  to: '{}_{b}^{a}'
}));

test("binomial coefficients-0", convert({
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

test("binomial coefficients-0px", convert({
  from: `
    <mrow>
    <mo> ( </mo>
    <mfrac linethickness="0px">
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
