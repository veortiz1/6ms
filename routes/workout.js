const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');





router.post("/add",
body("name").notEmpty().withMessage("Please Enter A Name!").
matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain numbers,letters or spaces!"),
body("exercises").notEmpty().withMessage("Please choose exercises there are none selected!"),
async(req,res) => {
    console.log("IN workout ROUTER post '/add'");
    const errors = validationResult(req); 
   if (!errors.isEmpty()) {
    
       const firstError = errors.array()[0]; 

       console.log("Input validation error!" + firstError.msg);
       return res.status(422).json({ error: firstError.msg});
   }   
   
   let {name,exercises}=req.body;

   try{

    const db = mongo.db("frf");
    const workouts = db.collection("Workouts");
    const exercises_db = db.collection("Exercises");

    exercise_arr=[];
 
    for(let i=0;i<exercises.length;i++){
      let normal_id = new ObjectId(exercises[i]);
      let result= await exercises_db.findOne({_id:normal_id});
      exercise_arr.push(result);

    }



    await workouts.insertOne({name:name,exercises:exercise_arr,u_id:req.session.u_id});

    return res.status(200).json({
        message: "Workout  added "
      });

  
   }
   catch(err){

    return res.status(400).json({
        message: "Workout not added "+err,
      });
    

    }
  

})


router.post("/set_wid", async(req,res) =>{

  try{
    let id=req.body.id;
    req.session.w_id=id;
    console.log(req.session.w_id);
    return res.status(200).json({
      message: "Workout  id set "
    });
  }
  catch(err){
    return res.status(400).json({
      message: "Workout id not set "+err,
    });
  }


  

})

router.post("/remove_exercise", async(req,res) =>{

  let {exercises,w_id} = req.body;

  try{
    const db = mongo.db("frf");
    const workouts = db.collection("Workouts");
    console.log("wid "+w_id);
    const normal_id = new ObjectId(w_id);

    await workouts.updateOne( {_id:normal_id},
      {$set:{exercises:exercises}}
      );

    


    return res.status(200).json({
      message: "Exercise deleted",
    });

  }
  catch(err){
      console.log(err);
      return res.status(400).json({
          message: "Exercise not deleted",
        });
  }

})


router.post("/add_exercise", async(req,res) =>{

  let {id,w_id} = req.body;

  try{
    const normal_id = new ObjectId(id);
    const workout_id = new ObjectId(w_id);
    const db = mongo.db("frf");
    const workouts = db.collection("Workouts");
    const exercises = db.collection("Exercises");

    let result= await exercises.findOne({_id:normal_id});

    let result1 = await workouts.findOne({_id:workout_id});

    console.log(result1.exercises);

    let temp_arr=result1.exercises;

    temp_arr.push(result);

    await workouts.updateOne( {_id:workout_id},
      {$set:{exercises:temp_arr}}
      );


      return res.status(200).json({
        message: "Exercise  added",
      });


    

  




  }
  catch(err){
    console.log(err);
    return res.status(400).json({
      message: "Exercise not added",
    });
  }

})

router.post("/edit_name", async(req,res) =>{

  let {name,w_id} = req.body;



  try{
    const workout_id = new ObjectId(w_id);
    const db = mongo.db("frf");
    const workouts = db.collection("Workouts");
       await workouts.updateOne( {_id:workout_id},
      {$set:{name:name}}
      );
      return res.status(200).json({
        message: "Name edited",
      });

  }
  catch(err){
    console.log(err);
    return res.status(400).json({
      message: "Name not edited",
    });

  }


})


router.post("/delete_workout", async(req,res) =>{

  try{
    const workout_id = new ObjectId(req.session.w_id);
    const db = mongo.db("frf");
    const workouts = db.collection("Workouts");
    await workouts.deleteOne({_id:workout_id})
    return res.status(200).json({
      message: "Workout  deleted!",
    });


  }
  catch(err){
    console.log(err);
    return res.status(400).json({
      message: "Workout not deleted!",
    });
  }

})

module.exports=router;


