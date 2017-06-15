'use strict';

var gulp = require('gulp');
var spawn = require('child_process')
    .spawn;
const INDEX = './index';
var command;

gulp.watch('./*.js', [process.argv[2] ? process.argv[2] : 'default']);

gulp.task('index', () => {

    if (command != undefined) {
        command.kill('SIGHUP');
    }

    command = spawn("node", [INDEX]);

    command.stdout.on('data', function(data) {
        process.stdout.write(data);
    });

    command.on('close', function(code) {
        console.log('terminated');
    });

});

gulp.task('default', []);
