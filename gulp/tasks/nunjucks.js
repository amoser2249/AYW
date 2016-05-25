// require modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var fs = require('fs');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');

// Templating
gulp.task('nunjucks', function() {
  $.nunjucksRender.nunjucks.configure(config.nunjucks.templates, {
    watch: false
  });
  return gulp.src(config.nunjucks.src)
    .pipe(customPlumber('Error Running nund'))
    .pipe($.data(function() {
      return JSON.parse(fs.readFileSync(config.nunjucks.data));
    }))
    .pipe($.nunjucksRender({cdn: 'https://dn3nmb5yt1ysw.cloudfront.net'}))
    .pipe(gulp.dest(config.nunjucks.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});