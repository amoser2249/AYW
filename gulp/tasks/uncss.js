// -------------------------------------
//   Task: uncss
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

// BrowserSync Server
gulp.task('uncss', function() {
	return gulp.src('./app/css/cmeb.css')
		.pipe($.uncss({
			html: ['./app/index.html', './app/about-us.html', './app/aio.html', './app/contact-thanks.html', './app/contact.html', './app/energy-companies.html', './app/exit.html', './app/loader.html', './app/offers.html', './app/privacy.html', './app/terms.html'],
			ignore: ['@import']
		}))
		.pipe(gulp.dest('./app/prod/'));
});
