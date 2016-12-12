// require modules
  const gulp = require('gulp');
  const imageResize = require('gulp-image-resize');
  const imageminJpegtran = require('imagemin-jpegtran');
  const rename = require('gulp-rename');

gulp.task('jpeg', () => {
  return gulp.src('app/images/*')
    .pipe(imageResize({
      width: 1500,
      crop: false
    }))
    .pipe(imageminJpegtran({progressive: true})())
    .pipe(gulp.dest('dist/articleImages'))
    .pipe(rename({
      suffix: '--small'
    }))
    .pipe(imageResize({
      width: 640,
      crop: false
    }))
    .pipe(imageminJpegtran({progressive: true})())
  .pipe(gulp.dest('dist/articleImages'));
});


