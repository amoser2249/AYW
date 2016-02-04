// -------------------------------------
//   Task: sprites
// -------------------------------------

var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith');

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