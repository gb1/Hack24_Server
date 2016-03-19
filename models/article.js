var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('../models/Message');

var Article = new Schema({
	banner: String,
	header: String,
	url: String,
	summary: String,
	publish_datetime: Date,
	messages: [ Message ]
});

var Article = mongoose.model('Article', Article);

module.exports = Article;