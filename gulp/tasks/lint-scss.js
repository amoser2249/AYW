// -------------------------------------
//   Task: lint:scss
// -------------------------------------

// require modules
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

// require custom modules
var customPlumber = require('../custom-modules/plumber');

gulp.task('lint:scss', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe($.scssLint({
			config: '.scss-lint.yml'
		}));
});