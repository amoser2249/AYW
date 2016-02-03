// plumber.js
// Custom Plumber function for catching errors

module.exports = customPlumber;

// required modules
var gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber');

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
};
