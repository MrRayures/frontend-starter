/*
* MrRayures - www.mr-rayures.com
* We <3 Gulp ;)
*/

// Set this variable according to your needs
const use_styleguide = true;
const use_utilities = true;


// Required
const { src, dest, series, parallel, watch, lastRun } = require('gulp');

// MISC
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const del = require('del');
const fs = require('fs');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const merge = require('merge-stream');
const browserSync = require('browser-sync');
const server = browserSync.create();


//CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

//HTML
const gulpnunjucks = require('gulp-nunjucks');
const htmlbeautify = require('gulp-html-beautify');
const embedSvg = require('gulp-embed-svg');


//JS
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

//IMG
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


//ICONS FONTS (optionnal if iconfont needed)
//const iconfont = require('gulp-iconfont');
//const iconfontCss = require('gulp-iconfont-css');


//SVG
const svgSprite = require('gulp-svg-sprite');
const sassInlineSvg = require('gulp-sass-inline-svg');
const svgmin = require('gulp-svgmin');


//PWA
const workboxBuild = require('workbox-build');

// Path variable
var source = 'src'; //Working folder
var prod = 'dist'; //Final folder


// Styleguide
const nunjucks = require('nunjucks')
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const export_sass = require('node-sass-export');


// Global parameter
var param_htmlbeautify = {
  indent_size: 2,
  indent_with_tabs: true,
  preserve_newlines: false
}


// Declare ENV for nunjucks and add support for {% markdown %}
const templates_path = "src/";
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates_path));
markdown.register(env, marked);


/*
* CSS task
* SASS + autoprefixer + sourcemaps
*/
function css() {

  var app = src([
			source + '/assets/styles/**/*.scss',
			'!'+ source + '/assets/styles/99-utilities/*.scss',
			'!'+ source + '/assets/styles/_vendor'
		], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(dest([prod + '/assets/css/'], {sourcemaps: '/map'}));

  var vendor = src([source + '/assets/_vendor/*.css'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(csso())
    .pipe(concat('vendor.css'))
    .pipe(dest([prod + '/assets/css/vendor.css']));

    return merge(app, vendor);
};



/*
* CSS minify
* Minify CSS for PROD
*/
function css_minify() {
  return src([prod + '/assets/css/*.css', '!'+ prod + '/assets/css/*min.css'], {sourcemaps: true})
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(prod + '/assets/css/', {sourcemaps: '/map'}));
};




/*
* HTML task
* Gulp nunjucks : JS templating engine
* Doc : https://mozilla.github.io/nunjucks/
* Bonus add cache bust tricks on CSS & JS : ?v=xxx
*/
var cbString = new Date().getTime();

function html() {
  return src([source + '/*.html'])
    .pipe(gulpnunjucks.compile({},{env: env}))
		.pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod))
};


function html_prod() {
  return src([source + '/*.html'])
  .pipe(gulpnunjucks.compile({
      css_min: true,
			js_min: true
    },{env: env}))
		.pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod))
};




/*
* JS task
* Build page specific js : page_name.js
* Concat + babel
*/
function js() {
  var app = src([source + '/assets/js/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    //.pipe(babel({ presets: ['env'] }))
    .pipe(concat('app.js'))
    .pipe(dest(prod + '/assets/js/'))

  var vendor = src([source + '/assets/js/vendor/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('vendor.js'))
    .pipe(dest(prod + '/assets/js/'))

    return merge(app, vendor);
};


/*
* JS-MINIFY
* Minify JS for PROD
*/
function js_minify() {
  return src([prod + '/assets/js/*.js', '!' + prod + '/assets/js/*.min.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(minify({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(dest(prod + '/assets/js/'))
};


/*
* IMG task
* minify images
*/
function img() {
  return src([source + '/assets/images/**/*.{png,jpg,jpeg,gif,svg}'], {since: lastRun(img)})
    .pipe(imagemin())
    .pipe(dest([prod + '/assets/images']));
};


/*
* If you need to convert image to webp
* Edit input & output folder as needed
*/
function img_webp() {
  return src(source + '/assets/images/*.{png,jpg,jpeg}')
    .pipe(webp())
    .pipe(dest(prod + '/assets/images/'));
}



/*
* ICONS task
* SVG sprite creation
* Drop svg icon in /assets/icons/
*/
const config = {
  mode: {
    symbol: {
      dest: 'sprite',
      example: true,
      sprite: 'icons.svg'
    }
  }
};

function icons() {
  return src(source +'/assets/icons/*')
    .pipe(svgSprite(config))
    .pipe(dest(prod + '/assets/icons'));
};

// Minify SVG
function icons_min() {
  return src(source +'/assets/icons/*')
    .pipe(svgmin({
      js2svg: {
         pretty: true
      },
      plugins: [
        {
          removeViewBox: false,
        },
        {
          removeDimensions: true,
        }
      ]
    }))
    .pipe(dest(source + '/assets/icons/'));
}

/*
* ICONS-CSS task
* Use svg in CSS with color option
* Drop svg icon in /assets/icons/
* Doc : https://www.npmjs.com/package/gulp-sass-inline-svg
*/
function icons_css(){
  return src(source +'/assets/icons/*')
    .pipe(sassInlineSvg({
      destDir: source + '/assets/styles/02-tools'
    }))
    .pipe(src(source + '/assets/styles/02-tools/_sass-inline-svg.scss'))
    .pipe(replace('call($functionname', 'call(get-function($functionname)'))
    .pipe(dest(source + '/assets/styles/02-tools'));
};


/*
* Embed SVG
* input in html <svg src="github-icon.svg" class="inline-svg"></svg> Or  <img src="github-icon.svg" class="inline-svg"/>
* output : <svg class="inline-svg"><!-- svg markup from github-icon.svg --></svg>
*/
function embed_svg() {
  return src([source + '/*.html'])
    .pipe(embedSvg({
      selectors: '.inline-svg', // only replace tags with the class inline-svg
      attrs: /class/ // only transfer/preserve class attribute
    }))
    .pipe(dest(prod));
}


/*
* ICONS FONT task in case of sprite don't fit the project
* Drop svg icon in /assets/glyphicons/
* SVG Format : 512x512px
*/
/*function icons_font() {
  src([source + '/assets/icons/*'], {base: 'src'})
    .pipe(dest(prod));

  return src(source +'/assets/icons/*')
    .pipe(iconfontCss({
      fontName: 'icons', // nom de la fonte, doit être identique au nom du plugin iconfont
      targetPath: '../scss/components/_icons.scss', // emplacement de la css finale
      fontPath: '../fonts/', // emplacement des fontes finales
      cssClass: 'icon'
    }))
    .pipe(iconfont({
      fontName: 'icons' // identique au nom de iconfontCss
    }))
    .pipe( dest([source + '/assets/fonts', prod + '/assets/fonts']));
};*/


/*
* Copying statics assets
* Need some rework
*/
function copy_assets() {

  var root_assets = src([source + '/*'])
    .pipe(dest([prod]));

  var favicons = src([source + '/assets/favicons/*'])
    .pipe(dest([prod + '/assets/favicons']));

  var fonts = src([source + '/assets/fonts/*'])
    .pipe(dest([prod + '/assets/fonts']));

  return merge(root_assets, favicons, fonts);
};



/*
* CSS utilities task
* Build the utilities class and contact to app.css
*/
function css_utilities() {
  return src([source + '/assets/styles/99-utilities/utilities.scss'], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(dest([prod + '/assets/css/'], {sourcemaps: '/map'}));
};

function concat_css_utilities() {
  return src([prod + '/assets/css/utilities.css', prod + '/assets/css/app.css'], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('app.css'))
    .pipe(dest([prod + '/assets/css/'], {sourcemaps: '/map'}));
};



/*
* Styleguide tasks
*/

function html_styleguide() {

  //DATA
  var css_animation = JSON.parse(fs.readFileSync('./src/styleguide/data/animation.json'));
  var css_box_shadow = JSON.parse(fs.readFileSync('./src/styleguide/data/box-shadow.json'));
  var css_breakpoints = JSON.parse(fs.readFileSync('./src/styleguide/data/breakpoints.json'));
  var css_colors = JSON.parse(fs.readFileSync('./src/styleguide/data/colors.json'));
  var css_font_families = JSON.parse(fs.readFileSync('./src/styleguide/data/font-families.json'));
  var css_font_sizes = JSON.parse(fs.readFileSync('./src/styleguide/data/font-sizes.json'));
  var css_font_weight = JSON.parse(fs.readFileSync('./src/styleguide/data/font-weight.json'));
  //var css_icons = JSON.parse(fs.readFileSync('./src/styleguide/data/icons.json'));
  var css_icons_size = JSON.parse(fs.readFileSync('./src/styleguide/data/icons-size.json'));
  var css_radius = JSON.parse(fs.readFileSync('./src/styleguide/data/radius.json'));
  var css_spacing = JSON.parse(fs.readFileSync('./src/styleguide/data/spacing.json'));
  var css_zindex = JSON.parse(fs.readFileSync('./src/styleguide/data/z-index.json'));

  var data = {
    css_animation: css_animation,
    css_box_shadow: css_box_shadow,
    css_breakpoints: css_breakpoints,
    css_colors: css_colors,
    css_font_families: css_font_families,
    css_font_sizes: css_font_sizes,
    css_font_weight: css_font_weight,
    //css_icons: css_icons,
    css_icons_size: css_icons_size,
    css_radius: css_radius,
    css_spacing: css_spacing,
    css_zindex: css_zindex
  }

  var index = src([
    source + '/styleguide/templates/layout-styleguide.html',
    source + '/styleguide/index.html'
  ])
    .pipe(gulpnunjucks.compile({},{env: env}))
    .pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod + '/styleguide'))

  var brand = src([source + '/styleguide/templates/brand/*.html'])
    .pipe(gulpnunjucks.compile(data,{env: env}))
    .pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod + '/styleguide/brand'))

  var components = src([source + '/styleguide/templates/components/*.html'])
    .pipe(gulpnunjucks.compile(data,{env: env}))
    .pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod + '/styleguide/components'))

  var objects = src([source + '/styleguide/templates/objects/*.html'])
    .pipe(gulpnunjucks.compile(data,{env: env}))
    .pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod + '/styleguide/objects'))

  var utilities = src([source + '/styleguide/templates/utilities/*.html'])
    .pipe(gulpnunjucks.compile(data,{env: env}))
    .pipe(htmlbeautify(param_htmlbeautify))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod + '/styleguide/utilities'))

    return merge(index, brand, components, objects, utilities)

};

function css_styleguide() {
  var app = src([source + '/styleguide/assets/styles/*.scss'], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest([prod + '/styleguide/assets/css/'], {sourcemaps: '/map'}));

  var vendor = src([source + '/styleguide/assets/styles/vendor/**/*.css'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(csso())
    .pipe(concat('vendor.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest([prod + '/styleguide/assets/css/'], {sourcemaps: '/map'}));

    return merge(app, vendor);
};

function js_styleguide() {
  var app = src([source + '/styleguide/assets/js/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    //.pipe(babel({ presets: ['env'] }))
    .pipe(concat('app.js'))
    .pipe(minify({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(dest(prod + '/styleguide/assets/js/'))

  var vendor = src([source + '/styleguide/assets/js/vendor/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('vendor.js'))
    .pipe(minify({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(dest(prod + '/styleguide/assets/js/'))

    return merge(app, vendor);
};



/*
* extract_settings task
* Extract scss settings for use with nunjucks render in html styleguide
* https://www.npmjs.com/package/node-sass-export
*/
function extract_settings() {
  return src(source + '/assets/styles/01-settings/*.scss')
    .pipe(sass({
      functions: export_sass('.')
    }))
    .on('error', function (e) {
      console.log(e);
    })
    .pipe(dest(source))
};


/*
* Clean task
*/
function clean() {
  return del([prod+'/**/*']);
};


/*
* Browser Sync task
*/
function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: prod
    }
  });
  done();
}


/*
* Service Worker with Workbox
* https://developers.google.com/web/tools/workbox/guides/codelabs/gulp
*/
function service_worker() {
  return workboxBuild.generateSW({
    globDirectory: 'dist',
    globPatterns: [
      '**/*.{html,json,js,css,jpg,webp,svg,png}',
    ],
    swDest: 'dist/sw.js',
  });
};




/*
* WATCH task
* CSS > compile and minify
* JS > compile & minify
* IMG > minify
* ICONS > SVG sprite & SVG css
* HTML > compile
*/
function watch_files() {

	/*
	* Application
	*/
  // CSS
  watch([
    source + '/assets/styles/**/*.scss',
    '!'+ source + '/assets/styles/01-settings/*.scss',
    '!'+ source + '/assets/styles/99-utilities/*.scss'
  ], series(css, use_styleguide ? styleguide : reload, reload))

  // CSS settings
  watch([
    source + '/assets/styles/01-settings/*.scss'
  ], series(use_utilities ? utilities : reload, use_styleguide ? css_styleguide : reload, reload))

  // CSS utilities
  watch([
    source + '/assets/styles/99-utilities/*.scss'
  ], series(use_utilities ? utilities : reload, use_styleguide ? styleguide : reload, reload))

  // JS
  watch([source + '/assets/js/*.js'], series(js, reload))

  // IMG
  watch([
    source + '/assets/images/*.{png,jpg,jpeg,gif,svg}',
    source + '/assets/images/**/*.{png,jpg,jpeg,gif,svg}'
  ], series(img, reload))

  // HTML
  watch([
    source + '/*.html',
    source + '/templates/**/*.html',
    '!'+ source + '/styleguide/*',
	], series(html, reload))


	/*
	* Styleguide
  */

	// CSS
	watch([
    source + '/styleguide/assets/styles/*.scss'
  ], series(css_styleguide, reload))

  // JS
	watch([
    source + '/styleguide/assets/js/*.js'
	], series(js_styleguide, reload))

  // HTML
  watch([
    source + '/styleguide/*.html',
    source + '/styleguide/templates/*.html',
    source + '/styleguide/templates/**/*.html'
	], series(html_styleguide, reload))

}




/*
* Public function
*/



const utilities = series(extract_settings, css, css_utilities, concat_css_utilities);
const styleguide = series(css_styleguide, html_styleguide, js_styleguide);

const build = series(clean, css, img, html, js, use_utilities ? utilities : html, use_styleguide ? styleguide : html);


// export simple task
exports.settings = extract_settings;
exports.img = img;
exports.webp = img_webp;
exports.embed_svg = embed_svg;
exports.css = css;
exports.js = js;
exports.html = html;
exports.html_prod = html_prod;
exports.icons = series(icons_min, icons, icons_css);
exports.copy = copy_assets;
exports.clean = clean;
exports.sw = service_worker;


/*
* gulp build
* > first build to start working
*/
exports.build = build;


/*
* gulp utilities
* Optionnal
* Build utilities & data
*/
exports.utilities = utilities;


/*
* gulp styleguide
* Optionnal
* Build styleguide
*/
exports.styleguide = styleguide;

/*
* Watch
* > dev task
*/
exports.watch = parallel(watch_files, serve);


/*
* Production
* > Go to prodution task
*/
exports.prod = series(clean, css, css_minify, img, webp, html_prod, js, js_minify, service_worker);







