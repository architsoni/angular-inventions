module.exports = function (grunt) {

    // CONFIGURE GRUNT ===========================================================

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // copy js files -----------------------------------
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: 'src/view/login/loginController.js',
                        dest: 'src/config/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: 'src/view/home/homeController.js',
                        dest: 'src/config/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ],
            },
        },

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['Grunfile.js', 'src/config/**/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/configController.min.js': ['src/config/mainController.js', 'src/config/homeController.js', 'src/config/loginController.js'],
                    'dist/js/configDirective.min.js': ['src/config/appHeader.js','src/config/appFooter.js', 'src/config/appLoader.js','src/config/appCarousel.js'],
                    'dist/js/configService.min.js': ['src/config/mainService.js']
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['src/assets/css/style.css', 'src/assets/css/loader.css', 'src/assets/css/header.css', 'src/assets/css/footer.css', 'src/assets/css/menubar.css', 'src/assets/css/slider.css', 'src/assets/css/home.css']
                }
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'uglify']
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: 'source',
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true
                }
            }
        }

    });

    // LOAD GRUNT PLUGINS ========================================================

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');

    // CREATE TASKS ==============================================================

    grunt.registerTask('build', ['bower:install']);

    grunt.registerTask('default', ['copy','jshint', 'uglify', 'cssmin', 'connect']);

};