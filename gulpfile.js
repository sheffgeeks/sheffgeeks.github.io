// INSTRUCTIONS
// `gulp` to compile styles
// `gulp watch` to watch styles

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    name = require('gulp-rename'),
    replace = require('gulp-replace'),
    md = require('gulp-remarkable')
    wrap = require('gulp-wrap');

// compile and compress styles
gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./css'));
});

// Build page from markdown
gulp.task('page', function() {
    return gulp.src('./index.md')
        .pipe(replace(/--ROW/g, '<div class="row">'))
        .pipe(replace(/--COL/g, '<div class="small-12 medium-6 columns">'))
        .pipe(replace(/--END\w+/g, '</div>'))
        .pipe(replace(/--CALENDAR/g, '<div id="calendar-events"></div>'))
        .pipe(md({ preset: 'commonmark', remarkableOptions: { html: true } }))
        .pipe(name('index.html'))
        .pipe(wrap({ src: './layout.html' }, {}, {
            // Use lodash template options which don't clash with client
            escape: false,
            evaluate: false,
            interpolate: /{{{([\s\S]+?)}}}/g,
        }))
        .pipe(gulp.dest('.'));
});

// watch and autocompile styles
gulp.task('watch', function () {
  gulp.watch('./css/**/*.scss', gulp.series(['sass']));
  gulp.watch(['./index.md', './layout.html'], gulp.series(['page']));
});

gulp.task('default', gulp.parallel(['sass', 'page']));
