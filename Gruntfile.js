let commands = (grunt) =>{
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'scripts/**/*.js'],
            options: {
                esversion: 6
            }
        },
        
        watch: {
            files: ['scripts/**/*.js', "/*.js"],
            tasks: ['jshint','uglify','babel']
        },
        uglify: {
            options: {
                sourceMap: true,
            },
            my_target: {
                files: {
                    
                }
            }
        },
         connect: {
            server: {
            options: {
                port: 8081,
                index: 'index.html',
                keepalive: true
            }
            }
        },
        // babel: {
        //     options: {
        //         sourceMap: true,
        //         presets: ['babel-preset-es2015']
        //     },
        //     dist: {
        //         files: {
        //             'scripts/succulent/test1.js': 'scripts/succulent/test.js'
        //         }
        //     }
        // }
    });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
//  grunt.loadNpmTasks('grunt-babel');
  
  grunt.registerTask('default', ['jshint','watch']);
  grunt.registerTask('server', ['connect:server']);
};
module.exports = commands;