// -------------------------------------
//   Task: test
// -------------------------------------

// Compile SASS with sourcemaps, autoprefixer and automatically inject changes into browser
// app/bower_components defined as included path (aka easier referencing @import statements)

// require modules
var gulp = require('gulp'),
	Server = require('karma').Server;

gulp.task('test', function(done) {
	new Server({
		configFile: process.cwd() + '/karma.conf.js',
		singleRun: true
	}, done).start();
});