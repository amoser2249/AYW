// -------------------------------------
//   Task: clean:dev
// -------------------------------------
// Clean up CSS and generated HTML files in app directory

// require modules
var gulp = require('gulp'),
	del = require('del');

// Clean
gulp.task('clean:dev', function() {
	return del.sync([
		'app/css',
		'app/*.+(html|nunjucks)'
	]);
});

// Clean dist (with gulp-cache)
gulp.task('clean:dist', function() {
	return del.sync(['dist']);
})