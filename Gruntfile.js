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
                        src: 'public/view/**/*.js',
                        dest: 'public/config/controller/',
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
            all: ['Grunfile.js', 'public/config/mainController.js', 'public/config/**/*.js', 'public/view/**/*.js']
        },

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'build/js/configController.min.js': ['public/config/mainController.js', 'public/view/**/*.js'],
                    'build/js/configDirective.min.js': ['public/config/directive/*.js'],
                    'build/js/configService.min.js': ['public/config/service/*.js']
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
                    'build/css/style.min.css': ['public/assets/css/style.css', 'public/assets/css/*.css']
                }
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            //copyFile: {
                //files: ['public/view/**/*.js'],
                //tasks: ['copy']
            //},
			scripts: {
                files: ['public/config/mainController.js', 'public/config/directive/*.js', 'public/config/service/*.js', 'public/view/**/*.js'],
                tasks: ['jshint', 'uglify']
            },
			css: {
                files: ['public/assets/css/*.css'],
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

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-task');

    // CREATE TASKS ==============================================================

    grunt.registerTask('build', ['bower:install']);
	
	//grunt.registerTask('watch', ['watch:copy']);

    grunt.registerTask('start', ['jshint', 'uglify', 'cssmin', 'connect', 'watch']);

};