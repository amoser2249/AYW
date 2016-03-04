// -------------------------------------
//   Task: dot
// -------------------------------------

// require modules
var  template = require('gulp-dot-template'),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('dot', function() {
	return gulp.src('auto/dot/clean_car.dot')
		.pipe(template({
			headline: 'Hello'
		}))
		.pipe(gulp.dest('auto/html'));
});
