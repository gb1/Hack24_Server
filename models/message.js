var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var article_id = Schema.ObjectId;

var Message = new Schema({
	user_id: String,
	article_id: article_id,
	created_at: Date,
	body: String,
});

var Message = mongoose.model('Message', Message);

module.exports = Message;