// -------------------------------------
//   Task: uncss
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('uncss', function() {
	return gulp.src('./app/prod/gmr.css')
		.pipe($.uncss({
			html: ['./app/index.html'],
			ignore: ['@import']
		}))
		.pipe(gulp.dest('./app/css/'));
});
