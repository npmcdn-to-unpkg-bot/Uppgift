var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var sass       = require('gulp-sass');
var csscomb    = require('gulp-csscomb');

gulp.task('dev', function()  {
	
	livereload.listen();
	
    gulp.watch(['index.html'],['html']);
    gulp.watch(['css/*.scss'], ['sass']);
    
});

gulp.task('html', function() {
    
    return gulp.src('index.html')
        .pipe(gulp.dest(''))
        .pipe(livereload());
    
});

gulp.task('sass', function () {
    
    gulp.src('css/*.scss')
        .pipe(sass({errLogToConsole: true})).on('error', errorHandler)
        .pipe(gulp.dest('css/compiled/'))
        .pipe(livereload()); 
    
});

gulp.task('comb', function() {
    
  return gulp.src('css/*.scss')
    .pipe(csscomb())
    .pipe(gulp.dest('css/comb/'));
    
});

function errorHandler (error) {
    
    console.log(error.toString());
   	this.emit('end');
}

gulp.task('default', ['dev']);

