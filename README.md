# PostCSS Remove At Rules [![Build Status][ci-img]][ci]

[PostCSS] plugin to remove at rules by name.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/erykpiast/postcss-remove-at-rules.svg
[ci]:      https://travis-ci.org/erykpiast/postcss-remove-at-rules

## Installation

```console
$ npm install postcss-remove-at-rules
```

## Usage

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var remove = require("postcss-remove-at-rules")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(remove({
    'font-face': '*' // Or an array of CSS rule props
  }))
  .process(css)
  .css
```

### Options

An object where each specified key is a CSS selector and each value is either `'*''` indicating that all rules for that
selector should be removed, a string matching the CSS property name to remove (e.g. `'font-style'`), or an array of
strings containing CSS properties to be removed (e.g. `['position', 'display']`).

See [PostCSS] docs for examples for your environment.
