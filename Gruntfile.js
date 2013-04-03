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
                    baseUrl: "public/js",
                    dir: "app-built",
                    mainConfigFile:"app/public/js/main-app.js",
                    optimize: "uglify",
                    modules: [
                        {
                            name: "common",
                            include: ["lib/bootstrap"],
                            exclude: ["lib/jquery"]
                        },
                        {
                            name: "main-index",
                            include: [],
                            exclude: [
                                "lib/common",
                                "lib/jquery"
                            ]
                        },
                        {
                            name: "main-app",
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
                            ],
                            exclude: [
                                "common",
                                "jquery"
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