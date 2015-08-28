'use strict';

const
    fs = require('fs'),
    net = require('net'),

    fname = process.argv[2],

    server = net.createServer(function(socket) {

        console.log("Established a new socketection.");

        socket.write("now watching " + fname + " for changes...\n");

        let watcher = fs.watch(fname, function(name) {
            socket.write("File " + fname + " changed...\n");
            console.log(name);
        });

        socket.on('close', function() {
            console.log("Subscriber is disconnected.");
            watcher.close();
        });
    });

if (!fname) {
    throw Error("No file to watch");
}

server.listen(5432, 'localhost');