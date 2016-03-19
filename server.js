var Pusher = require('pusher');
var path = require('path');
var mongoose = require('mongoose');
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var http = require('http');

var db = mongoose.connect('mongodb://admin:admin@ds037165.mlab.com:37165/intheloop');

var app = express();

var Message = require('./models/Message');
var Article = require('./models/Article');

// Set the views engine to ejs and the default views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use body parser to get data from the user.
app.use(bodyParser());


// Pusher instance

var pusher = new Pusher({
	appId: '189125',
	key: '740d0f36323febd6a8c3',
	secret: 'a259a17cb781b098ed62',
	encrypted: true
});


// Articles

// Generate some random articles

app.get('/articles', function(req, res) {
	var images = [
		faker.image.business(),
		faker.image.cats(),
		faker.image.city(),
		faker.image.nightlife(),
		faker.image.fashion(),
		faker.image.technics(),
		faker.image.sports(),
		faker.image.people()
	]

	for (var i = 0; i < 100; i++) {
		var image = images[Math.floor(Math.random()*images.length)]
		var article = new Article({
			banner: image,
			header: faker.fake("{{lorem.sentence}}"),
			url: faker.fake("{{internet.url}}"),
			summary: faker.lorem.paragraph(),
			publish_datetime: faker.date.recent(),
		});

		article.save(function(err, article) {
			if (err) return console.error(error);
			console.dir(article);
		});
	};

	res.redirect('/article');
});

app.get('/article', function(req, res) {
	Article.find(function(err,articles) {
		if (err) console.error(err);
		res.render('articles/index', { "title": "News Stories", "articles": articles });
	});
});

app.get('/articles/feed', function(req,res) {
	Article.find(function(err,articles) {
		if (err) console.error(err);
		res.send({"articles": articles });
	});
});

// Messages

app.get('/messages', function(req,res) {
	Message.find(function(err, messages) {
		if (err) console.error(err);
		console.log("Found a whole bunch of messages.")
		res.send({ "messages" : messages });
	}).sort({created_at:-1});
});

app.get('/messages/new', function(req, res) {
	res.render('messages/new');
});

// Posts a new message to the channel
app.post('/messages/create', function(req,res) {
	var message = new Message({
		user_id: faker.fake('{{name.firstName}} {{name.lastName}}'),
		body: req.body.message.body,
		article_id: "Trump trumps a trumpet in trump town.",
		created_at: Date.now()
	});

	message.save(function(err, message) {
		if (err) return console.error(err);
		console.dir(message);
	});

	pusher.trigger('chat', 'new_comment', message);
	res.sendStatus(200);
});


// Articles

app.get('/article/', function(req, res) {
	Message.find({ article_id:"Trump trumps a trumpet in trump town." }, function(err,messages) {
		if (err) return console.dir(err);
		console.log(messages);
	})});


app.get('/articles/:id', function(req,res) {
	Article.findById(req.params.id, function(err, article) {
		if (err) return console.error(err);
		res.render('articles/show', { article: article });
	});
});

app.listen(3000, function() {
	console.log("Launching the loop");
});

pusher.trigger('test_channel', 'my_event', {
	"message": "testing the connection"
});