const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let axios=require("axios")
const public_users = express.Router();

let books = {}
public_users.post("/register", (req,res) => {
   const username= req.body.username
   const password= req.body.password
   if(username && password){
       if(!isValid(username)){
        users.push({"username":username, "password":password})
        return res.status(201).json({message: username+": User Created"});
       }
       else{
           return res.status(400).json({message: username+"Already Exist"});
       }
   }

  return res.status(300).json({message: "Please enter UserName and Password"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
  console.log(req)
  try {
    const response = await axios.get('http://127.0.0.1:5000/books.json');
    console.log(response);
    books=JSON.stringify(response.data)
    return res.status(200).send(books);
  } catch (error) {
    console.error(error);
  }
  
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
   const bookobjects= Object.values(JSON.parse(books))

   const filteredbooks= bookobjects.filter( book => book.author == author);
   if(filteredbooks.length >0){
       return res.status(200).json(filteredbooks)
   }
  return res.status(404).json({message: `No Book found with author ${author}`});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title= req.params.title
    const bookobjects= Object.values(JSON.parse(books))
 
    const filteredbooks= bookobjects.filter( book => book.title == title);
    if(filteredbooks.length >0){
        return res.status(200).json(filteredbooks)
    }
   return res.status(404).json({message: `No Book found with title ${title}`});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviewBook= books[req.params.isbn]
  if(reviewBook){
      return res.status(200).json(reviewBook)
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;
