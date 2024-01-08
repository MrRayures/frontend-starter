'use strict';
const path = require('path');
const fractal = (module.exports = require('@frctl/fractal').create());

//const subTheme = require('@frctl-themeDIG');
//const mandelbrot = require('@frctl/mandelbrot');


/*
 * Give your project a title.
 */
fractal.set('project.title', 'Styleguide');
fractal.set('project.version', 'v1.0');
fractal.set('project.author', 'DIG');


/*
 * Tell Fractal where to look for components.
 */
const nunj = require("@frctl/nunjucks")({
  paths: ["src/"],
  env: {
    // Nunjucks environment opts: https://mozilla.github.io/nunjucks/api.html#configure
  },
  filters: {
    // filter-name: function filterFunc(){}
    hexToRgb: function filterFunc(hex){
      return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    },

  },
  globals: {
    project_name :  'Styleguide',
    img_path:  '../../images/'
  },
  extensions: {
    // extension-name: function extensionFunc(){}
  }
});

fractal.components.engine(nunj);
fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.set('label', 'Styleguide'); // default is 'Components'
fractal.components.set('default.status', 'wip');
fractal.components.set('ext', '.html');
fractal.components.set('default.display', {
  'min-width': '320px'
});

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.engine(nunj);
fractal.docs.set('path', path.join(__dirname, 'src/docs'));
fractal.docs.set('indexLabel', 'Documentation');



/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.resolve(__dirname, 'src/assets'));


/*
 * Tell the Fractal where to output the build files.
 */
fractal.web.set('builder.dest', path.resolve(__dirname, 'dist/'));



fractal.web.set('server.sync', true);
fractal.web.set('server.syncOptions', {
  open: false,
  browser: ['firefox'],
  notify: false
});
fractal.web.set('server.watch', true);



/*
 * Theme
 * Docs : https://fractal.build/guide/web/default-theme.html#configuration
 */
const subTheme = require('@frctl/mandelbrot')({
  lang: 'fr',
  favicon: '/_subtheme/favicon.ico',
  skin: {
    name: 'black'
  },
  styles: ['default', '/_subtheme/theme.css'],
  information: [
    {
      label: 'Version',
      value: require('./package.json').version,
    },
    {
      label: 'Compilé le ',
      value: new Date(),
      type: 'time',
      format: (value) => {
        return value.toLocaleDateString('en-GB');
      },
    }
  ],
  panels: ["html", "resources"], //html, view, context, resources, info, notes
  labels: {
    search: {
      placeholder: 'Rechercher…',
    },
  },
});

// specify a directory to hold the theme override templates
subTheme.addLoadPath(__dirname + '/src/_subtheme/views/');
subTheme.addStatic(__dirname + '/src/_subtheme', '_subtheme');

fractal.web.theme(subTheme);


