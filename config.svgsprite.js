var sass = require('node-sass');
var inliner = require('sass-inline-svg')


sass.render({
  functions: {
    'svg': inliner('src/assets/icons/', {}),
    'inline-svg': inliner('src/assets/styles/', {})
  }
});