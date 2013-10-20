/*global module:false*/
var path = require('path');

module.exports = function(grunt) {

  var _ = grunt.util._;

  //--------------------------------------------------------------------------
  //
  // Shell helpers
  //
  //--------------------------------------------------------------------------

  var shellOpts = function (opts) {
    return _.extend({
        stdout: true,
        stderr: true,
        failOnError: true
    }, opts || {});
  };

  var cwdOpts = function (cwd) {
    return function (opts) {
      opts = opts || {};
      opts.execOptions = { cwd: cwd };
      return shellOpts(opts);
    };
  };

  var grunt_init_carnaby_shellOpts = cwdOpts('grunt-init-carnaby');
  var grunt_carnaby_shellOpts = cwdOpts('grunt-carnaby');

  var opts = {
    'meta-carnaby': shellOpts,
    'grunt-init-carnaby': grunt_init_carnaby_shellOpts,
    'grunt-carnaby': grunt_carnaby_shellOpts
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
  // Git helpers
  //
  //--------------------------------------------------------------------------

  var git = function (project, command) {
    return {
      options: opts[project](),
      command: command
    };
  };

  var git_cmd = function (command) {
    return function (project) {
      return git(project, command);
    };
  };


  var gst = git_cmd('git status');
  var gup = git_cmd('git fetch && git rebase');
  var gp = git_cmd('git push');
  // see http://stackoverflow.com/questions/8123674/how-to-git-commit-nothing-without-an-error
  // see http://stackoverflow.com/questions/2657935/checking-for-a-dirty-index-or-untracked-files-with-git/2659808#2659808
  var gca = git_cmd('git diff-files --quiet || git commit -a');
  // see http://stackoverflow.com/questions/3801321/git-list-only-untracked-files-also-custom-commands/3801554#3801554
  var gcA = git_cmd('test -z "$(git ls-files --others --exclude-standard)" || ( git add -A && git commit )');

  //--------------------------------------------------------------------------
  //
  // Grunt
  //
  //--------------------------------------------------------------------------

  grunt.initConfig({

    shell: {

      //----------------------------------
      //
      // Git
      //
      //----------------------------------

      // status
      gst_meta_carnaby: gst('meta-carnaby'),
      gst_grunt_carnaby: gst('grunt-carnaby'),
      gst_grunt_init_carnaby: gst('grunt-init-carnaby'),

      // commit -a
      gca_meta_carnaby: gca('meta-carnaby'),
      gca_grunt_carnaby: gca('grunt-carnaby'),
      gca_grunt_init_carnaby: gca('grunt-init-carnaby'),

      // add -A && commit
      gcA_meta_carnaby: gcA('meta-carnaby'),
      gcA_grunt_carnaby: gcA('grunt-carnaby'),
      gcA_grunt_init_carnaby: gcA('grunt-init-carnaby'),

      // fetch && rebase
      gup_meta_carnaby: gup('meta-carnaby'),
      gup_grunt_carnaby: gup('grunt-carnaby'),
      gup_grunt_init_carnaby: gup('grunt-init-carnaby'),

      // git push
      gp_meta_carnaby: gp('meta-carnaby'),
      gp_grunt_carnaby: gp('grunt-carnaby'),
      gp_grunt_init_carnaby: gp('grunt-init-carnaby'),

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
        options: grunt_carnaby_shellOpts(),
        command: [
          'npm install',
          'bower install',
          'grunt'
        ].join(cmdjoint)
      },

      install_grunt_init_carnaby: {
        options: grunt_init_carnaby_shellOpts(),
        command: [
          'npm install',
          'bower install',
          'grunt'
        ].join(cmdjoint)
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
    'shell:install_grunt_init_carnaby'
  ]);

  grunt.registerTask('gst', [
    'shell:gst_meta_carnaby',
    'shell:gst_grunt_carnaby',
    'shell:gst_grunt_init_carnaby'
  ]);

  grunt.registerTask('gca', [
    'shell:gca_meta_carnaby',
    'shell:gca_grunt_carnaby',
    'shell:gca_grunt_init_carnaby'
  ]);

  grunt.registerTask('gcA', [
    'shell:gcA_meta_carnaby',
    'shell:gcA_grunt_carnaby',
    'shell:gcA_grunt_init_carnaby'
  ]);

  grunt.registerTask('gup', [
    'shell:gup_meta_carnaby',
    'shell:gup_grunt_carnaby',
    'shell:gup_grunt_init_carnaby'
  ]);

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('start', ['default', 'watch']);
};
