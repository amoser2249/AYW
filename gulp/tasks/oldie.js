var gulp = require('gulp');

gulp.task('oldie', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    var pcFixes = require('postcss-fixes');


  return gulp.src('./app/css/out.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
          pcFixes({preset: 'enable-all'}),
          autoprefixer({ browsers: ['ie 10-11', 'last 2 versions'] })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});
