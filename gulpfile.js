var gulp = require('gulp'),
    file = require('gulp-file'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    del = require('del'),
    minify_css = require('gulp-minify-css'),
    rjs = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps');

var tsProject = tsc.createProject('tsconfig.json');

gulp.task('build-clean', function (callback) {
    del.sync('dist/scripts/**');
    del.sync('dist/styles/**');
    callback();
});

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

gulp.task('lint-source', function () {
    return gulp.src('src/scripts/**/*.ts').pipe(tslint()).pipe(tslint.report('prose'));
});

gulp.task('generate-source-references', function () {
    return file('AllSourceReferences.ts', '//{\n\n//}', { src: true })
        .pipe(inject(gulp.src(['src/scripts/**/*.ts'], {read: false}), {
            starttag: '//{',
            endtag: '//}',
            transform: function (filepath) {
                return '/// <reference path="../..' + filepath + '" />';
            }
        })).pipe(gulp.dest('dist/scripts/'));
});

gulp.task('transpile-source', function () {
    var transpiled = gulp.src(['src/scripts/**/*.ts', 'packages/typings/**/*.ts', 'dist/scripts/AllSourceReferences.ts'])
        .pipe(tsc(tsProject));
    return transpiled.js.pipe(gulp.dest('dist/scripts/src'));

});

gulp.task('watch', function () {
    gulp.watch(['src/scripts/**/*.ts', 'src/styles/**/*.css'], ['copy-styles-assets', 'minify-styles', 'lint-source', 'transpile-source']);
});


gulp.task('default', function () {
    runSequence(
        'build-clean',
        'copy-styles-assets',
        'minify-styles',
        'lint-source',
        'generate-source-references',
        'transpile-source'
    );
});



////////////////////
//Source minification code using require js
//gulp.task('minify-source', function () {
//    return rjs({
//        baseUrl: "src/scripts",
//        mainConfigFile: 'src/scripts/configuration.js',
//        name: 'main',
//        out: 'main.js',
//        preserveLicenseComments: false
//    })
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/scripts/'));
//});
////////////////////
//Type script compiling sample
//    var transpiled = gulp.src(['src/scripts/**/*.ts', 'packages/typings/**/*.ts', 'dist/scripts/AllSourceReferences.ts'])
//        .pipe(sourcemaps.init())
//        .pipe(tsc());
//    transpiled.dts.pipe(gulp.dest('dist/scripts/src'));
//    return transpiled.js
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('dist/scripts/src'));
////////////////////
//Type script compiling sample with tsconfig without source [not working]
//    var transpiled = tsProject.src()
//        .pipe(tsc(tsProject));
