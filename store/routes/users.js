//Using Express
var express = require('express');
var users = express.Router();
users.use(express.json());

users.get('/', function (req, res) {
    res.status(200).send('users')
});

module.exports = users;