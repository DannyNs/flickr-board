module.exports = function (grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);
    // angularjs templates
    grunt.loadNpmTasks('grunt-angular-templates');

    var copyAndReplace = function (initial, update) {
        var result = {};
        for (var prop in initial) {
            if (typeof initial[prop] === 'object' && typeof update[prop] === 'object' && initial[prop].constructor !== Array) {
                result[prop] = copyAndReplace(initial[prop], update[prop]);
            }
            else {
                result[prop] = (update[prop] !== undefined) ? update[prop] : initial[prop];
            }
        }
        return result;
    };

    // develop options
    var connectDevelop = {
        options: {
            port: 8888,
            livereload: true,
            open: false,
            base: ['.', '.tmp/'],
            hostname: 'localhost',
            middleware: function (connect, options, middlewares) {

                var extensionsToPassthroughRegex = /\.(css|js|png|jpg|json|ico)$/i;

                middlewares.unshift(function (req, res, next) {

                    var uri = req.url.split("?")[0];
                    var extensionExists = extensionsToPassthroughRegex.test(req.url);
                    var path = 'mocks' + uri + '/' + req.method + '.json';

                    // forward request if extension should be passed trough or file do not exists
                    if (extensionExists || req.url === '/' || !grunt.file.exists(path))
                        return next();

                    // read file and return content if it exists
                    res.end(grunt.file.read(path));

                });

                return middlewares;
            },
            onCreateServer: function (server) {
                var io = require('socket.io').listen(server);
                io.sockets.on('connection', function (socket) {
                    // do something with socket
                });
            }
        }
    };

    // watch configuration
    var watchDevelop = {
        files: ['app/**/*.js', 'app/**/*.jade', 'app/**/*.styl', 'index.jade', 'assets/**/*.styl', 'scripts.json', 'styles.json'],
        tasks: ['buildDevelop'],
        options: {
            spawn: false,
            livereload: true
        }
    };

    var karmaUnit = {
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/**/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'test/coverage'
        },     
        files: [
            {src: '<%= scripts %>'},
            {src: '.tmp/app/templates.js'},
            {src: ['bower_components/angular-mocks/angular-mocks.js', 'test/unit/**/*.test.js']},
            {src: 'config/config_develop.json', served: true, watched: false, included: false},
            {src: 'test/unit/fixtures/**/*.json', served: true, watched: true, included: false}
        ],
        proxies: {
            '/config.json': 'http://localhost:9876/base/config/config_develop.json'
        }
    };

    // plugins config
    grunt.initConfig({
        scripts: grunt.file.readJSON('scripts.json'),
        styles: grunt.file.readJSON('styles.json'),
        connect: {
            develop: connectDevelop,
            developNoMiddleware: copyAndReplace(connectDevelop, {options: {middleware: null}}),
            production: copyAndReplace(connectDevelop, {options: {base: ['public/']}}),
            productionNoMiddleware: copyAndReplace(connectDevelop, {options: {base: ['public/'], middleware: null}})
        },
        ngtemplates:  {
          app:        {
            cwd: '.tmp',     
            src: '**/*.html',
            dest: '.tmp/app/templates.js'
          }
        },        
        watch: {
            develop: watchDevelop,
            production: copyAndReplace(watchDevelop, {tasks: ['buildProduction']})
        },
        clean: {
            tmp: {
                src: [".tmp"]
            },
            public: {
                src: ["public"]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            develop: ['app/**/*.js']
        },
        copy: {
            replaceIndexPlaceholdersForDevelop: {
                src: '.tmp/index.html',
                dest: '.tmp/index.html',
                options: {
                    process: function (content) {
                        var timestamp = new Date().getTime();

                        var styles = "\n\n";
                        grunt.file.readJSON('styles.json').forEach(function (style) {
                            styles += '<link rel="stylesheet" type="text/css" href="' + style + '?t=' + timestamp + '">' + "\n";
                        });

                        var scripts = "\n\n";
                        grunt.file.readJSON('scripts.json').forEach(function (script) {
                            scripts += '<script src="' + script + '?t=' + timestamp + '"></script>' + "\n";
                        });

                        return content
                                .replace('<!-- {{styles}} -->', styles + "\n\n")
                                .replace('<!-- {{scripts}} -->', scripts + "\n");
                    }
                }
            },
            replaceIndexPlaceholdersForProduction: {
                src: '.tmp/index.html',
                dest: '.tmp/index.html',
                options: {
                    process: function (content) {
                        var timestamp = new Date().getTime();

                        return content
                                .replace('<!-- {{styles}} -->', "\n\n" + '<link rel="stylesheet" type="text/css" href="assets/css/application.css?t=' + timestamp + '">' + "\n\n")
                                .replace('<!-- {{scripts}} -->', "\n\n" + '<script src="app/application.js?t=' + timestamp + '"></script>' + "\n\n");
                    }
                }
            },
            configProduction: {
                src: 'config/config_production.json',
                dest: 'public/config.json'
            },
            configDevelop: {
                src: 'config/config_develop.json',
                dest: '.tmp/config.json'
            },
            jsToTmp: {
                files: [
                    {expand: true, cwd: "app", src: ['**/*.js'], dest: '.tmp/app'}
                ]
            },
            cssToTmp: {
                files: [
                    {expand: true, src: '<%= styles %>', dest: '.tmp/assets/css', flatten: true, filter: 'isFile'}
                ]
            },
            imagesToTmp: {
                files: [
                    {expand: true, cwd: "assets/img", src: ['**/*'], dest: '.tmp/assets/img'}
                ]
            },
            imagesToPublic: {
                files: [
                    {expand: true, cwd: ".tmp/assets/img", src: ['**/*'], dest: 'public/assets/img'}
                ]
            },
            fontsToTmp: {
                files: [
                    {expand: true, cwd: "assets/fonts", src: ['**/*'], dest: '.tmp/assets/fonts'}
                ]
            },
            fontsToPublic: {
                files: [
                    {expand: true, cwd: ".tmp/assets/fonts", src: ['**/*'], dest: 'public/assets/fonts'}
                ]
            },
            htmlToPublic: {
                files: [
                    {expand: true, cwd: ".tmp/", src: ['**/*.html'], dest: 'public'}
                ]
            },
            indexHtmlToPublic: {
                files: [
                    {expand: true, cwd: ".tmp/", src: ['index.html'], dest: 'public'}
                ]
            }
        },
        concat: {
            js: {
                src: '<%= scripts %>',
                dest: '.tmp/app/application.js'
            },
            applicationAndTemplates: {
                src: ['.tmp/app/application.js', '.tmp/app/templates.js'],
                dest: 'public/app/application.js'                
            },         
            css: {
                src: '<%= styles %>',
                dest: 'public/assets/css/application.css'
            }

        },
        uglify: {
            options: {
              ASCIIOnly: true
            },            
            application: {
                files: {
                    'public/app/application.js': 'public/app/application.js'
                }
            }
        },
        cssmin: {
            application: {
                files: {
                    'public/assets/css/application.css': ['public/assets/css/application.css']
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: ['assets/css', 'app']     
                },
                files: [{
                  expand: true,
                  cwd: 'assets/css/',
                  src: [ '*.styl' ],
                  dest: '.tmp/assets/css',
                  ext: '.css'
                }]
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: [
                    {
                        src: "index.jade",
                        dest: ".tmp",
                        expand: true,
                        ext: ".html"
                    },
                    {
                        cwd: "app",
                        src: "**/*.jade",
                        dest: ".tmp/app",
                        expand: true,
                        ext: ".html"
                    }
                ]
            }
        },
        sprite: {
            all: {
                src: 'assets/sprite/*.png',
                dest: '.tmp/assets/img/sprite.png',
                destCss: '.tmp/assets/css/sprite.css'
            }
        },
        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            unit: karmaUnit,
            unitNotSingleRun: copyAndReplace(karmaUnit, {singleRun: false}),
            production: copyAndReplace(karmaUnit, {
                reporters: ['progress'],
                files: [
                    {src: 'public/app/application.js'},
                    {src: ['bower_components/angular-mocks/angular-mocks.js', 'test/unit/**/*.test.js']},
                    {src: 'public/config.json', served: true, watched: false, included: false},
                    {src: 'test/unit/fixtures/**/*.json', served: true, watched: true, included: false}                    
                ],
                proxies: {
                    '/config.json': 'http://localhost:9876/base/public/config.json'
                }                
            })
        }

    });

    grunt.registerTask('default', []);

    grunt.registerTask('test', [
       'jade',       
       'ngtemplates:app',          
       'karma:' + (grunt.option('single-run') ? 'unit' : 'unitNotSingleRun')
    ]);

    grunt.registerTask('buildCommon', [
        'clean',
        'stylus',
        'jade',
        'sprite',
        'copy:jsToTmp',
        'copy:cssToTmp',
        'copy:imagesToTmp',
        'copy:fontsToTmp',
        'ngtemplates:app'        
    ]);

    grunt.registerTask('buildDevelop', [
        'jshint:develop',
        'buildCommon',
        'copy:configDevelop',
        'copy:replaceIndexPlaceholdersForDevelop',
        'karma:unit'
    ]);

    grunt.registerTask('buildProduction', [
        'buildCommon',
        'copy:configProduction',
        'copy:replaceIndexPlaceholdersForProduction',
        'concat:js',
        'concat:applicationAndTemplates',
        'uglify:application',
        'concat:css',
        'cssmin:application',
        'copy:imagesToPublic',
        'copy:fontsToPublic',
        'copy:indexHtmlToPublic',
        'karma:production'
    ]);

    grunt.registerTask('start', [
        'buildDevelop',
        'connect:' + (grunt.option('middleware') ? 'develop' : 'developNoMiddleware'),
        'watch:develop'
    ]);

    grunt.registerTask('startProduction', [
        'buildProduction',
        'connect:' + (grunt.option('middleware') ? 'production' : 'productionNoMiddleware'),
        'watch:production'
    ]);

};