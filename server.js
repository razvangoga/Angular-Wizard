var express = require('express');
var path = require('path');
var app = express();

app.set('port', 3000);

app.use('/content', express.static(path.join(__dirname , 'content')));
app.use('/wizard', express.static(path.join(__dirname , 'wizard')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Welcome to the planet on port : ' + port);
});