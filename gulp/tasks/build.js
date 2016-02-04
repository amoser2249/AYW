var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', function(callback) {
	runSequence(
		['clean:dev', 'clean:dist'],
		['sprites', 'lint:js', 'lint:scss'],
		['sass', 'nunjucks'],
		['useref', 'images', 'fonts', 'test'],
		callback
	);
});
