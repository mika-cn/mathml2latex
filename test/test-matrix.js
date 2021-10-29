const {test, convert} = require('./test_helper');

const tableRows = `
  <mtr>
    <mtd><mi>a</mi></mtd>
    <mtd><mi>b</mi></mtd>
    <mtd><mi>c</mi></mtd>
  </mtr>
  <mtr>
    <mtd><mi>d</mi></mtd>
    <mtd><mi>e</mi></mtd>
    <mtd><mi>f</mi></mtd>
  </mtr>
`;


test("matrix without brackets", convert({
  from: `<mtable>${tableRows}</mtable>`,
  to: '\\begin{matrix} a & b & c \\\\ d & e & f \\\\  \\end{matrix}'
}));


// Brackets
//
// ( ) Round brackets or parentheses
// [ ] Square brackets or brackets
// { } Curly brackets or braces
// ⟨ ⟩ Angle brackets or chevrons


test("matrix with Round brackets (parentheses)", convert({
  from: `<mrow><mo>(</mo><mtable>${tableRows}</mtable><mo>)</mo></mrow> `,
  to: '\\left(\\begin{matrix} a & b & c \\\\ d & e & f \\\\  \\end{matrix}\\right)'
}));


// issue 17
test("mtd has more than one child", convert({
  from: `
  <mtable>
     <mtr>
        <mtd>
           <mn>1</mn>
           <mo>⋅</mo>
           <mn>2</mn>
        </mtd>
     </mtr>
     <mtr>
        <mtd>
           <mn>3</mn>
           <mo>⋅</mo>
           <mn>4</mn>
        </mtd>
     </mtr>
  </mtable>
  `,
  to: '\\begin{matrix} 1 \\cdot 2 \\\\ 3 \\cdot 4 \\\\  \\end{matrix}'
}));
