/*global module:false*/
module.exports = function(grunt) {

  var shellOpts = function (opts) {
    return grunt.util._.extend({
        stdout: true,
        stderr: true,
        failOnError: true
    }, opts || {});
  };

  grunt.initConfig({
    shell: {
      clone: {
        options: shellOpts(),
        command: [
          'git clone git@github.com:elgrancalavera/grunt-carnaby.git',
          'git clone git@github.com:elgrancalavera/grunt-init-carnaby.git'
        ].join('&&')
      },
      install_carnaby: {
        options: shellOpts({
          execOptions: {
            cwd: 'grunt-carnaby'
          }
        }),
        command: [
          'npm install',
          'bower install',
          'grunt'
        ].join('&&')
      },
      install_init_carnaby: {
        options: shellOpts({
          execOptions: {
            cwd: 'grunt-init-carnaby'
          }
        }),
        command: [
          'npm install',
          'bower install',
          'grunt'
        ].join('&&')
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },
    clean: ['grunt-carnaby', 'grunt-init-carnaby']
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint']);
};
