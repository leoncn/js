/*jslint node: true,  esnext: true */

'use strict';

const
    fs = require('fs'),
    net = require('net'),

    fname = process.argv[2],

    server = net.createServer(function(socket) {

        console.log("Established a new socketection.");

        // socket.write("now watching " + fname + " for changes...\n");

        socket.write('{ "type" : "watching", "file" : "target');



        let timer = setTimeout(function() {
            socket.write('.ext"}' + '\n');
            socket.end();
        }, 1000);

        socket.on('end', function() {
            clearTimeout(timer);
            console.log('Subscriber disconnected');
        });

        // socket.write(JSON.stringify({
        //     type: 'watching',
        //     file: fname
        // }) + "\n");

        // let watcher = fs.watch(fname, function(name) {
        //     // socket.write("File " + fname + " changed...\n");
        //     socket.write(JSON.stringify({
        //         type: name,
        //         file: fname,
        //         timestamp: Date.now()
        //     }) + "\n");
        //     console.log(name);
        // });

        // socket.on('close', function() {
        //     console.log("Subscriber is disconnected.");
        //     watcher.close();
        // });
    });

if (!fname) {
    throw Error("No file to watch");
}

server.listen(5432, 'localhost',
    function() {
        console.log("listening for new Subscriber.");
    });
// server.listen('/tmp/watcher.sock', function() {
//     console.log("listening for new Subscriber.");
// });

// server.close(function() {
//    console.log("Server is terminated."); 
// });