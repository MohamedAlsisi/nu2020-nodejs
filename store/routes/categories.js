//Using Express
var express = require('express');
var categories = express.Router();
categories.use(express.json());

categories.get('/', function (req, res) {
    res.status(200).send('categories')
});

module.exports = categories;