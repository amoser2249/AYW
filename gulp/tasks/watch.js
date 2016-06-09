
// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('watch-js', ['lint:js'], browserSync.reload);

// Watches files for changes
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['watch-js']);
	gulp.watch([
		'app/templates/**/*',
		'app/pages/**/*.+(html|nunjucks)',
		'app/data.json'
	], ['nunjucks'])
});
