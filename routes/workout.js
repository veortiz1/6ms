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


module.exports=router;


