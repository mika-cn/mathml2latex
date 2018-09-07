const {test, convert} = require('./test_helper');

test("multiscripts-simple", convert({
  from: `
    <mmultiscripts>
    <mn>G</mn> <!-- the base -->
    <mi>a</mi> <!-- sub-script 1 -->
    <mi>b</mi> <!-- super-script 2 -->
    </mmultiscripts>
  `,
  to: 'G_{a}^{b}'
}));

test("multiscripts-without-prescripts", convert({
  from: `
    <mmultiscripts>
    <mn>G</mn> <!-- the base -->

    <mi>i</mi> <!-- sub-script 1 -->
    <none />

    <mi>k</mi> <!-- sub-script 2 -->
    <mi>l</mi> <!-- super-script 2 -->

    <none />
    <mi>n</mi> <!-- super-script 3 -->
    </mmultiscripts>
  `,
  to: 'G_{i k \\:}^{\\: l n}'
}));

test('mmultiscripts-with-prescripts', convert({
  from: `
    <mmultiscripts>
    <mn>G</mn> <!-- the base -->

    <mi>i</mi> <!-- sub-script 1 -->
    <none />

    <mi>k</mi> <!-- sub-script 2 -->
    <mi>l</mi> <!-- super-script 2 -->

    <mprescripts />

    <none />
    <mi>a</mi> <!-- pre-super-script 1 -->

    <mi>b</mi> <!-- pre-sub-script 2 -->
    <mi>c</mi> <!-- pre-super-script 2 -->
    </mmultiscripts>
  `,
  to: '_{\\: b}^{a c}G_{i k}^{\\: l}'
}));
