// -------------------------------------
//   Task: browserSync
// -------------------------------------
// Nunjucks templating with data source & browserSync

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	fs = require('fs'),
	browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

gulp.task('nunjucks', function() {
	$.nunjucksRender.nunjucks.configure(['app/templates'], {
		watch: false
	});
	return gulp.src('app/pages/**/*.+(html|nunjucks)')
		.pipe($.debug())
		.pipe(customPlumber('Error Running Nunjucks'))
		.pipe($.debug())
		.pipe($.nunjucksRender({
			cdn: 'https://dn3nmb5yt1ysw.cloudfront.net'
		}))
		.pipe($.debug())
		.pipe(gulp.dest('app'))
		.pipe($.debug())
		.pipe(browserSync.reload({
			stream: true
		}));
});