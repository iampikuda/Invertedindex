
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'src/views/index.html',
      port: 4403
    }
  });
});

gulp.task('refresh', () => {
  browserSync.reload();
});


// Default task
gulp.task('runserver', ['serve', 'refresh'], () => {
  gulp.watch('./src/**/*.html', ['refresh']);
  gulp.watch('./src/public/**/*.js', ['refresh']);
  gulp.watch('./src/public/css/*.css', ['refresh']);
});
