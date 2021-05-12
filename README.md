
# mathml2latex

It's a javascript library to convert mathML to latex

## Build

Clone this repo and run `npm run build`, It'll generate belowing files:

```text
lib
├── mathml2latex.browser.cjs.js
├── mathml2latex.browser.es.js
├── mathml2latex.browser.umd.js
├── mathml2latex.cjs.js
├── mathml2latex.es.js
└── mathml2latex.umd.js
dist
└── mathml2latex.js
```

## usage

### load library

In browser environment, you need to build the library first, then load it:

```html
<script src="dist/mathml2latex.js"></script>
```


Using with npm

```shell
npm install mathml2latex
```

```javascript
const MathMl2LaTeX = require('mathml2latex')
```

### convert mathml html

```javascript
const mathmlHtml = '<math display="block"><mfrac><mi>a</mi><mi>b</mi></mfrac></math>';
const latex = MathML2LaTeX.convert(mathmlHtml); // => \frac{a}{b}
```
