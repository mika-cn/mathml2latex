const {test, convert} = require('./test_helper');

test("vertical bar", convert({
  from: `
    <mo>|</mo>
    <mi>a</mi>
    <mo>|</mo>
  `,
  to: '\\left|a\\right|'
}));

test('vertical double bar', convert({
  from: `
    <mo>‖</mo>
    <mi>a</mi>
    <mo>‖</mo>
  `,
  to: '\\left\\|a\\right\\|'
}));

test('vertical bar multiply', convert({
  from: `
    <mo>|</mo><mi>a</mi><mo>|</mo>
    <mo>+</mo>
    <mo>|</mo><mi>b</mi><mo>|</mo>
    <mo>=</mo>
    <mn>4</mn>
  `,
  to: '\\left|a\\right| + \\left|b\\right| = 4'
}));

test('special brackets', convert({
  from: `
    <mo>⟨</mo>
    <mi>a</mi>
    <mo>⟩</mo>
  `,
  to: '\\left\\langle a \\right\\rangle'
}));


test('brackets-with-stretchy-false', convert({
  from: `
    <mo stretchy="false">{</mo>
    <mi>a</mi>
    <mo stretchy="false">}</mo>
  `,
  to: '\\{a\\}'
}));

// test a delimiter on only one side of expression is required
// \left.\frac{x^3}{3}\right|_0^1
