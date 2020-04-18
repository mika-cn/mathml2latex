
# mathml2latex

It's a javascript library to convert mathML to latex

## build

```shell
npm run build
```

It will build 2 js file in dist directory.

* mathml2latex-browser.js (use this file in browser environment)
* mathml2latex-server.js (use this file in node)

## usage

### load library

in browser environment

```html
<script src="mathml2latex-browser.js"></script>
```

in node

```javascript
const MathMl2LaTex = require('mathml2latex-server');
```

or using in npm

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
