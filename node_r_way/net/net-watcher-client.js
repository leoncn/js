/*jslint node: true , esnext: true */


'use strict';
const
	net = require('net'),
	ldj = require('./ldj.js'),

	socket = net.connect(5432, 'localhost', function() {
		console.log("connected.");
	}),

	ldjConnection = ldj.connect(socket);
	//ldjConnection = new ldj(socket); This line uses modlue.exports.

ldjConnection.on('message', function(message) {
	if (message.type == 'watching') {
		console.log('Now watching ' + message.file);
	} else if (message.type == 'change') {
		console.log(message.file + " changed at " + new Date(message.timestamp));
	} else {
		throw Error("Unknown " + message.toString());
	}
});
// socket.on('data', function(chunk) {
// 	let message = JSON.parse(chunk);
// 	if (message.type == 'watching') {
// 		console.log('Now watching ' + message.file);
// 	} else if (message.type == 'change') {
// 		console.log(message.file + " changed at " + new Date(message.timestamp));
// 	} else {
// 		throw Error("Unknown " + message.toString());
// 	}
// });

socket.on('error', function() {
	socket.destory();
});

socket.on('end', function() {
	console.log("Connection is closed by peer.");
});

socket.on('close', function(had_error) {
	console.log("connection is closed " + (had_error ? " due to error." : "."));
});