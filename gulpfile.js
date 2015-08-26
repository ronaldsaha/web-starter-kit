var gulp = require('gulp'),
    minify_css = require('gulp-minify-css'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

gulp.task('copy-styles-assets', function () {
    gulp.src('packages/bootstrap/dist/fonts/*.*').pipe(gulp.dest('dist/styles/fonts/bootstrap'));
    gulp.src('packages/font-awesome/fonts/*.*').pipe(gulp.dest('dist/styles/fonts/font-awesome'));
})

gulp.task('minify-styles', function () {
    return gulp.src('src/styles/main.css')
        .pipe(minify_css({relativeTo: 'dist/styles/', target: 'dist/styles/'}))
        .pipe(replace('url(../../packages/bootstrap/dist/fonts', 'url(fonts/bootstrap'))
        .pipe(replace('url(../../packages/font-awesome/fonts', 'url(fonts/font-awesome'))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('minify-scripts', function () {
    return rjs({
            baseUrl: "src/scripts",
            mainConfigFile: 'src/scripts/configuration.js',
            name: 'main',
            out: 'main.js',
            preserveLicenseComments: false})
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'));
})

gulp.task('build', ['copy-styles-assets', 'minify-styles', 'minify-scripts']);
