const {test, convert} = require('./test_helper');

// ---------- math identifier -----------
test("mi-normal-char", convert({
  from: '<mi>x</mi>',
  to: 'x'
}));

test("mi-greek-letter-alpha", convert({
  from: '<mi>&#945;</mi>',
  to: '\\alpha '
}));

test("mi-math-func-name", convert({
  from: '<mi>cos</mi>',
  to: '\\cos '
}));

// ---------- math operation -----------
test("mo-normal-char", convert({
  from: '<mo>mod</mo>',
  to: 'mod'
}));

test("mo-binary-operator", convert({
  from: ' <mo>+</mo>',
  to: ' + '
}));

test("mo-relation", convert({
  from: '<mo>&lt;</mo>',
  to: ' < '
}));

test("mo-math-func-name", convert({
  from: '<mo>lim</mo>',
  to: '\\lim '
}));

test("mo-N-Ary-Summation", convert({
  from: '<mo> ∑ </mo>',
  to: '\\sum '
}));
