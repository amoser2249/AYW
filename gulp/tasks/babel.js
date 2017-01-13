// -------------------------------------
//   Task: babel
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
  gulp = require('gulp');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');


// babel task
gulp.task('babel', function() {
  return gulp.src(config.js.src)
    .pipe(customPlumber('Error Running Babel'))
    .pipe($.babel())
    .pipe(gulp.dest(config.js.dest))
});
