var express = require('express');
var app = express();

app.get('/', (_, res) => {
    res.send('Hello world');
});

module.exports = app;