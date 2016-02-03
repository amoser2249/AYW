// sass.js
// Compile SASS with sourcemaps, autoprefixer and automatically inject changes into browser
// app/bower_components defined as included path (aka easier referencing @import statements)

// require modules
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	config = require('../config');

// BrowserSync Server
gulp.task('browserSync', function() {
	browserSync(config.browserSync);
});