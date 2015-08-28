"use strict"

const 
    fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];

if(!filename) {
    throw Error("pls sepcify a file");
}

fs.watch(filename, function() {
    let ls = spawn('ls', ['-lh', filename]),
    out = '';

    ls.on('error', function() {
        console.log('not able to access');
    });

    ls.stdout.on('data', function(chunk) {
        out += chunk.toString();
    });

    ls.on('close', function() {
        let parts = out.split(/\s+/);
        if(parts.length > 8)
        console.dir([ parts[0], parts[4],parts[8] ]);
    });

    console.log("File " + filename + " just changed"); 
});

console.log("Now watching " + filename + " for changes....");
