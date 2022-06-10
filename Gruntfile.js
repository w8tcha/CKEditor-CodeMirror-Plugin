/**
 * Build process for CKEditor Codemirror Plugin
 * This file contributed by Timm Stokke <timm@stokke.me>
 *
 * Don't know where to start?
 * Try: http://24ways.org/2013/grunt-is-not-weird-and-hard/
 */
module.exports = function(grunt) {

    var addons = [
        "addon/comment/continuecomment.js",
        "addon/edit/closebrackets.js",
        "addon/edit/closetag.js",
        "addon/edit/matchbrackets.js",
        "addon/edit/matchtags.js",
        "addon/edit/trailingspace.js",
        //'addon/fold/foldcode.js' // gets included as a dependency
        "addon/fold/foldgutter.js",
        "addon/fold/brace-fold.js",
        "addon/fold/comment-fold.js",
        "addon/fold/indent-fold.js",
        //'addon/fold/xml-fold.js', // gets included as a dependency
        "addon/hint/show-hint.js",
        "addon/hint/javascript-hint.js",
        "addon/hint/css-hint.js",
        //"addon/hint/xml-hint.js", // gets included as a dependency
        "addon/hint/html-hint.js",
        "addon/format/autoFormatAll.js",
        "addon/format/formatting.js",
        "addon/selection/active-line.js",
		"addon/selection/wrap-selection.js",
        "addon/search/match-highlighter.js",
        "addon/mode/multiplex.js" // TODO also required from htmlembedded
    ];
// CONFIGURATION
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            core: {
                options: {
                    baseUrl: "node_modules/codemirror/lib",
                    include: ["codemirror.js"],
                    preserveLicenseComments: false,
                    optimize: "none",
                    out: "codemirror/js/codemirror.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("core", ["codemirror.js"], function (codemirror){' +
                            "        window.CodeMirror = codemirror;" +
                            "    });" +
                            "})(this)"
                    }
                }
            },
            modeHandlebars: {
                options: {
                    baseUrl: "codemirror/js",
                    include: [
                        "mode/handlebars/handlebars.js",
                        "mode/xml/xml.js",
                        "addon/mode/simple.js"
                    ],
                    paths: {
                        'lib/codemirror': "empty:"
                    },
                    preserveLicenseComments: false,
                    out: "codemirror/js/codemirror.mode.handlebars.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("modeHandlebars", ["mode/handlebars/handlebars.js"], function (){' +
                            "    });" +
                            "})(this)"
                    }
                }
            },
            modeTwig: {
                options: {
                    baseUrl: "codemirror/js",
                    include: [
                        "mode/twig/twig.js",
                        "mode/xml/xml.js",
                        "addon/mode/multiplex.js"
                    ],
                    paths: {
                        'lib/codemirror': "empty:"
                    },
                    preserveLicenseComments: false,
                    out: "codemirror/js/codemirror.mode.twig.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("modeTwig", ["mode/twig/twig.js"], function (){' +
                            "    });" +
                            "})(this)"
                    }
                }
            },
            modeSql: {
                options: {
                    baseUrl: "codemirror/js",
                    include: ["mode/sql/sql.js"],
                    paths: {
                        'lib/codemirror': "empty:"
                    },
                    preserveLicenseComments: false,
                    out: "codemirror/js/codemirror.mode.sql.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("modeSql", ["mode/sql/sql.js"], function (){' +
                            "    });" +
                            "})(this)"
                    }
                }
            },
            modeHtml: {
                options: {
                    baseUrl: "codemirror/js",
                    paths: {
                        'lib/codemirror': "empty:",
                        'codemirror.js': "empty:"
                    },
                    preserveLicenseComments: false,
                    include: [
                        "mode/htmlembedded/htmlembedded.js"
                    ],
                    out: "codemirror/js/codemirror.mode.htmlmixed.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof define && ' +
                            '    define("modeHtml",["mode/htmlembedded/htmlembedded.js"], function (){' +
                            "    });" +
                            "})(this)"
                    },
                }
            },
            modePHP: {
                options: {
                    baseUrl: "codemirror/js",
                    paths: {
                        'lib/codemirror': "empty:",
                    },
                    preserveLicenseComments: false,
                    include: [
                        "mode/php/php.js"
                    ],
                    out: "codemirror/js/codemirror.mode.php.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("modePHP",["mode/php/php.js"], function (){' +
                            "    });" +
                            "})(this)"
                    },
                }
            },
            modeJs: {
                options: {
                    baseUrl: "codemirror/js",
                    paths: {
                        'lib/codemirror': "empty:",
                    },
                    preserveLicenseComments: false,
                    include: [
                        "mode/javascript/javascript.js"
                    ],
                    out: "codemirror/js/codemirror.mode.javascript.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("modeJs",["mode/javascript/javascript.js"], function (){' +
                            "    });" +
                            "})(this)"
                    },
                }
            },
            addons: {
                options: {
                    baseUrl: "codemirror/js",
                    paths: {
                        'lib/codemirror': "empty:",
                    },
                    preserveLicenseComments: false,
                    include: addons,
                    out: "codemirror/js/codemirror.addons.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("addons",["' +
                            addons.join('","') +
                            '"], function (){' +
                            "    });" +
                            "})(this)"
                    }
                }
            },
            addonSearch: {
                options: {
                    baseUrl: "codemirror/js",
                    paths: {
                        'lib/codemirror': "empty:",
                    },
                    optimize: "none",
                    preserveLicenseComments: false,
                    include: [
                        "addon/search/search.js"
                    ],
                    out: "codemirror/js/codemirror.addons.search.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    "function"==typeof window.define && ' +
                            '    window.define("addonSearch",["addon/search/search.js"], function (){' +
                            "    });" +
                            "})(this)"
                    },
                }
            },
            beautify: {
                options: {
                    baseUrl: "node_modules/js-beautify/js/lib",
                    paths: {
                        'beautify-css': "empty:"
                    },
                    preserveLicenseComments: false,
                    include: [
                        "beautify.js",
                        "beautify-html.js"
                    ],
                    map: {
                        '*': {
                            './beautify': "beautify.js",
                            'beautify': "beautify.js"
                        }
                    },
                    out: "codemirror/js/beautify.min.js",
                    wrap: {
                        end: "(function(window){" +
                            '    if("function"==typeof window.define){ ' +
                            '    window.define("beautify",["beautify.js"], function (b){return b;}); ' +
                            '    window.define("beautify-css",[], function (){return {css_beautify:undefined};}); ' + //I know, i know...
                            '    window.define("beautifyModule",["beautify", "beautify-html.js"], function (js_beautify, html_beautify){' +
                            "        window.js_beautify = js_beautify.js_beautify;" +
                            "        window.html_beautify = html_beautify.html_beautify;" +
                            "    });}" +
                            "})(this)"
                    },
                }
            },
        },
        // Minimize JS
        uglify: {
            options: {
                report: false
            },
            core: {
                src: [
                    "codemirror/js/codemirror.min.js",
                ],
                dest: "codemirror/js/codemirror.min.js"
            },
            searchAddon: {
                src: [
                    "codemirror/js/codemirror.addons.search.min.js",
                ],
                dest: "codemirror/js/codemirror.addons.search.min.js"
            },
            mergeAddon: {
                src: [
                    "codemirror/js/addon/merge/merge.js",
                ],
                dest: "codemirror/js/codemirror.addon.merge.min.js"
            },
            modeBBCode: {
                src: [
                    "codemirror/js/mode/bbcode/bbcode.js"
                ],
                dest: "codemirror/js/codemirror.mode.bbcode.min.js"
            },
            modeBBCodeMixed: {
                src: [
                    "codemirror/js/mode/xml/xml.js",
                    "codemirror/js/mode/javascript/javascript.js",
                    "codemirror/js/mode/css/css.js",
                    "codemirror/js/mode/htmlmixed/htmlmixed.js",
                    "codemirror/js/mode/bbcode/bbcodemixed.js",
                    "codemirror/js/mode/bbcodemixed/bbcodemixed.js"
                ],
                dest: "codemirror/js/codemirror.mode.bbcodemixed.min.js"
            },
        },

        // CSS Minify
        cssmin: {
            dist: {
                options: {
                    report: false
                },
                files: [
                    {
                        src: [
                            "node_modules/codemirror/lib/codemirror.css",
                            "codemirror/css/codemirror.ckeditor.css",
                            "node_modules/codemirror/addon/dialog/dialog.css",
                            "node_modules/codemirror/addon/hint/show-hint.css",
                            "node_modules/codemirror/addon/fold/foldgutter.css",
                            "node_modules/codemirror/addon/merge/merge.css",
                            "node_modules/codemirror/addon/search/matchesonscrollbar.css"
                        ],
                        dest: "codemirror/css/codemirror.min.css"
                    }
                ]
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ["codemirror/js/*.js", "codemirror/addon/*.js", "codemirror/mode/*.js"],
                tasks: ["uglify"],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ["codemirror/css/*.css"],
                tasks: ["cssmin"],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            addon: {
                files: [
                    { expand: true, src: "**/*", cwd: "node_modules/codemirror/addon", dest: "codemirror/js/addon" }
                ]
            },
            mode: {
                files: [
                    { expand: true, src: "**/*", cwd: "node_modules/codemirror/mode", dest: "codemirror/js/mode" }
                ]
            },
            theme: {
                files: [
                    { expand: true, src: "**/*", cwd: "node_modules/codemirror/theme", dest: "codemirror/theme" }
                ]
            }
        },
		devUpdate: {
            main: {
                options: {
                    reportUpdated: true,
					updateType: "force",
					semver: true
                }
            }
        }
    });

    // PLUGINS
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-dev-update");

    grunt.registerTask("watch",
        [
			"copy",
			"requirejs",
            "uglify",
            "cssmin",
            "watch",
        ]);

    grunt.registerTask("default",
        [
			"devUpdate",
			"copy",
			"requirejs",
            "uglify",
            "cssmin"
        ]);

};