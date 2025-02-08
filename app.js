const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./routes/login');




const register= require('./routes/register');

const client= require('./routes/client');
const exercise = require('./routes/exercise');
const workout = require('./routes/workout');

const mongo = require('./config/db');
const { ObjectId } = require('mongodb');


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
app.use('/client', client);

app.use('/exercise', exercise);

app.use('/workout', workout);




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


app.get("/login", async(req,res) =>{
   
  try{
   
    res.render("login");

  }
  catch(err){
    console.log(err);
  }

})


app.get("/profile", async(req,res)=>{
  try{

    if(!req.session.u_id){
      res.render("login");
    }
    else{
   
    const db = mongo.db("frf");
    const Clients= db.collection("Clients");
    const Exercises= db.collection("Exercises");
    const Workouts = db.collection("Workouts");

    let client_count = await Clients.find({u_id:req.session.u_id}).toArray();
    let exercise_count = await Exercises.find({u_id:req.session.u_id}).toArray();
    let workout_count = await Workouts.find({u_id:req.session.u_id}).toArray();
    client_count=client_count.length;
    workout_count=workout_count.length;
    exercise_count=exercise_count.length;
    res.render("profile",{exercise_count:exercise_count,client_count:client_count,workout_count:workout_count});
  } 
  

   

  }
  catch(err){
    console.log("Error getting exercises for add_workout!" + err);
  }
  




})


app.get("/add_client", async(req,res)=>{

  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("add_client");
  }

})


app.get("/add_exercise", async(req,res)=>{

  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("add_exercise");
  }
  

 
})


app.get("/add_workout", async(req,res)=>{
  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const exercises= db.collection("Exercises");

    let user_exercises = await exercises.find({u_id:req.session.u_id}).toArray();

    let exercise_count= user_exercises.length;
    res.render("add_workout",{exercises:user_exercises,exercise_count:exercise_count});
  }

  }
  catch(err){
    console.log("Error getting exercises for add_workout!" + err);
  }


 
})

app.get("/manage_client", async(req,res)=>{

  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const Clients= db.collection("Clients");

    let user_clients = await Clients.find({u_id:req.session.u_id}).toArray();
    res.render("manage_clients",{clients:user_clients});
  }

  }
  catch(err){
    console.log("Error getting exercises for add_workout!" + err);
  }

 
})



app.get("/manage_exercise", async(req,res)=>{
 

  try{
  
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const Exercises= db.collection("Exercises");

    let user_exercises= await Exercises.find({u_id:req.session.u_id}).toArray();
    res.render("manage_exercises",{exercises:user_exercises});
  }
  

  }
  catch(err){
    console.log("Error getting exercises for add_workout!" + err);
  }

 
})


app.get("/manage_workout", async(req,res)=>{


 

  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const Exercises= db.collection("Workouts");

    let user_exercises= await Exercises.find({u_id:req.session.u_id}).toArray();
    res.render("manage_workout",{workouts:user_exercises});
  }
  

  }
  catch(err){
    console.log("Error getting exercises for add_workout!" + err);
  }

 
})


app.get("/edit_client",async(req,res)=>{
  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("edit_client");
  }

  

})

app.get("/delete_client",async(req,res)=>{

  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("delete_client",{c_id:req.session.c_id});
  }

 

})






app.get("/edit_exercise",async(req,res) =>{
  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("edit_exercise",{e_id:req.session.e_id});

  }


})

app.get("/delete_exercise",async(req,res)=>{
  if(!req.session.u_id){
    res.render("login");
  }
  else{
    res.render("delete_exercise",{e_id:req.session.e_id});
  }



})




app.get("/edit_workout",async(req,res) =>{

  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
      const db = mongo.db("frf");
      const Workouts= db.collection("Workouts");
      const exercises= db.collection("Exercises");
  
      let user_exercises = await exercises.find({u_id:req.session.u_id}).toArray();
  
  
      let normal_id = new ObjectId(req.session.w_id);
      let result = await Workouts.findOne({_id:normal_id});
      res.render("edit_workout",{workout:result,add_exercise:user_exercises});
  
    }
  
  }
  catch(err){
    console.log(err);
  }

  

})


app.get("/delete_workout",async(req,res) =>{
  if(!req.session.u_id){
    res.render("login");
  }
  else{
  res.render("delete_workout");
  }

})


app.get("/send_workout",async(req,res) =>{

  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const Workouts= db.collection("Workouts");
    let workout =await Workouts.find({u_id:req.session.u_id}).toArray();
    let workout_count=workout.length;


    res.render("send_workout",{workout:workout,workout_count:workout_count});
    }

  }
  catch(err){
    console.log(err);
  }

})



app.get("/view_workout",async(req,res) =>{
  console.log("in view workout");
  let workoutId = req.query.id;

  try{
 
    const db = mongo.db("frf");
    const Workouts= db.collection("Workouts");
    const normal_id = new ObjectId(workoutId);
    let workout =await Workouts.findOne({_id:normal_id});
    console.log(workout);
    if(workout){
      res.render("view_workout",{workout:workout});
    }
    else{
      res.render("error.ejs");
    }

  

  }
  catch(err){
    console.log(err);
  }

})

app.get("/view_plan",async(req,res) =>{
  console.log("in view plan");
  let clientId = req.query.id;
  console.log(clientId);
  try{

    const db = mongo.db("frf");
    const Plans= db.collection("Plans");

    let plan= await Plans.findOne({c_id:clientId});
    console.log(plan);

    if(plan){
      
    res.render("view_plan",{plan:plan});
    }
    else{
      res.render("no_plan");
    }


   


  }
  catch(err){
    console.log(err);
  }



 

})


app.get("/create_plan",async(req,res)=>{

  try{
    if(!req.session.u_id){
      res.render("login");
    }
    else{
    const db = mongo.db("frf");
    const Workouts= db.collection("Workouts");
    const Clients= db.collection("Clients");

    let workout =await Workouts.find({u_id:req.session.u_id}).toArray();
    let client =await Clients.find({u_id:req.session.u_id}).toArray();
    let workout_count=workout.length;
    let client_count=client.length;
    console.log(workout);

    res.render("create_plan",{workout:workout,client:client,workout_count:workout_count,client_count:client_count});
    }

  }
  catch(err){
    console.log(err);
  }


})


app.get("/send_plan", async(req,res) =>{

try{
  if(!req.session.u_id){
    res.render("login");
  }
  else{
  const db = mongo.db("frf");

  const Clients= db.collection("Clients");

  const Plans= db.collection("Plans");


  let client =await Clients.find({u_id:req.session.u_id}).toArray();
  let plan = await Plans.find({u_id:req.session.u_id}).toArray();
  let plan_count = plan.length;
  res.render("send_plan",{client:client,plan_count:plan_count});
  }



}
catch(err){
  console.log(err);
}

})


app.get("/logout",(req,res) =>{
  res.render("logout");

})

app.get("/tutorial",(req,res) =>{
  res.render("tutorial");

})




  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


  

