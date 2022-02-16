const path = require( "path" );
const fs   = require( "fs" );
const sass = require( 'sass' );

//console.log( sass.info );
[{
  'inFile': path.join(__dirname, "src/assets/styles/scss/app.scss"),
  'outFile': path.join(__dirname, "dist/assets/css/app.css")
}].forEach(
  ({
    inFile,
    outFile
  }) => sass.render({
    file: inFile,
    outFile: outFile,
    outputStyle: 'expanded',
    sourceMap: false,
    sourceMapEmbed: false,
  },
  (error, result) => {
      if (error) {
          console.log("*** node-sass error ***", error);
          return;
      }

      fs.writeFile(
        outFile,
        result.css,
        (error) => {
          if (error) {
            console.log("*** write error ***", error);
            return;
          }
          console.log("  ", outFile, fs.statSync(outFile).size + ' bytes', '[built]');
        }
      );
      if (result.map) {
        fs.writeFile(
          outFile + '.map',
          result.map.toString(),
          (error) => {
            if (error) {
              console.log("*** write error ***", error);
              return;
            }
            console.log("  ", outFile + '.map', fs.statSync(outFile + '.map').size + ' bytes', '[built]');
          }
        );
      }
  })
);