/// <vs BeforeBuild='build' Clean='clean' />
var gulp = require('gulp');
var gulpUtilities = require('gulp-utilities');
var lint = gulpUtilities.lint;
var clean = gulpUtilities.clean;
var copy = gulpUtilities.copy;
var test = gulpUtilities.test;

lint.config(gulp);
clean.config(gulp);
copy.config(gulp);
test.config(gulp, __dirname + '/karma.conf.js');

gulp.task('default', ['build']);

var runSequence = require('run-sequence');

gulp.task('tc', function(done) {
	runSequence('build.release',
				'test.tc',
				done);
});

gulp.task('run.tests', function (done) {
	runSequence('build.release',
				'test',
				done);
});

gulp.task('build', ['build.debug']);

gulp.task('build.debug', function(done) {
	runSequence('lint',
				'clean.debug',
				'compile.debug',
				'copy.debug',
				done);
});

gulp.task('build.release', function(done) {
	runSequence('lint',
				'clean.release',
				'compile.release',
				'copy.release',
				done);
});

var browserify = gulpUtilities.browserify;
var main = 'utilities'; 

gulp.task('compile', ['compile.debug']);

gulp.task('compile.debug', function(done) {
	return browserify.compileDebug(main);
});

gulp.task('compile.release', function(done) {
	return browserify.compileRelease(main);
});
