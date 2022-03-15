//var scssVariables = require('patternlab-scssvariables');
var scssVariables = require('./index.js');

//Color
/*
var settings = {
  "src": "src/assets/styles/scss/01-settings/colors.scss",
  "dest": "src/styleguide/components/01-design/color/color.config.json",
};
scssVariables(settings);
*/

//Font
var settings = {
  "src": "src/assets/styles/scss/01-settings/typography.scss",
  "dest": "src/styleguide/components/01-design/font/font.config.json",
};
scssVariables(settings);