// -------------------------------------
//   Task: uncss
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('uncss', function() {
	return gulp.src('app/css/pollhype.min.css')
		.pipe($.uncss({
			html: ['app/header.html']
		}))
		.pipe(gulp.dest('app/'));
});
