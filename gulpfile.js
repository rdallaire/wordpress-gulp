const gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    browsersync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    inlinesource = require('gulp-inline-source'),
    webp = require('gulp-webp'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace');

sass.compiler = require('node-sass');

const paths = {
    styles: {
      src: 'src/scss/*.scss',
      dest: 'dist/css/'
    },
    js : {
        src: 'src/js/*.js',
        dest: 'dist/js/'
    },
    img: {
        src: 'src/img/**/*',
        dest: 'site/img/'
    },
    php: {
        src: './**/*.php'
    },
  };

// postcss plugins
var pcssplugins = [
    autoprefixer(),
    cssnano()
];

// BrowserSync
function browserSync(done) {
    browsersync.init({
      proxy: 'localhost:8000'
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function clean() {
    return del([ 'site' ]);
  }

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(postcss(pcssplugins))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream());
}

function stylesWatch() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream());
}

function img() {
    return gulp.src(paths.img.src)
    // .pipe(image())
    .pipe(gulp.dest(paths.img.dest));
}

function imgWebp() {
    return gulp.src(paths.img.src)
    // .pipe(image())
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest(paths.img.dest));
}

// function html() {
//     return gulp.src(paths.html.src)
//     .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//     }))
//     .pipe(gulp.dest(paths.html.dest))
//     .pipe(inlinesource())
//     .pipe(htmlmin({
//         collapseWhitespace: true,
//         removeComments: true
//     }))
//     .pipe(gulp.dest(paths.html.dest));
// }

// function htmlWatch() {
//     return gulp.src(paths.html.src)
//     .pipe(replace('%%content%%', '@@include("./partials/pardot-form.html")'))
//     .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//       }))
//     .pipe(gulp.dest(paths.html.dest));
// }

function js() {
    return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
    gulp.watch(paths.styles.src, stylesWatch);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.php.src,
        gulp.series(browserSyncReload)
    );
    gulp.watch(paths.img.src, img);
    gulp.watch(paths.img.src, imgWebp);
}

var build = gulp.series(clean, styles, js, img, imgWebp);
var preWatch = gulp.series(clean, stylesWatch, img, js, imgWebp);
var watchActual = gulp.parallel(watchFiles, browserSync);
var watch = gulp.series(preWatch, watchActual);

exports.watch = watch;
exports.default = build;