const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const Server = require('karma').Server;
const path = require('path');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'src/views/index.html'
    },
    port: process.env.PORT || 9000,
    ghostMode: false,
    open: false
    
  });
});

gulp.task('refresh', () => {
  browserSync.reload();
});


// Default taskd
gulp.task('default', ['serve', 'refresh'], () => {
  gulp.watch('./src/**/*.html', ['refresh']);
  gulp.watch('./src/public/**/*.js', ['refresh']);
  gulp.watch('./*.js', ['refresh']);
  gulp.watch('./src/public/css/*.css', ['refresh']);
});

gulp.task('test', (done) => {
  new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('bundle', () => {
  gulp.src('./jasmine/spec/inverted-index-test.js')
  .pipe(browserify())
  .pipe(rename('bundles.js'))
  .pipe(gulp.dest('jasmine/bundles'));
});
