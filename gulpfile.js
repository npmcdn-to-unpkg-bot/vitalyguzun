'use strict';
var gulp = require('gulp');
var sourceMap = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var browser = require('browser-sync');
var superstatic = require('superstatic');

gulp.task('ts-to-js', function() {
    return gulp.src('src/**/*.ts')
               .pipe(sourceMap.init())
               .pipe(ts(tsProject))
               .pipe(sourceMap.write('.'))
               .pipe(gulp.dest('dist'));
});

gulp.task('copy-html', function() {
    return gulp.src('src/**/*.html')
               .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['ts-to-js', 'copy-html'], function() {

    gulp.watch(['src/**/*.ts'], ['ts-to-js'])

    browser({
        port: 3000,
        file: ['index.html', '**/*.js'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './dist/app',
            middleware: superstatic({ debug: false })
        }
    })

});

gulp.task('default', ['serve']);
