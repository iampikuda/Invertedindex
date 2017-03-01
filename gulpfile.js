const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
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
