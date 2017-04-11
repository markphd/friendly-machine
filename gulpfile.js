var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var noUiSlider = require('nouislider');

var autoprefixer = require('gulp-autoprefixer');

gulp.task('templates', function(){

	var data = {
		pretty: true,
		year: new Date().getFullYear()
	};

	return gulp.src('src/templates/*.jade')
		.pipe(pug(data))
		.pipe(gulp.dest('./'));
})

// gulp.task('images', function(){
// 	gulp.src(['src/img/**/*'])
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img'))
// 		.pipe(browserSync.stream());
// })

gulp.task('scripts', function(){
	gulp.src(['src/scripts/range-slider.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.stream());
})

gulp.task('styles', function(){
	gulp.src('src/styles/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
	})

gulp.task('default', ['templates', 'styles', 'scripts'], function(){
	browserSync.init({
		server: './'
	});
	gulp.watch('src/templates/**/*.jade', ['templates']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('*.html', browserSync.reload);
})

