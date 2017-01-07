'use strict';

import gulp from 'gulp';
import config from '../config';
import htmlmin from 'gulp-htmlmin';

gulp.task('copy-index-html-to-build-directory', function() {
  if (!global.isProduction) {
    gulp.src(config.sourceDirectory + 'index.html')
      .pipe(gulp.dest(config.buildDirectory));
    return;
  }

  gulp.src(config.sourceDirectory + 'index.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.buildDirectory));
});
