var distDir = 'dist/';
var appDir = 'app/';
var buildDir = 'app/build/';
var assetsDir = 'app/assets/';
var mainDir = 'app/main/';
var coreDir = 'app/core/';
var layoutDir = 'app/layout/';
var sourceDir = 'source/';
var vendorDir = 'vendor/';
var appJsFiles = appDir + '**/*.js';
module.exports = function (grunt) {
    // CONFIGURE GRUNT ===========================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        appsourceName: 'app',

        // configure jshint to validate js files -----------------------------------
        jshint: {
            all: ['Gruntfile.js', coreDir + '**/*.js', mainDir + '**/*.js', layoutDir + '**/*.js']
        },

        // install source file of angular js
        bower: {
            install: {
                options: {
                    targetDir: 'vendor',
                    cleanBowerDir: true
                }
            }
        },

        concat: {
            options: {
                separator: '\n',
            },
            buildVen: {
                src: [
                    vendorDir + 'angular/*.js',
                    vendorDir + 'jquery/*.js',
                    vendorDir + 'angular-cookies/*.js',
                    vendorDir + 'angular-ui-router/*.js',
                    vendorDir + 'angular-sanitize/*.js',
                    vendorDir + 'bootstarp/*.js'
                ],
                dest: sourceDir + 'vendor.js'
            },
            build: {
                src: [appDir + '**/*.module.js', coreDir + '**/*.js', mainDir + '**/*.js', layoutDir + '**/*.js'],
                dest: sourceDir + '<%=appsourceName%>.js'
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            buildVen: {
                files: {
                    'app/build/vendor.min.css': [vendorDir + '**/*.css'],
                }
            },
            build: {
                files: {
                    'app/build/app.min.css': [assetsDir + 'css/style.css', assetsDir + 'css/*.css']
                }
            }
        },

        // copy js files -----------------------------------
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['main/**', 'assets/**', 'layout/**'],
                        dest: distDir
                    }
                ],
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: buildDir,
                        src: '*.css',
                        dest: distDir + 'assets/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: buildDir,
                        src: '*.js',
                        dest: distDir + 'assets/js/',
                        filter: 'isFile'
                    }
                ],
            }
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'buildAppCss',
                            replacement: 'build/app.min.css'
                        },
                        {
                            match: 'buildVendorCss',
                            replacement: 'build/vendor.min.css'
                        },
                        {
                            match: 'buildVendorJs',
                            replacement: 'build/vendor.min.js'
                        },
                        {
                            match: 'buildAppJs',
                            replacement: 'build/app.min.js'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['index.html'], dest: 'app/'}
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'buildAppCss',
                            replacement: 'assets/css/app.min.css'
                        },
                        {
                            match: 'buildVendorCss',
                            replacement: 'assets/css/vendor.min.css'
                        },
                        {
                            match: 'buildVendorJs',
                            replacement: 'assets/js/vendor.min.js'
                        },
                        {
                            match: 'buildAppJs',
                            replacement: 'assets/js/app.min.js'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['index.html'], dest: distDir}
                ]
            }
        },

        clean: {
            build: [buildDir + 'app.min.js', buildDir + 'app.min.css'],
            distCss: [distDir + 'assets/css/*'],
            distJs: [distDir + 'layout/**/*.js', distDir + 'main/**/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                mangle: true
            },
            buildVen: {
                src: sourceDir + 'vendor.js',
                dest: buildDir + 'vendor.min.js'
            },
            build: {
                src: sourceDir + 'app.js',
                dest: buildDir + 'app.min.js'
            }
        },

        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true,
                preset: 'airbnb'
            },
            all: {
                src: ['Gruntfile.js', 'app/core/*.js', 'app/main/*.js']
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            js: {
                files: [mainDir + '*.html', appJsFiles],
                tasks: ['jshint', 'concat:build', 'uglify:build'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: [assetsDir + 'css/*.css'],
                tasks: ['cssmin'],
                options: {
                    // Start a live reload server on the default port 35729
                    livereload: true,
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
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        assetsDir + 'css/*.css',
                        'app/*.html',
                        appJsFiles
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }

    });

    // LOAD GRUNT PLUGINS ========================================================
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-replace');

    // CREATE TASKS ==============================================================

    grunt.registerTask('build-ven', ['concat:buildVen', 'uglify:buildVen', 'cssmin:buildVen']);

    grunt.registerTask('install', ['bower:install', 'build-ven']);

    grunt.registerTask('build-dev', ['replace:build', 'jshint', 'concat:build', 'uglify:build', 'cssmin:build']);

    grunt.registerTask('build-prod', ['copy:build','clean:distCss','copy:dist', 'clean:distJs','replace:dist']);

    grunt.registerTask('default', ['build-dev', 'connect', 'watch']);
    //grunt.registerTask('default', ['build-dev', 'browserSync', 'watch']);

    //grunt.registerTask('watch', ['watch:copy']);

    //grunt.registerTask('start', ['jshint', 'uglify', 'cssmin', 'connect', 'watch']);

};
