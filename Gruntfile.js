let commands = (grunt) =>{
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'scripts/**/*.js'],
            options: {
                esversion: 6
            },
        },
        watch: {
        files: ['scripts/**/*.js', "*.js"],
        tasks: ['jshint','uglify']
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
            },
            my_target: {
                files: {
                    'scripts/g2048/2048.main.js': ['scripts/g2048/2048.js']
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
        }
    });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  
  grunt.registerTask('default', ['jshint','watch', 'uglify']);
  grunt.registerTask('server', ['connect:server']);
};
module.exports = commands;