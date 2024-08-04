const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('src/**/*.html')      //описывает, что делает функция
            .pipe(plumber())               
                .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
  }
  
function css() {
  return gulp.src('src/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
  }
  
function fonts() {
    return gulp.src('src/fonts/**/*.{css,ttf,otf,svg,woff,woff2,eot}')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
  }

function clean() {
  return del('dist');
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts)); // выполняет одну совмещенную команду, вместо 4 

function watchFiles() {
    gulp.watch(['src/**/*.html'], html);
    gulp.watch(['src/**/*.css'], css);
    gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
    gulp.watch(['src/fonts/**/*.{css,ttf,otf,svg,woff,woff2,eot}'], fonts);
  }

const watchapp = gulp.parallel(build, watchFiles, serve);


function serve() {
    browserSync.init({
      server: {
        baseDir: './src'
      }
    });
  }
  
  exports.html = html // строчка, которая позволит вызвать эту задачу из терминала
  exports.css = css;
  exports.images = images;
  exports.fonts = fonts; 
  exports.clean = clean; // чистка папки dist

  exports.build = build; 
  exports.watchapp = watchapp;
  exports.default = watchapp; // вызов команды watchapp кл. словом gulp 