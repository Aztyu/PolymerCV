var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');

var dist_path = 'dist/'

gulp.task('vulcanize', ['clean'], function() {
  return gulp.src('custom_components/cvMainComponent.html')
    .pipe(vulcanize({
      stripComments: true
    }))
    .pipe(gulp.dest(dist_path + 'custom_components/'));
});

gulp.task('copy', ['vulcanize'], function () {
    gulp.src('index.html')
        .pipe(gulp.dest(dist_path));
    gulp.src('404.html')
        .pipe(gulp.dest(dist_path));
    gulp.src('css/*.css')
        .pipe(gulp.dest(dist_path + 'css/'));
    gulp.src('.htaccess')
        .pipe(gulp.dest(dist_path));
    gulp.src('robots.txt')
        .pipe(gulp.dest(dist_path));
    gulp.src('sitemap.xml')
        .pipe(gulp.dest(dist_path));
    gulp.src('json/**/*.json')
        .pipe(gulp.dest(dist_path + 'json/'));
});

gulp.task('clean', function() {
 return gulp.src(dist_path)
 .pipe(clean());
});

gulp.task('images', ['clean'], function(){
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest(dist_path + 'images/'))
})

gulp.task('default', ['clean', 'images', 'vulcanize', 'copy']);
