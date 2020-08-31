//Using Express
var express = require('express');
var publishers = express.Router();
publishers.use(express.json());

publishers.get('/', function (req, res) {
    res.status(200).send('publishers')
});

module.exports = publishers;