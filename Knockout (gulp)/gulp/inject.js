(function ()
{
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		conf = require('./conf');

	gulp.task('inject', ['copy-css', 'copy-js'], function ()
	{
	    var injectScripts = gulp.src([

			]),
			injectStyles = gulp.src([
				conf.paths.temp.root + '/css/main.css',
			]);

		return gulp.src(conf.paths.src + '/*.html')
			.pipe($.inject(injectStyles, { ignorePath: conf.paths.temp.root }))
			.pipe($.inject(injectScripts, { ignorePath: conf.paths.temp.root }))
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-css', ['styles'], function ()
	{
		return gulp.src(conf.paths.src + '/**/*.css')
			.pipe(gulp.dest(conf.paths.temp.root));
	});


	gulp.task('copy-js', ['scripts'], function ()
	{
		return gulp.src(conf.paths.src + '/**/*.js')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

}());