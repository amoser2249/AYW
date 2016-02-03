// deploy.js

var fs = 	require('fs'),
gulp   = 	require('gulp'),
gutil  = 	 require('gulp-util'),
rsync  = 	require('rsyncwrapper').rsync,
ftp    = 	require('vinyl-ftp');

if (!process.env.CI) {
	var creds = JSON.parse(fs.readFileSync('../../secrets.json'));

	// rsync task
	gulp.task('rsync', function() {
		rsync({
			src: 'dist/',
			// Keep dest in secrets.json
			dest: creds.rsync.dest,
			recursive: true,
			deleteAll: true
		}, function(error, stdout, stderr, cmd) {
			if (error) {
				console.log(error.message);
				console.log(stdout);
				console.log(stderr);
			}
		});
	})
}