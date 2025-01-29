const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./routes/login');


const register= require('./routes/register');


const mongo = require('./config/db');

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

app.use('/login', login);
app.use('/register', register);




app.get("/", async(req,res) =>{
   
    try{
     
      res.render("home");

    }
    catch(err){
      console.log(err);
    }

})



app.get("/register", async(req,res) =>{
   
  try{
   
    res.render("register");

  }
  catch(err){
    console.log(err);
  }

})










  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


  

