var gulp = require('gulp');
var sassdoc = require('sassdoc');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');


gulp.task('sassdoc', function () {
  return gulp.src(config.sass.src)
    .pipe(sassdoc(config.sassdoc.options))
    .resume();
});