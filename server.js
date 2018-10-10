'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')

app.set('port', 80);

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
    description: null,
    hobbys: [
        { name: 'MTB Biking' },
        { name: 'Beer drinking' },
        { name: '' },
        { name: '' }
    ],
    someField1: null,
    someField2: null,
    someField3: null,
    someField1: null,
    someField2: null,
    someField3: null,
    someField4: null,
    someField5: null,
    someField6: null,
    someField7: null,
    someField8: null,
    someField9: null,
    someField10: null,
    someField11: null,
    someField12: null,
    someField13: null,
    someField14: null,
    someField15: null,
    someField16: null,
    someField17: null,
    someField18: null,
    someField19: null,
    someField20: null,
    someField21: null,
    someField22: null,
    someField23: null,
    someField24: null,
    someField25: null,
    someField26: null,
    someField27: null,
    someField28: null,
    someField29: null,
    someField30: null,
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