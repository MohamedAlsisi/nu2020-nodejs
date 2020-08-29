// Using Express and Mongoose.
// Express 
const express = require('express');
const bookstore = express();
bookstore.use(express.json());
// Mongoose
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
//Main URL
const url = '/books';

//Create Schema
const booksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, trim: true },
    publisher: { type: String, trim: true }
    // name : String,
    // publisher : String
});

//Create the module doc
const books = mongoose.model('books', booksSchema);

// ADD - get all - get detials - update ---delete 

//Add new book by body
bookstore.post(url, function (req, res) {
    var book = new books({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        publisher: req.body.publisher
    });
    book
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

//Get all books 
bookstore.get(url, function (req, res) {
    books.find()
        .exec()
        .then(p => {
            for (var i = 0; i < p.length; i++) {
                console.log(p[i]);
            }
            res.status(200).json(p);
        }).catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

//Get book details by id
bookstore.get(url + '/:id', function (req, res) {
    let ids = req.params.id;
    books.findOne({ _id: ids })
        .exec()
        .then(p => {
            console.log("product: " + p.name + ", price: " + p.publisher);
            res.status(200).json(p);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

//update book by id
bookstore.put(url + '/:id', function (req, res) {
    let ids = req.params.id;
    books.updateOne({ _id: ids }, { name: req.body.name, publisher: req.body.publisher })
        .exec()
        .then(p => {
            console.log("The book is: " + p.name + " and the publisher is: " + p.publisher);
            res.json(p);
        })
        .catch(err => {
            console.log(err);
        });
});

//Delete book by id
bookstore.delete(url + '/:id', function (req, res) {
    let ids = req.params.id;
    books.deleteOne({ _id: ids })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });

});

bookstore.listen(3000);
