// Using Express only 

const express = require('express');
// const { json } = require('body-parser');
// const { join } = require('path');
const bookstore = express();
bookstore.use(express.json());

var books = [
    {id:1, name:'Power of time', pub:"Mohamed"},
    {id:2, name:'Lord of the rings', pub:"Ahmed"},
    {id:3, name:'Upgrade', pub:"Tom"},
    {id:4, name:'Tomorrow land', pub:"Khaled"},
    {id:4, name:'Power of time', pub:"Steve"},
];

const url = '/books';

//Get all books 
bookstore.get(url,function(req,res){
    res.send(JSON.stringify(books));
});

//Get book details by id
bookstore.get(url+'/:id',function(req,res){
    let ids = parseInt(req.params.id);
    let book = books.find(p => p.id === ids);
    res.send('The book is ' + JSON.stringify(book));
});

//Add new book by body
let c = books.length;
bookstore.post(url,function(req,res){
    const newBook = {
        id: ++c,
        name : req.body.name,
        pub : req.body.pub
    }
    books.push(newBook); 
    res.send('The new book is ' + JSON.stringify(newBook));
});

//update book by id
bookstore.put(url +'/:id',function(req,res){
    let ids = parseInt(req.params.id);
    let updatedBook = books.find(p => p.id === ids);
    updatedBook.name = req.body.name;
    updatedBook.pub = req.body.pub;
    res.send('The updated book is ' + JSON.stringify(updatedBook) + 'the books list is ' + JSON.stringify(books));
});

//Delete book by id
bookstore.delete(url+'/:id',function(req,res){
    let ids = parseInt(req.params.id);
    const delBook = books.find(p => p.id === ids);
    let i = books.indexOf(delBook);
    books.splice(i,1);
    res.send('The delete book is ' + JSON.stringify(delBook) + 'the books list is ' + JSON.stringify(books));
});


bookstore.listen(3000);