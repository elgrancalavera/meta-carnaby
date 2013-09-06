/*global module:false*/
var path = require('path');

module.exports = function(grunt) {

  //--------------------------------------------------------------------------
  //
  // Shell helpers
  //
  //--------------------------------------------------------------------------

  var shellOpts = function (opts) {
    return grunt.util._.extend({
        stdout: true,
        stderr: true,
        failOnError: true
    }, opts || {});
  };

  var cmdjoint = ' && ';
  var initCarnaby = path.resolve(process.env.HOME, '.grunt-init/carnaby');

  var symlinks = [
    [
      path.resolve('./grunt-init-carnaby'),
      initCarnaby
    ],
    [
      path.resolve('./grunt-carnaby'),
      path.resolve('./grunt-init-carnaby/node_modules/grunt-carnaby')
    ]
  ].reduce(function (commands, ln) {

    commands.push(['ln -s'].concat(ln).join(' '));
    return commands;

  }, []).join(cmdjoint);


  //--------------------------------------------------------------------------
  //
  // Grunt
  //
  //--------------------------------------------------------------------------

  grunt.initConfig({
    shell: {

      //----------------------------------
      //
      // Install
      //
      //----------------------------------

      install_rm: {
        options: shellOpts(),
        command: ['rm -f', initCarnaby].join(' ')
      },
      install_clone: {
        options: shellOpts(),
        command: [
          'git clone git@github.com:elgrancalavera/grunt-carnaby.git',
          'git clone git@github.com:elgrancalavera/grunt-init-carnaby.git'
        ].join(cmdjoint)
      },
      install_mkdir: {
        options: shellOpts(),
        command: 'mkdir -p grunt-init-carnaby/node_modules'
      },
      install_ln: {
        options: shellOpts(),
        command: symlinks
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
        ].join(cmdjoint)
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
        ].join(cmdjoint)
      }
    },
    copy: {
      init: {
        files: [{
          expand: true,
          cwd: 'grunt-init-carnaby/root/app/common/scripts/common/helpers',
          dest: 'grunt-carnaby/tmp/common/scripts/common/helpers',
          src: '**'
        }]
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
    clean: {
      install: ['grunt-carnaby', 'grunt-init-carnaby']
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('install', [
    'clean:install',
    'shell:install_rm',
    'shell:install_clone',
    'shell:install_mkdir',
    'shell:install_ln',
    'shell:install_carnaby',
    'shell:install_init_carnaby'
  ]);

  grunt.registerTask('default', ['jshint']);
};
