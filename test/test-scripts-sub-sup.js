const {test, convert} = require('./test_helper');

test("msub", convert({
  from: '<msub><mi>a</mi><mi>22</mi></msub>',
  to: 'a_{22}'
}));

test("msup", convert({
  from: '<msup><mi>a</mi><mi>n</mi></msup>',
  to: 'a^{n}'
}));

test("msubsup", convert({
  from: `
      <msubsup>
        <mi>a</mi>
        <mi>i</mi>
        <mn>22</mn>
      </msubsup>
  `,
  to: 'a_{i}^{22}'
}));
