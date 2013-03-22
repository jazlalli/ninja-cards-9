module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'app/public/js/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        requirejs:{
            compile:{
                options:{
                    appDir: "app",
                    dir: "app-built",
                    baseUrl: "app/public/js",
                    mainConfigFile:"app/public/js/app-main.js",
                    optimize: "uglify",
                    modules: [
                        {
                            name: "app-main",
                            include: [
                                "app",
                                "bootstrapper",
                                "controllers/cardsController",
                                "controllers/cardDetailController",
                                "directives/cardGridDirective",
                                "directives/cardItemDirective",
                                "directives/cardFilterDirective",
                                "directives/cardDetailsDirective",
                                "services/categoryMappingservice",
                                "libs/angular"
                            ]
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-testacular');
    
    // Alias the `test` task to run `testacular` instead
    grunt.registerTask('test', 'run the testacular test driver', function () {
        var done = this.async();
        require('child_process').exec('testacular start --single-run', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['requirejs']);
};