//Using Express
var express = require('express');
var books = express.Router();
books.use(express.json());

books.get('/', function (req, res) {
    res.status(200).send('books')
});

module.exports = books;