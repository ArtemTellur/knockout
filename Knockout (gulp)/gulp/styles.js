(function () {
	'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('styles', ['clean-styles'], function() {
  var sassOptions = {
    style: 'expanded'
  };

  return gulp.src(path.join(conf.paths.src, '/css/**/*.scss'))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe(gulp.dest(path.join(conf.paths.src, 'css')));
});

gulp.task('wstyles', ['styles'], function() {
  gulp.watch(path.join(conf.paths.src, '/css/**/*.scss'), function() {
    gulp.start('styles');
  });
});

gulp.task('clean-styles', function() {
  return del([path.join(conf.paths.src, 'css/**/*.css')]);
});
}());