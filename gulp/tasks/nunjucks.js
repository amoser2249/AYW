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
		.pipe(customPlumber('Error Running Nunjucks'))
		.pipe($.data(function() {
			return JSON.parse(fs.readFileSync('./app/data.json'))
		}))
		.pipe($.nunjucksRender())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({
			stream: true
		}));
});