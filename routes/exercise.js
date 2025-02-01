const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');



const bcrypt = require('bcrypt');
const mongo = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');



router.post("/add",
body("name").notEmpty().withMessage("Please Enter A Name!").
matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain numbers,letters or spaces!"),
body("rounds").notEmpty().withMessage("Please enter rounds!").isInt().withMessage("Rounds Must be an number!"),
body("time").notEmpty().withMessage("Please enter time!").isInt().withMessage("Time must be a number!"),
body("rest").notEmpty().withMessage("Please enter rest!").isInt().withMessage("Rest must be a number!"),
body("tips").optional({checkFalsy:true})
,async(req,res) =>{
    console.log("In exercise Route /add POST");
    let {name,rounds,time,rest,tips} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

    if(!tips){
        tips="no description!";
    }

    try{
        const db = mongo.db("frf");
        const exercises= db.collection("Exercises");
        await exercises.insertOne({name:name,rounds:rounds,time:time,rest:rest,tips:tips,u_id:req.session.u_id});
        return res.status(200).json({
            message: "Exercise Added!",
          });


    }
    catch(err){
        console.log("ERRORL: "+ err);
        return res.status(400).json({
            message: "Error adding exercise",
          });

    }
   


})


router.post("/set_eid",async(req,res) =>{

    try{

    let id= req.body.id;


    req.session.e_id=id;

    return res.status(200).json({
        message: "Client Id set!",
      });

    }
    catch(err){
        console.log("ERRORL: "+ err);
        return res.status(400).json({
            message: "Error setting id",
          });

    }
   
    

    

})



router.post("/edit",
body("name").optional({checkFalsy:true}).
matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain numbers,letters or spaces!"),
body("rounds").optional({checkFalsy:true}).isInt().withMessage("Rounds Must be an number!"),
body("time").optional({checkFalsy:true}).isInt().withMessage("Time must be a number!"),
body("rest").optional({checkFalsy:true}).isInt().withMessage("Rest must be a number!"),
body("tips").optional({checkFalsy:true})
,async(req,res) =>{
    console.log("In exercise Route /add POST");
    let {name,rounds,time,rest,tips} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

    try{
        const db = mongo.db("frf");
        const exercises= db.collection("Exercises");
        const normal_id = new ObjectId(req.session.e_id);

        let results= await exercises.find({_id:normal_id});

        if(results){
            if(!name){
                name=results.name;
            }
            if(!rounds){
                rounds=results.rounds;
            }
            if(!time){
                time=results.time;
            }
            if(!rest){
                rest=results.rest;
            }
            if(!tips){
                tips=results.tips;
            }

            await exercises.updateOne( {_id:normal_id},
                {$set:{name:name,rounds:rounds,time:time,rest:rest,tips:tips}}
                );


        }

        return res.status(200).json({
            message: "Exercise edited!",
          });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Exercise not edited",
          });
    }

    

  
   


})






module.exports=router;
