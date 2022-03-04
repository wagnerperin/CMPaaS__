const express = require('express');
const app = express();
const consign = require('consign');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

consign({cwd: 'app'})
    .include('helpers')
    .then('models')
    .then('api')
    .then('routes')
    .into(app);

module.exports = app;