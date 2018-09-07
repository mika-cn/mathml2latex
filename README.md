
# mathml2latex

It's a javascript library to convert mathML to latex

## build
```shell
npm run build
```

This will build 2 js file in dist directory.

* mathml2latex-browser.js (use this in browser environment)
* mathml2latex-server.js (use in node)

## usage

### load library

in browser environment
```html
<script src="mathml2latex-browser"></script>
```

in node
```javascript
const MathMl2LaTex = require('mathml2latex-server');
```

### convert mathml html
```javascript
const mathmlHtml = '<math display="block"><mfrac><mi>a</mi></mfrac></math>';
const latex = MathML2LaTeX.convert(mathmlHtml); // => \frac{a}{b}
```
