var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');

gulp.task('copy-style-assets', function () {
    gulp.src('packages/bootstrap/dist/fonts/*.*').pipe(gulp.dest('dist/styles/fonts/bootstrap'));
    gulp.src('packages/font-awesome/fonts/*.*').pipe(gulp.dest('dist/styles/fonts/font-awesome'));
})

gulp.task('minify-css', function () {
    return gulp.src('src/styles/main.css')
        .pipe(minifyCss({relativeTo: 'dist/styles/', target:'dist/styles/'}))
        .pipe(replace('url(../../packages/bootstrap/dist/fonts','url(fonts/bootstrap'))
        .pipe(replace('url(../../packages/font-awesome/fonts','url(fonts/font-awesome'))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('build', ['copy-style-assets', 'minify-css']);