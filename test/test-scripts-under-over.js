const {test, convert} = require('./test_helper');

test("munder", convert({
  from: `
    <munder>
      <mi>a</mi>
      <mi>i</mi>
    </munder>
  `,
  to: 'a\\limits_{i}'
}));


//-------------------------------------------------

test("mover", convert({
  from: `
    <mover>
      <mi>a</mi>
      <mi>i</mi>
    </mover>
  `,
  to: 'a\\limits^{i}'
}));

test("mover-overbrace", convert({
  from: `
    <mover>
      <mi>a</mi>
      <mi>&#9182;</mi>
    </mover>
  `,
  to: '\\overbrace{a}'
}));

test("mover-overbrace-2-layer-1", convert({
  from: `
    <mover>
      <mrow>
        <mover>
          <mrow><mi>x</mi><mo>+</mo><mo>...</mo><mo>+</mo><mo>x</mo></mrow>
          <mo>⏞</mo>
        </mover>
      </mrow>
      <mrow><mtext>k times</mtext></mrow>
    </mover>
  `,
  to: '\\overbrace{x + ... + x}\\limits^{\\text{k times}}'
}));

test("mover-overbrace-2-layer-2", convert({
  from: `
    <mover>
      <mrow>
      <mi>x</mi><mo>+</mo><mo>...</mo><mo>+</mo><mo>x</mo>
      </mrow>
      <mover>
      <mo>⏞</mo>
      <mrow>
      <mtext>k times</mtext>
      </mrow>
      </mover>
    </mover>
  `,
  to: '\\overbrace{x + ... + x}\\limits^{\\text{k times}}'
}));

//-------------------------------------------------

test("munderover", convert({
  from: `
    <munderover>
      <mi>a</mi>
      <mi>i</mi>
      <mi>n</mi>
    </munderover>
  `,
  to: 'a\\limits_{i}^{n}'
}));

/*
test("munderover-overbrace", convert({
  from: `
    <munderover>
      <mo>⏞</mo>
      <mrow>
      <mi>x</mi><mo>+</mo><mo>...</mo><mo>+</mo><mo>x</mo>
      </mrow>
      <mrow><mtext>k times</mtext></mrow>
    </munderover>
  `,
  to: '\\overbrace{x + ... + x}\\limits^{\\text{k times}}'
}));
*/
