'use strict';
const path = require('path');
const fractal = (module.exports = require('@frctl/fractal').create());
const mandelbrot = require('@frctl/mandelbrot');


/*
 * Give your project a title.
 */
fractal.set('project.title', 'Librairie de composants');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'DIG');


/*
 * Tell Fractal where to look for components.
 */
const nunj = require("@frctl/nunjucks")({
  paths: ["dist/"]
});

fractal.components.engine(nunj);
fractal.components.set('path', path.join(__dirname, 'src/styleguide/components'));
fractal.components.set('label', 'Styleguide'); // default is 'Components'
fractal.components.set('ext', '.html');

fractal.components.set('default.context', {
	'figma': null
});



/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.engine(nunj);
fractal.docs.set('path', path.join(__dirname, 'src/styleguide/docs'));
fractal.docs.set('indexLabel', 'Documentation');



/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'dist/assets'));


/*
 * Tell the Fractal where to output the build files.
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist/styleguide/'));



fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
  open: true,
  browser: ['firefox'],
  notify: true
});
fractal.web.set('server.watch', true);



/*
 * Theme
 * Docs : https://fractal.build/guide/web/default-theme.html#configuration
 */
const myCustomisedTheme = require('@frctl/mandelbrot')({
  lang: 'fr',
  skin: {
    name: 'black',
    //accent: '#333333',
    //complement: '#FFFFFF',
    //links: '#000000',
  },
  information: [
    {
      label: 'Version',
      value: require('./package.json').version,
    },
    {
      label: 'Built on',
      value: new Date(),
      type: 'time',
      format: (value) => {
        return value.toLocaleDateString('en');
      },
    },
  ],
  panels: ["html", "view", "context", "resources", "info", "notes", "figma"], //html, view, context, resources, info, notes
  labels: {
    search: {
      placeholder: 'Rechercher…',
    },
  },
});

// specify a directory to hold the theme override templates
myCustomisedTheme.addLoadPath(__dirname + '/src/styleguide/theme-overrides');

fractal.web.theme(myCustomisedTheme);


