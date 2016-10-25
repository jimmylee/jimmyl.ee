'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('production', ['reset-build-directory'], function(cb) {
  cb = cb || function() {};

  global.isProduction = true;

  runSequence([
    'generate-sass-and-copy-to-build-directory',
    'minify-and-copy-images-to-build-directory',
    'browserify',
    'copy-fonts-to-build-directory',
    'copy-index-html-to-build-directory',
    'copy-icons-to-build-directory',
    'eslint'
  ], 'deploy-generated-assets', cb);
});
