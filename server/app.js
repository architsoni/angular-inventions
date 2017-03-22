var express = require('express');
var path = require('path');
var app = express();
var base = express.Router();

base.get('/*', function(req, res){
    res.sendFile('index.html', { root: 'app' });
});

app.use('/', base);

module.exports = app;