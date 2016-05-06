(function () {
	'use strict';

	var gulp = require('gulp'),
		conf = require('./conf');

    gulp.task('watch', ['inject'], function ()
    {
    	gulp.watch([
			conf.paths.src + '/*.html',
			conf.paths.src + '/**/*.scss',
			conf.paths.src + '/**/*.js'
    	], ['inject']);
    });

}());