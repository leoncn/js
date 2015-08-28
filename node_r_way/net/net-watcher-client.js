/*jslint node: true , esnext: true */


'use strict';
const
	net = require('net'),
	client = net.connect(5432, 'localhost', function() {
		console.log("connected.");
	});


client.on('data', function(chunk) {
	let message = JSON.parse(chunk);
	if (message.type == 'watching') {
		console.log('Now watching ' + message.file);
	} else if (message.type == 'change') {
		console.log(message.file + " changed at " + new Date(message.timestamp));
	} else {
		throw Error("Unknown " + message.toString());
	}
});

client.on('error', function() {
	client.destory();
});

client.on('end', function() {
	console.log("Connection is closed by peer.");
});

client.on('close', function(had_error) {
	console.log("connection is closed " + (had_error ? " due to error." : "."));
});