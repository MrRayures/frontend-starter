# :doughnut: Frontend starter

## Features
- Use [nunjucks](https://mozilla.github.io/nunjucks/) to keep our HTML organized into templates and partials.
- Use [SCSS](https://sass-lang.com/) to keep our CSS organized into logical components.
- Use [Browsersync](https://www.browsersync.io/) to automatically launch a development version of our website, reload the page whenever we change the HTML, and inject changes to CSS, JavaScript, and images

## Setup
You need to have [node](https://nodejs.org/) & [gulp](https://gulpjs.com/) installed locally to run this project.
```bash
  npm install
  gulp build
```

### Gulp main tasks
```bash
  gulp build # first build to start working
  gulp watch # Compilation and watch on all files
  gulp deploy # Before deploy : clean, build & minify
```

### Utility task
```bash
  gulp webp # convert "/assets/images/demo/*" to webp edit gulpfile.js to change path
  gulp icons # convert "/assets/icons/*.svg" files into a svg sprite
  gulp icons_css # convert "/assets/icons/*.svg" files into sass functions in order inline svgs in your css files and use as background-image icons
  gulp service_worker # create & setup a simple service worker for your web app to work offline
```


# Project guidelines
A little reading but to make it short : make it human readable ^^).

## CSS structure : ITCSS
- https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/

## Global namespace : BEMIT
- https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/
- http://bradfrost.com/blog/post/css-architecture-for-design-systems/
- http://getbem.com/naming/
- https://seesparkbox.com/foundry/bem_by_example

## Accessibility
- Tips : https://webaccessibility.guide/
- Checklist : https://a11yproject.com/checklist
- Tools : https://benrobertson.io/accessibility/tools-for-website-audits
