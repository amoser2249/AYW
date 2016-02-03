
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
		}}, function(error, stdout, stderr, cmd) {
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

