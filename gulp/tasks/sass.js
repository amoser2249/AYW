// sass.js
// Compile SASS with sourcemaps, autoprefixer and automatically inject changes into browser
// app/bower_components defined as included path (aka easier referencing @import statements)
var config = require('../config');

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// sass task
gulp.task('sass', function() {
	return gulp.src('config.sass.src')
		.pipe(customPlumber('Error Running Sass'))
		.pipe($.sourcemaps.init())
		.pipe($.sass(config.sass.options))
		.pipe($.autoprefixer({
			browsers: ['ie 8-9', 'last 2 versions']
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('config.sass.dest'))
		.pipe(browserSync.reload({
			stream: true
		}));
});