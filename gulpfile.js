var gulp = require('gulp'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	spritesmith = require('gulp.spritesmith'),
	nunjucksRender = require('gulp-nunjucks-render'),
	data = require('gulp-data'),
	fs = require('fs'),
	del = require('del'),
	runSequence = require('run-sequence'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	scssLint = require('gulp-scss-lint'),
	Server = require('karma').Server;

// =================
// DEVELOPMENT PHASE
// =================

// Custom Plumber function for catching errors
function customPlumber(errTitle) {
  // Determining whether plumber is ran by Travis
  if (process.env.CI) {
    return plumber({
      errorHandler: function(err) {
        throw Error(err.message);
      }
    });
  } else {
    return plumber({
      errorHandler: notify.onError({
        // Customizing error title
        title: errTitle || 'Error running Gulp',
        message: 'Error: <%= error.message %>',
      })
    });
  }
}

// Compile SASS with sourcemaps, autoprefixer and automatically inject changes into browser
// app/bower_components defined as included path (aka easier referencing @import statements)
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(customPlumber('Error Running Sass'))
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: ['app/bower_components/']
		}))
		.pipe(autoprefixer({
			browsers: ['ie 8-9', 'last 2 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// BrowserSync Server
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	})
});

// Create standard & retina Sprites  -  NOT to be used for responsive images
gulp.task('sprites', function() {
	var spriteData =
		gulp.src('./app/images/sprites/*.*') // source path of the sprite images
		.pipe(spritesmith({
			imgName: 'sprites.png',
			cssName: '_sprites.scss',
			imgPath: '../images/sprites.png',
			retinaSrcFilter: 'app/images/sprites/*@2x.png',
			retinaImgName: 'sprites@2x.png',
			retinaImgPath: '../images/sprites@2x.png'
		}));
	spriteData.img.pipe(gulp.dest('./app/images/')); // output path for the sprite
	spriteData.css.pipe(gulp.dest('./app/scss/')); // output path for the CSS
});

// Nunjucks templating with data source & browserSync
gulp.task('nunjucks', function() {
	nunjucksRender.nunjucks.configure(['app/templates'], {
		watch: false
	});
	return gulp.src('app/pages/**/*.+(html|nunjucks)')
		.pipe(customPlumber('Error Running Nunjucks'))
		.pipe(data(function() {
			return JSON.parse(fs.readFileSync('./app/data.json'))
		}))
		.pipe(nunjucksRender())
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Clean up CSS and generated HTML files in app directory
gulp.task('clean:dev', function(callback) {
	del([
		'app/css',
		'app/*.+(html|nunjucks)'
	], callback);
});

gulp.task('watch-js', ['lint:js'], browserSync.reload);

// Gulp Watch task -- browserSync & SASS Compiler -- reloads on scss/css, nunjucks, js and html changes
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', ['sass', 'lint:sass']);
	gulp.watch('app/js/**/*.js', ['watch-js']);
	gulp.watch([
		'app/templates/**/*',
		'app/pages/**/*.+(html|nunjucks)',
		'app/data.json'
	], ['nunjucks'])
});
	// gulp.watch('app/*.html', browserSync.reload);

// Consolidated dev phase task
gulp.task('default', function(callback) {
	runSequence(
		'clean:dev',
		['sprites', 'lint:js', 'lint:sass'],
		['sass', 'nunjucks'],
		['browserSync', 'watch'],
		callback
	)
});

// =================
//   TESTING PHASE
// =================

gulp.task('lint:js', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(customPlumber('JSHint Error'))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail', {
			ignoreWarning: true,
			ignoreInfo: true
		}))
		.pipe(jscs({
			fix: true,
			configPath: '.jscsrc'
		}))
		.pipe(gulp.dest('app/js'))
	});

gulp.task('lint:sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(scssLint({
			config: '.scss-lint.yml'
		}));
	});

gulp.task('test', function(done) {
	new Server({
		configFile: process.cwd() + '/karma.conf.js',
		singleRun: true
		}, done).start();
	});

// =================
// INTEGRATION PHASE
// =================

gulp.task('dev-ci', function(callback) {
	runSequence(
		'clean:dev', ['sprites', 'lint:js', 'lint:sass'], ['sass', 'nunjucks'],
		callback
	);
})