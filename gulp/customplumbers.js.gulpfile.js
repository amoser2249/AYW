
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
};
