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

test("mo-relation-char-0", convert({
  from: '<mo>&lt;</mo>',
  to: ' < '
}));

// ~ small Tilde
test("mi-relation-char-wave-1", convert({
  from: '<mo>&#126;</mo>',
  to: ' \\sim '
}));

// ∼ Tilde Operator (it's different to above ...)
test("mi-relation-char-wave-2", convert({
  from: '<mo>&#8764;</mo>',
  to: ' \\sim '
}));


test("mo-math-func-name", convert({
  from: '<mo>lim</mo>',
  to: '\\lim '
}));

test("mo-N-Ary-Summation", convert({
  from: '<mo> ∑ </mo>',
  to: '\\sum '
}));

// overlap names
function testOverlapFunName(name) {
  test(`mo-math-func-name(overlap): ${name}`, convert({
    from: `<mo>${name}</mo>`,
    to: `\\${name} `
  }));
}

// copy from src/math-symbol.js
const names = [
  "arcsin" , "sinh"   , "sin" , "sec" ,
  "arccos" , "cosh"   , "cos" , "csc" ,
  "arctan" , "tanh"   , "tan" ,
  "arccot" , "coth"   , "cot" ,

  "limsup" , "liminf" , "exp" , "ker" ,
  "deg"    , "gcd"    , "lg"  , "ln"  ,
  "Pr"     , "sup"    , "det" , "hom" ,
  "lim"    , "log"    , "arg" , "dim" ,
  "inf"    , "max"    , "min" ,
];

names.forEach(testOverlapFunName)


test("mo-math-func-name(overlap), multiply names", convert({
  from: '<mo>sin</mo><mo>sinh</mo>',
  to: '\\sin \\sinh ',
}));
