'use strict';
const path = require('path');
const fractal = (module.exports = require('@frctl/fractal').create());


/*
* Give your project a title.
*/
fractal.set('project.title', 'Librairie Front');
fractal.set('project.version', 'v1.1');
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
        lightOrDark: function filterFunc(color){
            // Variables for red, green, blue values
            var r, g, b, hsp;
            
            // Check the format of the color, HEX or RGB?
            if (color.match(/^rgb/)) {

                // If RGB --> store the red, green, blue values in separate variables
                color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
                
                r = color[1];
                g = color[2];
                b = color[3];
            } 
            else {
                
                // If hex --> Convert it to RGB: http://gist.github.com/983661
                color = +("0x" + color.slice(1).replace( 
                color.length < 5 && /./g, '$&$&'));

                r = color >> 16;
                g = color >> 8 & 255;
                b = color & 255;
            }
            
            // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
            hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
            );

            // Using the HSP value, determine whether the color is light or dark
            if (hsp>127.5) {
                return 'light';
            } 
            else {
                return 'dark';
            }
        },
    },
    globals: {
        project_name :  'Librairie Front',
        client_name :  'DIG',
        img_path:  '../../images/'
    },
    extensions: {
        // extension-name: function extensionFunc(){}
    }
});

fractal.components.engine(nunj);
fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.set('label', 'Composants'); // default is 'Components'
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
  styles: ['default', '/_subtheme/assets/theme.css'],
  scripts: ['default','/_subtheme/assets/js/theme.js'],
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
        return value.toLocaleDateString('fr-FR');
      },
    }
  ],
  panels: ["html", "view", "context", "resources", "info", "notes"], //html, view, context, resources, info, notes
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


