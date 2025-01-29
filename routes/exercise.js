const express = require('express');
const router = express.Router();



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





module.exports=router;
