// -------------------------------------
//   Task: sass
// -------------------------------------

// Compile SASS with sourcemaps, autoprefixer and automatically inject changes into browser
// app/bower_components defined as included path (aka easier referencing @import statements)

// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	browserSync = require('browser-sync');

// require custom modules
var customPlumber = require('../custom-modules/plumber');


// sass task
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(customPlumber('Error Running Sass'))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			includePaths: ['app/bower_components', 'node_modules']
		}))
		.pipe($.autoprefixer({
			browsers: ['ie 8-9', 'last 2 versions']
		}))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});