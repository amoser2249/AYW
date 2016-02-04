// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe($.useref())
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.uncss({
			html: ['app/*.html'],
			ignore: [
				'.susy-test',
				/.is-/,
				/.has-/
			]
		})))
		.pipe($.if('*.css', $.cssnano()))
		.pipe(gulp.dest('dist'))
});