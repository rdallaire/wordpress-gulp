var gulp = require('gulp');
var del = require('del');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

sass.compiler = require('node-sass');

var paths = {
    styles: {
      src: 'src/scss/*.scss',
      dest: 'dist/css/'
    }
    // scripts: {
    //   src: 'src/scripts/**/*.js',
    //   dest: 'assets/scripts/'
    // }
  };

function clean() {
    // You can use multiple globbing patterns as you would with `gulp.src`,
    // for example if you are using del 2.0 or above, return its promise
    return del([ 'assets' ]);
  }

function css() {
    return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(reload({ stream:true }))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(reload({ stream:true }));
}

function watch() {
    browserSync({
        proxy: 'localhost:8000'
      });
    gulp.watch(paths.styles.src, css);
}

var build = gulp.series(css);


exports.watch = watch;
exports.default = build;

