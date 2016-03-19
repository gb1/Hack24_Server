var Pusher = require('pusher');
var path = require('path');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var faker = require('faker');
var express = require('express');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var http = require('http');

var db = mongoose.connect('mongodb://admin:admin@ds037165.mlab.com:37165/intheloop');

var app = express();

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


// Messages

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
	});
});


// Articles


app.get('/article/', function(req, res) {

	Message.find({ article_id:"Trump trumps a trumpet in trump town." }, function(err,messages) {
		if (err) return console.dir(err);
		console.log(messages);
})});


app.listen(3000, function() {
	console.log("Launching the loop");
});

pusher.trigger('test_channel', 'my_event', {
    "message": "testing the connection"
});