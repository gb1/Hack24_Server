var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Article = new Schema({
	banner: String,
	header: String,
	url: String,
	summary: String,
	publish_datetime: Date,
});

var Article = mongoose.model('Article', Article);

module.exports = Article;