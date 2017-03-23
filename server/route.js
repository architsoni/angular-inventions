var express = require('express');
var path = require('path');
var app = express();


app.use("/", express.static(path.resolve(__dirname, '../app')));

app.get('/*', function(req, res){
    res.sendFile('index.html', { root: 'app' });
});

/*base.get('/!*', function(req, res){
    res.sendFile('index.html', { root: 'app' });
});

app.use('/', base);*/

module.exports = app;