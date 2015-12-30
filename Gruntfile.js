/**
 * Build process for CKEditor Codemirror Plugin
 * This file contributed by Timm Stokke <timm@stokke.me>
 *
 * Don't know where to start?
 * Try: http://24ways.org/2013/grunt-is-not-weird-and-hard/
 */
module.exports = function(grunt) {

  // CONFIGURATION
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Minimize JS
    min: {
      options: {
        report: false
      },
      core: {
        src: ['codemirror/js/codemirror.js'],
        dest: 'codemirror/js/codemirror.min.js'
      },
	  modeBBCode: {
        src: [
          'codemirror/js/mode/bbcode/bbcode.js'
          ],
        dest: 'codemirror/js/codemirror.mode.bbcode.min.js'
      },
	  modeBBCodeMixed: {
        src: [
          'codemirror/js/mode/xml/xml.js',
          'codemirror/js/mode/javascript/javascript.js',
          'codemirror/js/mode/css/css.js',
          'codemirror/js/mode/htmlmixed/htmlmixed.js',
          'codemirror/js/mode/bbcode/bbcodemixed.js',
          'codemirror/js/mode/bbcodemixed/bbcodemixed.js'
          ],
        dest: 'codemirror/js/codemirror.mode.bbcodemixed.min.js'
      },
      modeHtml: {
        src: [
          'codemirror/js/mode/xml/xml.js',
          'codemirror/js/mode/javascript/javascript.js',
          'codemirror/js/mode/css/css.js',
          'codemirror/js/mode/htmlmixed/htmlmixed.js',
          'codemirror/js/mode/htmlembedded/htmlembedded.js'
          ],
        dest: 'codemirror/js/codemirror.mode.htmlmixed.min.js'
      },
      modePHP: {
        src: [
          'codemirror/js/mode/htmlmixed/htmlmixed.js',
          'codemirror/js/mode/xml/xml.js',
          'codemirror/js/mode/javascript/javascript.js',
          'codemirror/js/mode/css/css.js',
          'codemirror/js/mode/clike/clike.js',
          'codemirror/js/mode/php/php.js'
          ],
        dest: 'codemirror/js/codemirror.mode.php.min.js'
      },
      modeJs: {
        src: ['codemirror/js/mode/javascript/javascript.js'],
        dest: 'codemirror/js/codemirror.mode.javascript.min.js'
      },
      addons: {
        src: [
          'codemirror/js/addon/comment/continuecomment.js',
          'codemirror/js/addon/edit/closebrackets.js',
          'codemirror/js/addon/edit/closetag.js',
          'codemirror/js/addon/edit/matchbrackets.js',
          'codemirror/js/addon/edit/matchtags.js',
          'codemirror/js/addon/edit/trailingspace.js',
          'codemirror/js/addon/fold/foldcode.js',
          'codemirror/js/addon/fold/foldgutter.js',
          'codemirror/js/addon/fold/brace-fold.js',
          'codemirror/js/addon/fold/comment-fold.js',
          'codemirror/js/addon/fold/indent-fold.js',
          'codemirror/js/addon/fold/xml-fold.js',
          'codemirror/js/addon/format/autoFormatAll.js',
          'codemirror/js/addon/format/formatting.js',
          'codemirror/js/addon/selection/active-line.js',
          'codemirror/js/addon/search/match-highlighter.js',
          'codemirror/js/addon/mode/multiplex.js'
          ],
        dest: 'codemirror/js/codemirror.addons.min.js'
      },
      addonSearch: {
        src: [
          'codemirror/js/addon/dialog/dialog.js',
          'codemirror/js/addon/search/search.js',
          'codemirror/js/addon/search/searchcursor.js'
          ],
        dest: 'codemirror/js/codemirror.addons.search.min.js'
      },
      beautify: {
        src: [
          'codemirror/js/beautify.js',
          'codemirror/js/beautify-html.js'
          ],
        dest: 'codemirror/js/beautify.min.js'
      }
    },

    // Optimize images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'codemirror/icons/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'codemirror/icons/'
        }]
      }
    },

    // CSS Minify
    cssmin: {
      combine: {
        files: {
          'codemirror/css/codemirror.min.css': 
		  [
		  'codemirror/css/codemirror.css', 
		  'codemirror/css/codemirror.ckeditor.css',
 		  'codemirror/js/addon/dialog/dialog.css',
		  'codemirror/js/addon/fold/foldgutter.css'
		  ]
        }
      }
    },

    // Watch
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['codemirror/js/*.js', 'codemirror/addon/*.js', 'codemirror/mode/*.js'],
        tasks: ['min'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['codemirror/css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      }
    }

  });

  // PLUGINS
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-yui-compressor');

  grunt.registerTask('watch', [
    'min',
    'cssmin',
    'imagemin',
    'watch'
    ]);

  grunt.registerTask('default', [
    'min',
    'cssmin',
    'imagemin'
    ]);

};
