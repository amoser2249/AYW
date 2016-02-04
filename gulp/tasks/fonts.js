// require modules
var gulp = require('gulp');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});