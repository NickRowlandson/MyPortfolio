var gulp = require('gulp'),
    webserver = require('gulp-webserver');


// > gulp webserver
gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            fallback: 'index.html',
            open: true
        }));
});

// > gulp
// Default task that does almost everything. 
gulp.task('default', ['webserver']);