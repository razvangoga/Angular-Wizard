'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')

app.set('port', 3000);

app.use(bodyParser.json());

app.use('/content', express.static(path.join(__dirname, 'content')));
app.use('/wizard', express.static(path.join(__dirname, 'wizard')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var model = {
    name: 'Kara Ben Nemsi',
    age: 33,
    email: 'kara@ben.nemsi',
    address: 'Krunska 51, Beograd 11000',
    hobbys: [
        { name: 'MTB Biking' },
        { name: 'Beer drinking' }
    ]
};

app.get('/load', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(model));
});

app.post('/save', function (req, res) {
    model = req.body;

    console.log(model);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ status: 'Model Saved' }));
});

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('nodeJS running on port : ' + port);
    console.log('Startup model :' + JSON.stringify(model));
});