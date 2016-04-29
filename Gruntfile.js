module.exports = function (grunt) {

    // CONFIGURE GRUNT ===========================================================

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
		
		// install source file of angular js
		bower: {
            install: {
                options: {
                    targetDir: 'source',
					cleanBowerDir: true
                }
            }
        },

        // copy js files -----------------------------------
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: 'view/login/loginController.js',
                        dest: 'config/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: 'view/home/homeController.js',
                        dest: 'config/',
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
            all: ['Grunfile.js', 'config/**/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/configController.min.js': ['config/mainController.js', 'config/homeController.js', 'config/loginController.js'],
                    'dist/js/configDirective.min.js': ['config/appHeader.js','config/appFooter.js', 'config/appLoader.js','config/appCarousel.js'],
                    'dist/js/configService.min.js': ['config/mainService.js']
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
                    'dist/css/style.min.css': ['assets/css/style.css', 'assets/css/loader.css', 'assets/css/header.css', 'assets/css/footer.css', 'assets/css/menubar.css', 'assets/css/slider.css', 'assets/css/home.css']
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