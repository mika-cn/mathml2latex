const {test, convert} = require('./test_helper');

test('mfenced-default', convert({
  from: `
    <mfenced>
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
    </mfenced>
  `,
  to: '\\left(1,2,3\\right)'
}));

test('mfenced-empty-separators', convert({
  from: `
    <mfenced separators=''>
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
    </mfenced>
  `,
  to: '\\left(123\\right)'
}));

test('mfenced-custom-separators', convert({
  from: `
    <mfenced separators='.'>
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
    </mfenced>
  `,
  to: '\\left(1.2.3\\right)'
}));

test('mfenced-multiply-separators', convert({
  from: `
    <mfenced separators='.,  _ '>
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
      <mn>4</mn>
      <mn>5</mn>
    </mfenced>
  `,
  to: '\\left(1.2,3_4_5\\right)'
}));

test('mfenced-empty-open', convert({
  from: `
    <mfenced open="">
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
    </mfenced>
  `,
  to: '1,2,3\\right)'
}));

test('mfenced-custom-open', convert({
  from: `
    <mfenced open="{">
      <mn>1</mn>
      <mn>2</mn>
      <mn>3</mn>
    </mfenced>
  `,
  to: '\\left\\{1,2,3\\right)'
}));
