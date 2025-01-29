const express = require('express');
const router = express.Router();



const bcrypt = require('bcrypt');
const db = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');



router.post("/add",
body("name").notEmpty().withMessage("Please Enter A Name!").
matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain numbers,letters or spaces!"),
body("email").optional().isEmail().withMessage('Invalid email format'),
body("phone").optional().isInt().withMessage("Please enter only numbers for phone eg.123456677"),
body("height").optional().isFloat().withMessage("Error height must only contain number or decimal!"),
body("weight").optional().isFloat().withMessage("Error weight must only contain number or decimal!")
,async(req,res) =>{
    console.log("In Client Route /add POST");
    let {name,email,phone,height,weight} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

    if(!email){
        email="no email";
    }
    if(!weight){
        weight="no weight!";
    }
    if(!height){
        height="no height";
    }
    if(!phone){
        phone="no phone!";
    }

    
    try{
        const db = mongo.db("frf");
        const clients= db.collection("Clients");

        await clients.insert({name:name,email:email,phone:phone,height:height,weight:weight});
        return res.status(200).json({
            message: "Client Added!",
          });

        

    }
    catch(err){
        console.log("ERRORL: "+ err);
        return res.status(400).json({
            message: "Error adding client",
          });

    }


})





module.exports=router;
