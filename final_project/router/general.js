const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
   const username= req.body.username
   const password= req.body.password
   if(username && password){
       isValid()
   }

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   const allbooks= JSON.stringify(books)
  return res.status(200).send(allbooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn= req.params.isbn
  const filteredBook= books[isbn];
  if(filteredBook){
    return res.status(200).json({message: `Found Book ${filteredBook.title}`})
  }
  
  return res.status(300).json({message: `Book with ISBN :${isbn} not found `});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   const author= req.params.author
   const bookobjects= Object.values(books)

   const filteredbooks= bookobjects.filter( book => book.author == author);
   if(filteredbooks.length >0){
       return res.status(200).json(filteredbooks)
   }
  return res.status(404).json({message: `No Book found with author ${author}`});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title= req.params.title
    const bookobjects= Object.values(books)
 
    const filteredbooks= bookobjects.filter( book => book.title == title);
    if(filteredbooks.length >0){
        return res.status(200).json(filteredbooks)
    }
   return res.status(404).json({message: `No Book found with author ${title}`});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
