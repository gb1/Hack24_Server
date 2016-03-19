var Pusher = require('pusher');
var mongoose = require('mongoose');
var Message = require('./models/Message');

mongoose.connect('mongodb://admin:admin@ds037165.mlab.com:37165/intheloop');

var pusher = new Pusher({
    appId: '189125',
    key: '740d0f36323febd6a8c3',
    secret: 'a259a17cb781b098ed62',
    encrypted: true
});

pusher.trigger('test_channel', 'my_event', {
    "message": "testing the connection"
});