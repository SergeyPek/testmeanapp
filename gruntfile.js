'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            watchers: {
                files: [
                    'views/**/*.html',
                    'routes/**/*.js',
                    'models/**/*.js',
                    'public/**/*.js',
                    'public/**/*.html',
                    'public/**/*.css',
                    'public/**/*.scss',
                    'app.js'
                ],
                options: {
                    livereload: true
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    src: ['public/**/*.scss'],
                    ext: '.css',
                    rename: function (base, src) {
                        return src.replace('/scss/', '/css/');
                    }
                }]
            }
        },

        nodemon: {
            dev: {
                script: './bin/www'
            }
        },
        concurrent: {
            default: ['sass', 'nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['concurrent:default']);
};