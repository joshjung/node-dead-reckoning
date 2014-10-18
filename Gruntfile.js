module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    browserify: {
      all: {
        src: 'index.js',
        dest: 'dist/dead-reckoning-browserified.js'
      }
    }
  });

  grunt.registerTask('default', ['browserify']);
};