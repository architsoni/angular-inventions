var distDir = 'dist/';
var appDir = 'app/';
var buildDir = 'build/';
var sourceDir = 'source/';
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
            all: ['Gruntfile.js', appJsFiles]
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
            build: {
                files: [
                    /* source concat */
                    {
                        src: [appDir + '**/*.module.js', appDir + '**/*.js'],
                        dest: sourceDir + '<%=appsourceName%>.js'
                    },
                    /* vendor min-files concat */
                    {
                        src: ['vendor/angular.js', 'vendor/**/*.js'],
                        dest: sourceDir + 'vendor.js'
                    }
                ]
            },
            dist: {
                src: [distDir + 'vendor.min.js', distDir + '<%=appsourceName%>.min.js',
                    distDir + '<%=ngtemplates.prod.dest%>'],
                dest: distDir + '<%=pkg.name%>.min.js'
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'build/vendor.min.css': ['vendor/**/*.css'],
                    'build/app.min.css': ['assets/css/style.css', 'assets/css/*.css']
                }
            }
        },

        // copy js files -----------------------------------
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: buildDir,
                        src: ['*min.js', '*.css'],
                        dest: distDir
                    }
                ],
            },
        },
        clean: {
            build: [buildDir + '*', 'source/'],
            dist: [distDir + '*']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            build: {
                options: {
                    banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                    mangle: true
                },
                files: [
                    {
                        src: sourceDir + 'vendor.js',
                        dest: buildDir + 'vendor.min.js'
                    }, {
                        src: sourceDir + 'app.js',
                        dest: buildDir + 'app.min.js'
                    }
                ]
            }
        },

        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true,
                preset: 'airbnb'
            },
            all: {
                src: ['Gruntfile.js', 'app/**/*.js']
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            js: {
                files: ['Gruntfile.js', appJsFiles],
                tasks: ['jshint', 'uglify:build', 'concat:build'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['assets/css/*.css'],
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
                    port: 9001
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-jscs');

    // CREATE TASKS ==============================================================

    grunt.registerTask('install', ['bower:install']);

    grunt.registerTask('build-dev', ['jshint', 'clean:build', 'concat:build', 'uglify:build', 'cssmin:build']);

    grunt.registerTask('build-prod', ['build-dev', 'clean:dist',
        'copy:dist', 'concat:dist']);

    grunt.registerTask('default', ['build-dev', 'connect', 'watch']);

    //grunt.registerTask('watch', ['watch:copy']);

    //grunt.registerTask('start', ['jshint', 'uglify', 'cssmin', 'connect', 'watch']);

};
