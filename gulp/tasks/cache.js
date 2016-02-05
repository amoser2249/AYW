// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

gulp.task('cache:clear', function(callback) {
	return $.cache.clearAll(callback)
});