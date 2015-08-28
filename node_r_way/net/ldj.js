/*jslint node: true,  esnext: true */

"use strict";

const
	events = require('events'),
	util = require('util'),

	LDJClient = function(stream) {
		events.EventEmitter.call(this);

		let
			self = this,
			buffer = '';

		stream.on('data', function(data) {
			buffer += data;
			let boundary = 0; 
			while ((boundary = buffer.indexOf('\n')) !== -1) {
				let msg = buffer.substr(0, boundary + 1);
				buffer = buffer.substr(boundary + 1);

				self.emit('message', JSON.parse(msg));
			}
		});
	};

util.inherits(LDJClient, events.EventEmitter);

//exports module methods

exports.LDJClient = LDJClient;
exports.connect = function(stream) {
	return new LDJClient(stream);
};

// module.exports = LDJClient;