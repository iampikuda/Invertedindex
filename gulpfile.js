const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const Server = require('karma').Server;
const path = require('path');

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './src',
      index: 'src/views/index.html'
    },
    options: {
      watchTask: true
    }
  });
});

gulp.task('refresh', () => {
  browserSync.reload();
});


// Default task
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
