// -------------------------------------
//   Task: uncss
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('uncss', function() {
	return gulp.src('auto/old-css/gmi.css')
		.pipe($.uncss({
			html: ['auto/content.html'],
			ignore: ['@import']
		}))
		.pipe(gulp.dest('auto/css'));
});
