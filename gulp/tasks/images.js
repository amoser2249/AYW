// require modules
var $ = require('gulp-load-plugins')(),
	gulp = require('gulp');

gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe($.cache($.imagemin(), {
			name: 'ayw'
		}))
		.pipe(gulp.dest('dist/images'))
});

