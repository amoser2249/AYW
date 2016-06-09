var gulp = require('gulp'),
	runSequence = require('run-sequence');

// Consolidated dev phase task
gulp.task('default', function(callback) {
	runSequence(
		'clean:dev',
    ['sprites', 'lint:js'],
		['sass', 'nunjucks'],
		['browserSync', 'watch'],
		callback
	);
});
