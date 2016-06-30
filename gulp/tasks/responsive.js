// require modules
var $ = require('gulp-load-plugins')(),
imageResize = require('gulp-image-resize'),
  gulp = require('gulp');

gulp.task('responsive', function() {
  gulp.src('./app/images/house-icon-refi-dark.png')
    .pipe(imageResize({
          width: 555,
          height: 250
    }))
  .pipe(gulp.dest('dist/'));
});
