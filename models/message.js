var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
	id: ,
	created_at: Date, 
	body: String,
	});

var Message = mongoose.model('Message', Message);

module.exports = Message;