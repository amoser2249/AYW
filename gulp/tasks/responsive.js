// require modules
var $ = require('gulp-load-plugins')(),
  gulp = require('gulp');

gulp.task('responsive', function() {
    return gulp.src('app/images/*')
    .pipe($.responsive({
        'solarPanels.jpg': {
          width: 1000
        },
      }, {
        quality: 90,
        progressive: true,
        compressionLevel: 6,
        withMetadata: false,
        strictMatchImages: false,
        errorOnUnusedImage: false,
    }))
  .pipe(gulp.dest('dist/'));
});
