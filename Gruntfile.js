module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      dist: {
        files: {
          '../gh-pages/index.html': ['index.html']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      dist: {
        files: {
          '../gh-pages/style/style-min.css': [
            'style/style.css'
          ]
        }
      }
    },

    //copy: {
    //  main: {
    //    files: [
    //      {
    //        expand: true,
    //        flatten: true,
    //        src: ['js/*'], dest: '../gh-pages/js/',
    //        filter: 'isFile'
    //      }
    //    ],
    //  },
    //},

    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'jsx',
            src: ['**/*.jsx'],
            dest: 'js',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      my_target: {
        files: {
          '../gh-pages/js/script-min.js': ['js/script.js']
        }
      }
    },

    browserify:     {
      options:      {
        transform:  [ require('grunt-react').browserify ]
      },
      //app:          {
      //  src:        'js/script.js',
      //  dest:       'js/wibar.js'
      //},
      client: {
        src: ['jsx/**/*.jsx'],
        dest: 'js/script.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('build', [
    'browserify', 'cssmin', 'uglify', 'processhtml'
  ]);
};
