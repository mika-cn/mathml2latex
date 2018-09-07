const {test, convert} = require('./test_helper');


test("root", convert({
  from: '<mroot> <mn>27</mn> <mn>3</mn> </mroot>',
  to: '\\sqrt[3]{27}'
}));

test("sqrt-1", convert({
  from: ' <msqrt> <mn>4</mn> </msqrt> ',
  to: '\\sqrt{4}'
}));

test("sqrt-2", convert({
  from: ' <msqrt> <mn>4</mn> <mi>n</mi> </msqrt>',
  to: '\\sqrt{4n}'
}));
