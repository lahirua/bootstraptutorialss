var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');

var app = './public/app';

// gulp.task('default', function(){
//   return gulpUtil.log('Gulp is running');
// });

gulp.task('default', ['watch']);

gulp.task('jshint', function(){
  console.log('This is jshint task');
  return gulp.src('source/js/**/*.js')
         .pipe(jshint())
         .pipe(jshint.reporter('jshint-stylish'));
});


// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/js/**/*.js', ['jshint']);
});
//gulp.watch('source/js/**/*.js',['jshint']);

gulp.task('build-js', function(){
  return gulp.src('source/js/**/*.js')
          .pipe(gulpUtil.env.type === 'production' ? uglify() : gulpUtil.noop())
          .pipe(gulp.dest('public/app/js'));
});

gulp.task('webserver', function() {
  gulp.src(app+'/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
