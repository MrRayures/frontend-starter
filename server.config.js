const fractal = require('./fractal.config');
const server = fractal.web.server({
  watch: true
});

//server.on('error', err => logger.error(err.message));

server.start().then(function(){
  console.log(`Fractal server is now running.`);
  console.log(`Local URL: ${server.url}`);
  console.log(`Network URL: ${server.urls.sync.external}`);
});

server.stop();