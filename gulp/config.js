// config.js
var config = {
	sass: {
		src: 'app/scss/**/*.scss',
		dest: 'app/css',
		options: {
			includePaths: [
			'app/bower_components', 'node_modules'
			]
		}
	}
};

// Exporting config
module.exports = config;