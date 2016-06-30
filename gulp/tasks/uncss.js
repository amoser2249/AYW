// -------------------------------------
//   Task: uncss
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('uncss', function() {
	return gulp.src('./app/css/gmr.css')
		.pipe($.uncss({
			html: ['./app/about.html', './app/aio.html', './app/contact-thanks.html', './app/contact.html', './app/exit.html', './app/financial-service-companies.html', './app/privacy.html', './app/terms.html'],
			ignore: ['@import']
		}))
		.pipe(gulp.dest('./app/prod/'));
});
