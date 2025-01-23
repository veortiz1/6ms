const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./routes/login');
const client = require('./config/db');

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', 
    resave: false,           
    saveUninitialized: false,   
    cookie: {
      secure: false,
      httpOnly: true,         
      maxAge: 2 * 60 * 60 * 1000
    }
  }));
  app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", async(req,res) =>{
   
    try{
      const db = client.db("chatApp"); // Use (or create) the database
      const messages = db.collection("messages"); // Reference the collection
  
      // Insert a new message (this creates the collection if it doesn't exist)
      await messages.insertOne({ text: "Hello, world!", timestamp: new Date() });
      console.log("Added!");
      res.render("profile");

    }
    catch(err){
      console.log(err);
    }

})





  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  


