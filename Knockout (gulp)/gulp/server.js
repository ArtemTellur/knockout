(function ()
{
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		conf = require('./conf'),
		middleware = require('./proxy'),
		browserSync = require('browser-sync'),
		runSequence = require('run-sequence');

	gulp.task('serve', function ()
	{
		runSequence('watch', '_serve');
	});

	gulp.task('_serve', function ()
	{
		serve();
	});

	function serve()
	{
		browserSyncInit([
			conf.paths.temp.root,
			conf.paths.src
		], [
			conf.paths.temp.root
		], null, false);
	}

	function browserSyncInit(baseDir, files, browser, isMockUrlParam)
	{
		browser = !browser ? 'default' : browser;

		var routes = null;
		//if (baseDir === conf.paths.src || util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)
		//{
		//	routes = {
		//		'/bower_components': 'bower_components'
		//	};
		//}

		browserSync.instance = browserSync.init(files, {
			startPath: '/' + (isMockUrlParam ? '?mock=1' : ''),
			server: {
				baseDir: baseDir,
				middleware: middleware,
				routes: routes
			},
			browser: browser,
			ghostMode: false,
			notify: false
		});
	}

}());