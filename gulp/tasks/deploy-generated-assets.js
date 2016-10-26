'use strict';

import gulp from 'gulp';
import s3 from 's3';

const client = s3.createClient({
  signatureVersion: 'v2',
  maxAsyncS3: 1,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: 'AKIAJ72YXEJ3DTT3DHGQ',
    secretAccessKey: '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',
    sslEnabled: false
  },
});

gulp.task('deploy-generated-assets', () => {
  const params = {
    localDir: './build/',
    deleteRemoved: false,
    s3Params: {
      Bucket: 'jimmyl.ee',
      Prefix: 'test/',
      ACL: 'public-read'
    },
  };
  const uploader = client.uploadDir(params);
  uploader.on('error', (err) => {
    console.error('unable to sync:', err);
  });
  uploader.on('progress', () => {
    console.log('progress', uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', () => {
    console.log('done uploading');
  });
});
