/* jshint node: true */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    s3: {
      deploy: {
        bucket: 'the.disco.zone',
        access: 'public-read',
        sync: [{
          src: 'site/**/*',
          rel: 'site',
          dest: '/',
          options: { verify: true, gzip: true }
        }]
      }
    }
  });

  grunt.registerTask('deploy', ['s3:deploy']);
};
