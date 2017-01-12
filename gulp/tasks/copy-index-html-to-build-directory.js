'use strict';

import gulp from 'gulp';
import template from 'gulp-template';
import gzip from 'gulp-gzip';
import config from '../config';
import htmlmin from 'gulp-htmlmin';

gulp.task('copy-index-html-to-build-directory', function() {
  if (!global.isProduction) {
    gulp.src(config.sourceDirectory + 'index.html')
      .pipe(template({
        version: versionAsMs
      }))
      .pipe(gulp.dest(config.buildDirectory));
    return;
  }

  const date = new Date();
  const versionAsMs = date.getTime();

  gulp.src(config.sourceDirectory + 'index.html')
    .pipe(template({
      version: versionAsMs
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gzip({
      append: false
    }))
    .pipe(gulp.dest(config.buildDirectory));
});
