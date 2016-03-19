var Pusher = require('pusher');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var faker = require('faker');

var db = mongoose.connect('mongodb://admin:admin@ds037165.mlab.com:37165/intheloop');

var pusher = new Pusher({
    appId: '189125',
    key: '740d0f36323febd6a8c3',
    secret: 'a259a17cb781b098ed62',
    encrypted: true
});

var message = new Message({
	user_id: "Hungry Cat", // Need to change this to the User ID once the user model is created
	body: "Here's the first message",
	article_id: "This is a story all about how my life go twisted upside down."
});

message.save(function(err, message) {
	if (err) return console.error(err);
	console.dir(message);
})

pusher.trigger('test_channel', 'my_event', {
    "message": "testing the connection"
});