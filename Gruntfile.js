var path = require('path');
var fs = require('fs');

var root = {
    grunt: './Gruntfile.js',
    app: './app/',
    components: './app/components/',
    directives: './app/directives/',
    css: './app/assets/css/',
    images: './app/assets/images/',
    js: './app/assets/js/',
    fonts: './app/assets/fonts/',
    views: './app/views/',
    vendor: './vendor/'
};

module.exports = function (grunt) {
    // CONFIGURE GRUNT ===========================================================
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        appName: 'app',

        // CONFIGURE JSHINT FOR VALIDATE JS FILES ========================================================
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                root.grunt,
                root.angular + '**/*.js',
                root.views + '**/*.js'
            ],

        },

        // INSTALL EXTERNAL RESOURCES ========================================================
        bower: {
            install: {
                options: {
                    targetDir: 'vendor',
                    cleanBowerDir: true
                }
            }
        },

        // CONFIGURE CONCAT FOR CAONCATE GROUP OF FILES ========================================================
        concat: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                options: {
                    process: function (src, filepath) {
                        var fileSize = fs.statSync(filepath).size;
                        console.log("Processing '" + filepath + "' (" + fileSize + " bytes)");
                        return src;
                    },
                },
                src: [
                    root.vendor + 'angular/angular.js',
                    root.vendor + 'jquery/jquery.js',
                    root.vendor + 'angular-ui-router/angular-ui-router.js',
                    root.vendor + 'angular-cookies/angular-cookies.js',
                    root.vendor + 'angular-scroll/angular-scroll.js',
                    root.vendor + 'bootstrap/bootstrap.js',
                    root.vendor + 'moment/moment.js',
                    root.vendor + 'ng-file-upload/ng-file-upload.js'
                ],
                dest: root.js + 'vendor.js'
            }

        },

        // CONFIGURE LESS==================================================
        less: {
            build: {
                src: root.views + '**/*.less',
                dest: root.css + 'app.css',
                options: {
                    compress: true
                }
            }
        },

        // CONFIGURE LESS==================================================
        tags: {
            build: {
                src: [
                    root.css + 'vendor.min.css',
                    root.css + '*.css',
                    root.js + 'vendor.min.js',
                    root.app + '*.module.js',
                    root.app + '*.config.js',
                    root.app + '*.run.js',
                    root.app + '*.constant.js',
                    root.app + '*.service.js',
                    root.views + '**/*.module.js',
                    root.views + '**/*.controller.js',
                    root.views + '**/*.service.js',
                    root.views + '**/*.factory.js'
                ],
                dest: 'app/index.html'
            }
        },

        // CONFIGURE CSSMIN FOR MINIFY CSS FILES ========================================================
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'app/assets/css/vendor.min.css': [root.vendor + '**/*.css']
                }
            }
        },

        // CONFIGURE CLEAN ========================================================
        clean: {
            build: ['.temp/']
        },

        // CONFIGURE COPY ========================================================
        copy: {},

        // CONFIGURE UGLIFY FOR MINIFY JS FILES ========================================================
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                src: [
                    root.vendor + 'angular/angular.js',
                    root.vendor + 'jquery/jquery.js',
                    root.vendor + 'angular-ui-router/angular-ui-router.js',
                    root.vendor + 'angular-cookies/angular-cookies.js',
                    root.vendor + 'angular-scroll/angular-scroll.js',
                    root.vendor + 'bootstrap/bootstrap.js',
                    root.vendor + 'moment/moment.js',
                    root.vendor + 'ng-file-upload/ng-file-upload.js'
                ],
                dest: root.js + 'vendor.min.js'
            },
        },

        // CONFIGURE WATCH FOR AUTO UPDATE ========================================================
        watch: {
            build: {
                files: [
                    root.app + '*.js',
                    root.views + '**/*.js',
                    root.views + '**/*.less'
                ],
                tasks: [
                    'jshint',
                    'less:build',
                    'tags:build'
                ],
                options: {
                    livereload: true,
                }
            }
        },

        jscs: {
            all: {
                src: [
                    'Gruntfile.js',
                    root.app + '**/*.js',
                    root.views + '**/**/**/*.js',
                ]
            }
        },

        express: {
            server: {
                options: {
                    port: 9001,
                    server: path.resolve(__dirname, 'server/<%= pkg.main %>')
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app/'
                }
            }
        }

    });

    // LOAD GRUNT PLUGINS ========================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-cache-breaker');


    // CREATE TASKS ==============================================================
    grunt.registerTask('install', ['bower:install', 'tags:build', 'uglify:build', 'cssmin:build']);
    grunt.registerTask('production', ['clean:dist', 'copy:folder', 'copy:html', 'clean:distfiles', 'jscs']);
    grunt.registerTask('development', ['jshint', 'less:build', 'tags:build']);
    grunt.registerTask('build', ['development', 'connect', 'watch']);
    grunt.registerTask('default', []);

};
