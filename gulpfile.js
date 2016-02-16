// INSTRUCTIONS
// `gulp` to compile styles
// `gulp watch` to watch styles

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

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

// watch and autocompile styles
gulp.task('watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);
