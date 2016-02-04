// -------------------------------------
//   Task: lint:js
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

gulp.task('lint:js', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(customPlumber('JSHint Error'))
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.jshint.reporter('fail', {
			ignoreWarning: true,
			ignoreInfo: true
		}))
		.pipe($.jscs({
			fix: true,
			configPath: '.jscsrc'
		}))
		.pipe(gulp.dest('app/js'))
});