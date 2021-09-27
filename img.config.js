const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngcrush = require('imagemin-pngcrush');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');

(async() => {
  const files = await imagemin(['src/assets/img/**/*.{jpg,jpeg,png,svg}'],{
      destination: 'dist/assets/img',
      preserveDirectories: true,
      plugins: [
        imageminMozjpeg({quality: 70}),
        imageminPngcrush(),
        imageminPngquant(),
        imageminZopfli({more: true})
      ]
    }
  );
  console.log('Images optimized')
  //console.log(files);
})();