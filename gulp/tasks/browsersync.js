// -------------------------------------
//   Task: browserSync
// -------------------------------------

// require modules
var gulp = require('gulp'),
	browserSync = require('browser-sync');

// BrowserSync Server
gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	});
});

// Launches web server that points to built assets (located in dist/)
gulp.task('browserSync:dist', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
});
