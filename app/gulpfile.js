var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var insert = require('gulp-insert');

var public_dir = __dirname + '/public';
var index = '/index.html';
var app_js ='/app.js';
var app_js_min = '/app.min.js';

var src_dir = public_dir + '/src';
var src_js = src_dir + '/js';
var src_index = src_dir + index;

var bundle_dir = public_dir + '/bundle';
var bundle_js = bundle_dir + '/js';
var bundle_index = bundle_dir + index;

var insert_js_prepend = 'console.log(111) /n';
var insert_js_append = '/n console.log(222) ';

gulp.task('clean', function() {
    return del([bundle_dir + '/*']);
});

gulp.task('copy-js', function() {
    return gulp.src([
             src_js + '/lib-a.js',
             src_js + '/lib-b.js',
        ])
        .pipe(gulp.dest(bundle_js));
});

gulp.task('copy-vendor', function() {
    return gulp.src(src_dir + '/vendor/*')
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('concat-js', function() {
    return gulp.src([
             bundle_js + '/lib-a.js',
             bundle_js + '/lib-b.js',
        ])
        .pipe(concat(app_js))
        .pipe(gulp.dest(bundle_js));
});

gulp.task('minify-js', function() {
    return gulp.src(bundle_js + app_js)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bundle_dir));
})

gulp.task('update-js', function() {
    return gulp.src(bundle_js + app_js)
        .pipe(insert.append(insert_js_append))
        .pipe(insert.prepend(insert_js_prepend))
        .pipe(gulp.dest(bundle_dir));
});

gulp.task('replace-html', function() {
  gulp.src(src_index)
    .pipe(htmlreplace({
        'jquery': 'jquery-1.7.1.min.js',
        'js':'app.min.js'
    }))
    .pipe(gulp.dest(bundle_dir));
});

gulp.task('finish-task', function() {
    return del(bundle_js);
});

gulp.task('execute-for-bundle', function() {
    runSequence('clean', ['copy-js','copy-vendor'], 'concat-js',['minify-js','replace-html'],'finish-task');
});

gulp.task('execute-for-webpack', function() {
    runSequence('clean', ['copy-js','copy-vendor'], 'concat-js',['update-js','replace-html'],'finish-task');
});
