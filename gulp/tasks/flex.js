// -------------------------------------
//   Task: flex
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	autoprefixer = require('autoprefixer'),
	flexboxfixer = require('postcss-flexboxfixer');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// flex task
gulp.task('flex', function() {
	return gulp.src('./app/css/styles.css')
		.pipe(customPlumber('Error Running Flex'))
		.pipe($.sourcemaps.init())
		.pipe($.postcss([ require('autoprefixer'), require('postcss-flexboxfixer') ]))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./app/optimized'));
});