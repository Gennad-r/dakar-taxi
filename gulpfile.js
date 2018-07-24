var gulp = require('gulp'),
		sass = require('gulp-sass'),
		sync = require('browser-sync'),
		cleanCSS = require('gulp-clean-css'),
		concat = require('gulp-concat'),
		minify = require('gulp-minify');

gulp.task('sync', function () {
	sync({
		server : {
			baseDir: 'public'
		},
		notify : false
	})
});


gulp.task('sass', function () {
	return gulp.src(['dev/**/*.sass'])
		.pipe(sass())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('public'))
		.pipe(sync.reload({stream: true}));
});

gulp.task('js_combine', function () {
	return gulp.src(['dev/js/script.js'])
		.pipe(concat('script.js'))
		.pipe(minify())
		.pipe(gulp.dest('public/js'))
		.pipe(sync.reload({stream: true}));
});

gulp.task('order_min', function () {
	return gulp.src(['dev/js/OnlineOrder.js'])
		.pipe(minify())
		.pipe(gulp.dest('public/js'))
		.pipe(sync.reload({stream: true}));
});



gulp.task('watch', ['sync', 'js_combine', 'sass', 'order_min'], function () {
	gulp.watch('dev/styles/*.sass', ['sass']);
	gulp.watch('public/**/*.html', sync.reload);
	gulp.watch('dev/js/*.js', ['js_combine', 'order_min'])
});

gulp.task('default', ['watch']);