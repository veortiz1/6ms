const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');

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










  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  


