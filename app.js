const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./routes/login');


const register= require('./routes/register');

const groups= require('./routes/groups');
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


  

app.get("/view_all", async(req,res) =>{

  try{
    const db= mongo.db("6ms");
        const groups = db.collection("groups");
        const joined_groups=db.collection("groups_joined");
        let joined_or_not_arr=[];

      let all_groups = await groups.find({}).toArray();
      let joined = await
    

      for(let i = 0; i<all_groups.length;i++){
        console.log(all_groups[i]._id.toString());

        

    
      }
      



      

      res.render("view_all",{all_groups:all_groups});
  }
  catch(err){
    console.log(err);
  }

})
  


