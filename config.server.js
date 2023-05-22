/*
* params : https://www.npmjs.com/package/live-server
*/
var liveServer = require("live-server");

var params = {
	port: 3000, // Set the server port. Defaults to 8080.
	host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "dist/", // Set root directory that's being served. Defaults to cwd.
	open: false, // When false, it won't load your browser by default.
	watch: [["dist/assets/css/*.css", "dist/*.html", "dist/assets/js/*.js", "dist/assets/img/**/*.{jpg,jpeg,png,svg}"]],
	ignore: '', // comma-separated string for paths to ignore
	wait: 0, // Waits for all changes, before reloading. Defaults to 0 sec.
	logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);