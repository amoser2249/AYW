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
	gutil = require('gulp-util'),
	useref = require('gulp-useref'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	debug = require('gulp-debug'),
	cached = require('gulp-cached'),
	uncss= require('gulp-uncss'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	rsync = require('rsyncwrapper'), rsync,
	ghPages = require('gulp-gh-pages'),
	s3 = require('gulp-s3'),
	creds = JSON.parse(fs.readFileSync('./secrets.json'));
	Server = require('karma').Server;

// =================
// DEVELOPMENT PHASE
// =================

// Custom Plumber function for catching errors
function customPlumber(errTitle) {
	if (process.env.CI) {
		return plumber({
			errorHandler: function(err) {
				throw Error(gutil.colors.red(err.message));
			}
		});
	} else {
		return plumber({
			errorHandler: notify.onError({
				title: errTitle || 'Error running Gulp',
				message: 'Error: <%= error.messge %>',
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
		}));
});

// BrowserSync Server
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	});
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
	gulp.watch('app/scss/**/*.scss', ['sass', 'lint:scss']);
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
		['sprites', 'lint:js', 'lint:scss'],
		['sass', 'nunjucks'],
		['browserSync', 'watch'],
		callback
	);
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

gulp.task('lint:scss', function() {
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
		'clean:dev', ['sprites', 'lint:js', 'lint:scss'], ['sass', 'nunjucks'],
		callback
	);
})

// ==================
// OPTIMIZATION PHASE
// ==================

gulp.task('useref', function() {
	return gulp.src('app/*.html')
		.pipe(cached('useref'))
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', uncss({
			html: ['app/*.html'],
			ignore: [
				'.susy-test',
				/.is-/,
				/.has-/
			]
		})))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin(), {
			name: 'ayw'
		}))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('cache:clear', function(callback) {
	return cache.clearAll(callback)
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function(callback) {
	del(['dist'], callback)
});

gulp.task('build', function(callback) {
	runSequence(
		['clean:dev', 'clean:dist'],
		['sprites', 'lint:js', 'lint:scss'],
		['sass', 'nunjucks'],
		['useref', 'images', 'fonts', 'test'],
		callback
	);
});

// Launches web server that points to built assets (located in dist/)
gulp.task('browserSync:dist', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
});

// ==================
//  DEPLOYMENT PHASE
// ==================

if (!process.env.CI) {
	// Deploy via rSync SSH
	gulp.task('rsync', function() {
		rsync({
			src: 'dist/',
			// Keep destination in secrets.json
			dest: 'username@server-address:public_html/path-to-project',
			ssh: true,
			recursive: true,
			deleteAll: true
		}, function(error, stdout, stderr, cmd) {
			if (error) {
				console.log(error.message);
				console.log(stdout);
				console.log(stderr);
			}
		});
	});

	var conn = ftp.create({
		// Keep everything here in secrets.json
		host: creds.server,
		user: creds.username,
		password: creds.password,
		log: gutil.log
	});

	gulp.task('ftp-clean', function(cb) {
		conn.rmdir('public_html/path-to-project', function(err) {
			if (err) {
				console.log(err);
			}
		});
	});

	gulp.task('ftp', function() {
		return gulp.src('dist/**/*')
			.pipe(conn.dest('public_html/path-to-project'));
	});

	// Deploy to GitHub Pages
	gulp.task('ghpages', function() {
		return gulp.src('./dist/**/*')
			.pipe(ghPages());
	});

	// Deploy to Amason s3
	gulp.task('amazon', () => {
		gulp.src('./dist/**/*')
			.pipe(s3({
				'key': 'Your-API-Key',
				'secret': 'Your-AWS-Secret',
				'bucket': 'Your-AWS-bucket',
				'region': 'Your-region'
			}));
	});