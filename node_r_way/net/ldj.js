/*jslint node: true,  esnext: true */

const
	events = require('events'),
	util = require('util'),

	LDJClient = function(stream) {
		events.EventEmitter.call(this);
	};

util.inherits(LDJClient, events.EventEmitter);