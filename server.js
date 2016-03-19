var Pusher = require('pusher');
var path = require('path');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://admin:admin@ds037165.mlab.com:37165/intheloop');

var app = express();

// Set the views engine to ejs and the default views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use body parser to get data from the user.
app.use(bodyParser());

var pusher = new Pusher({
    appId: '189125',
    key: '740d0f36323febd6a8c3',
    secret: 'a259a17cb781b098ed62',
    encrypted: true
});

var message = new Message({
	user_id: faker.fake('{{name.firstName}} {{name.lastName}}'), // Need to change this to the User ID once the user model is created
	body: faker.fake('{{lorem.sentences}}'),
	article_id: faker.fake('{{lorem.sentence}}')
});


// Generate some random data.

// for (var i = 0; i < 50; i++) {
// 	var randomMessage = new Message();
// 	randomMessage.user_id = faker.fake('{{name.firstName}} {{name.lastName}}');
// 	randomMessage.body = faker.fake('{{lorem.sentences}}');
// 	randomMessage.article_id = "Now this is a story all about how my life got twisted upside down.";

// 	randomMessage.save(function(err, randomMessage) {
// 		if (err) return console.error(err);
// 		console.dir(randomMessage);
// 	})
// }

app.get('/messages', function(req,res) {
	Message.find(function(err, messages) {
		if (err) console.error(err);
		console.log("Found a whole bunch of messages.")
		res.send({ "messages" : messages });
	});
});

app.get('/messages/new', function(req, res) {
	res.render('messages/new');
});

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
		res.redirect('/messages/new');
	})
});

app.listen(3000, function() {
	console.log("Launching the loop");
});

pusher.trigger('test_channel', 'my_event', {
    "message": "testing the connection"
});