const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    const doesUserExist= users.filter( user=> user.username == username)
    if (doesUserExist.length > 0)
    return true;

    return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  const validUser= users.filter( user=> user.username == username && user.password== password)
  if(validUser.length >0){
      return true
  }

  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  
    const username=req.body.username
    const password=req.body.password
    console.log(users)
    
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }

    if(authenticatedUser(username,password)){
        const accessToken=jwt.sign({
            data: username
        }, "access", {expiresIn: 60*60})

        req.session.authorization={
            accessToken, password
        }
        return res.status(200).send("User successfully logged in");
    }
    else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
      }
 
});

// Add a book review
regd_users.get("/auth/review/:isbn", (req, res) => {
    const isbn=req.params.isbn
    const review= req.query.review
    const bookToReview= books[isbn]
    const username= req.user

    return res.send(bookToReview,username)
//     console.log("Found Book",bookToReview)
//     if(bookToReview){
        
//             if(!err){
//                 bookToReview[0].reviews.append({"user":user.username, "review":review})
//                 console.log("Books"+bookToReview)
//                 return res.status(201).json({message: "Review Added"});
//             }
//             else{
//                 return res.status(401).json({message: "Review Not Added"});
//             }
//         })
//     }
//   //Write your code here
//   return res.status(404).json({message: "Please enter correct ISBN"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
