const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./routes/login');
const client = require('./config/db');

const register= require('./routes/register');

const groups= require('./routes/groups');

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
app.use('/groups', groups);



app.get("/", async(req,res) =>{
   
    try{
     
      res.render("register");

    }
    catch(err){
      console.log(err);
    }

})



app.get("/profile", async(req,res) =>{
   
  try{
   
    console.log(req.session.u_id);
        res.render("profile");

  }
  catch(err){
    console.log(err);
  }

})










  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


  
  


