// -------------------------------------
//   Task: sass
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');


// sass task
gulp.task('sass', function() {
	return gulp.src(config.sass.src)
		.pipe(customPlumber('Error Running Sass'))
		.pipe($.sourcemaps.init())
		.pipe($.sass(config.sass.options))
		.pipe($.autoprefixer({
			browsers: ['ie 10-11', 'last 2 versions']
		}))
		.pipe(gulp.dest(config.sass.dest))
		.pipe($.sourcemaps.write())
		.pipe(browserSync.reload({
			stream: true
		}));
});
