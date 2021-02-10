/*
* MrRayures - www.mr-rayures.com
* We <3 Gulp ;)
*/

// Required
const { src, dest, series, parallel, watch, lastRun } = require('gulp');

// MISC
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");
const del = require('del');
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
const nunjucksRender = require('gulp-nunjucks-render');
const htmlbeautify = require('gulp-html-beautify');

//JS
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

//IMG
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive');

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



/*
* CSS task
* SASS + autoprefixer + sourcemaps
*/
function css() {
  var app = src([source + '/assets/scss/**/*.scss'], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(dest([prod + '/assets/css/'], {sourcemaps: '.'}));

  var vendor = src([source + '/assets/css/vendor/*.css'], { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(dest([prod + '/assets/css/vendor.css'], {sourcemaps: '.'}));

  return merge(app, vendor);
};


/*
* CSS-MINIFY
* Minify CSS for PROD
*/
function css_minify() {
  return src([prod + '/assets/css/*.css', '!'+ prod + '/assets/css/*min.css'], {sourcemaps: true})
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(prod + '/assets/css/', {sourcemaps: '.'}));
};


/*
* HTML task
* Gulp nunjucks : JS templating engine
* Doc : https://mozilla.github.io/nunjucks/
* Bonus add cache bust tricks on CSS & JS : ?v=xxx
*/
var cbString = new Date().getTime();

function html() {

  var app = src([source + '/*.html'])
    .pipe(nunjucksRender({
      path: [source + '/templates'],
      data: {
        img_path:  'assets/img/'
      }
    }))
    .pipe(htmlbeautify({
      indent_size: 2,
      indent_with_tabs: true,
      preserve_newlines: false
    }))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod))

  var styleguide = src([source + '/templates/styleguide/*.html'])
    .pipe(nunjucksRender({
      path: [source + '/templates'],
      data: {
        img_path:  'assets/img/'
      }
    }))
    .pipe(htmlbeautify({
      indent_size: 2,
      indent_with_tabs: true,
      preserve_newlines: false
    }))
    .pipe(replace(/v=\d+/g, 'v=' + cbString))
    .pipe(dest(prod+ '/styleguide/'))

    return merge(app, styleguide);
};


/*
* JS task
* Build page specific js : page_name.js
* Concat + babel
*/
function js() {
  var app = src([source + '/assets/js/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('app.js'))
    .pipe(dest(prod + '/assets/js/'))

  var vendor = src([source + '/assets/js/vendor/*.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel({ presets: ['env'] }))
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
* responsive IMG
*/
function img() {
  return src([source + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}'], {since: lastRun(img)})
    .pipe(imagemin())
    .pipe(dest([prod + '/assets/img']));
};

/*
* Generate responsive IMG
* Edit size and add as much as you want
*/
function img_responsive() {
  return src([source + '/assets/img/responsive/*.{png,jpg,jpeg}'], {since: lastRun(img_responsive)})
    .pipe(responsive({
      '*': [
        {width: 800, height: 800, rename: { suffix: '-800', extname: '.jpg'}},
        {width: 1600, height: 1600, rename: { suffix: '-1600', extname: '.jpg'}},
        {width: 800, height: 800, rename: { suffix: '-800', extname: '.webp'}},
        {width: 1600, height: 1600, rename: { suffix: '-1600', extname: '.webp'}}
      ]
    }))
    .pipe(dest([prod + '/assets/img/responsive/']));
};

/*
* If you need to generate placeholder
* Edit input & output folder as needed
*/
function img_placeholder() {
  return src([source + '/assets/img/default/*.{png,jpg,jpeg}'], {since: lastRun(img_placeholder)})
    .pipe(responsive({
      '*': [
        {width: 800, height: 800, rename: { suffix: '-800', format: '.jpg'}},
        {width: 1600, height: 1600, rename: { suffix: '-1600', format: '.jpg'}}
      ]
    }))
    .pipe(dest([prod + '/assets/img/default/']));
};


/*
* If you need to convert image to webp
* Edit input & output folder as needed
*/
function webp() {
  return src(source + '/assets/img/demo/*.{png,jpg,jpeg}')
    .pipe(responsive({
      '*': {format: 'webp'}
    }))
    .pipe(gulp.dest(prod + '/assets/img/demo/'));
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

function icons_min() {
  return src(source +'/assets/icons/*')
    .pipe(svgmin())
    .pipe(dest(source + '/assets/icons/'));
}


/*
* Embed SVG
* input in html <svg src="github-icon.svg" class="inline-svg"></svg>
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
* ICONS-CSS task
* Use svg in CSS with color option
* Drop svg icon in /assets/icons/
* Doc : https://www.npmjs.com/package/gulp-sass-inline-svg
*/
function icons_css(){
  return src(source +'/assets/icons/*') 
    .pipe(svgmin()) // Recommend using svg min to optimize svg files first
    .pipe(sassInlineSvg({
      destDir: source + '/assets/scss/helpers'
    }))
    .pipe(src(source + '/assets/scss/helpers/_sass-inline-svg.scss'))
    .pipe(replace('call($functionname', 'call(get-function($functionname)'))
    .pipe(dest(source + '/assets/scss/helpers'));
};


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
*/
function copy_assets() {

  var root_assets = src([source + '/*'])
    .pipe(dest([prod]));

  var favicons = src([source + '/assets/favicons/*'])
    .pipe(dest([prod + '/assets/favicons']));

  var fonts = src([source + '/assets/fonts/*'])
    .pipe(dest([prod + '/assets/fonts']));

  return merge(root_assets, fonts, favicons);
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
* Build the projet
* 
*/
const build = series(clean, css, copy_assets, img, html, js);

/*
* Define complex tasks
*/
const deploy = series(clean, css, css_minify, img, webp, copy_assets, html, js, js_minify, service_worker);


/*
* WATCH task
* CSS > compile and minify
* JS > compile & minify
* IMG > minify
* ICONS > SVG sprite & SVG css
* HTML > compile
*/
function watch_files() {
  watch([source + '/assets/scss/*.scss', source + '/assets/scss/**/*'], series(css, reload))
  watch([source + '/assets/js/*.js'], series(js, reload))
  watch([source + '/assets/img/*.{png,jpg,jpeg,gif,svg}', source + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}'], series(img, reload))
  watch([source + '/*.html', source + '/templates/**/*.html'], series(html, reload))
}




/*
* Public function
*/
exports.img = img;
exports.webp = webp;
exports.img_responsive = series(img_responsive, img_placeholder);
exports.css = series(css, css_minify);
exports.js = series(js, js_minify);
exports.html = html;
exports.icons = series(icons_min, icons);
exports.icons_min = icons_min;
exports.icons_css = icons_css;
exports.copy = copy_assets;
exports.clean = clean;
exports.sw = service_worker;
exports.build = build;
exports.watch = parallel(watch_files, serve);
exports.default = build;







