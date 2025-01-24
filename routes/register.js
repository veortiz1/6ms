const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');





router.post("/",body("user").notEmpty().withMessage("Please Fill out Username field!")
.matches(/^[A-Za-z0-9]+$/).withMessage("Name must only contain letters,numbers"),
body("password").notEmpty().withMessage("Password cannot be empty!")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("Password must contain an uppercase,lowercase,number and special character and be 8 characters long!"),
async(req,res) => {
    console.log("IN REGISTER ROUTER post '/'");
    const errors = validationResult(req); 
   if (!errors.isEmpty()) {
       console.log("Input validation error!");
       const firstError = errors.array()[0]; 
       return res.status(422).json({ error: firstError.msg});
   }   
    const {user,password} = req.body;
    try{
    const db = mongo.db("6ms");
    const users = db.collection("Users");

    user_results = await users.findOne({username: user});
    
    if(user_results){
        console.log("User exists!");
        return res.status(404).json({
            message: "User Exists!",
          });
    }
    else{

        const hashedPassword = await bcrypt.hash(password, 13);
        const result = await users.insertOne({
            username: user,
            password: hashedPassword, 
          });

        let u_id=result.insertedId;
        req.session.u_id=result.insertedId;
        console.log("USER ADDED!");

        return res.status(200).json({
            message: "User Added!",
          });
        



        

 
    }


    
    }
    catch(err){
        console.log("Error in Register / post: "+ err);
        return res.status(400).json({
            message: "Error in registering user",
          });
        
    }



})



module.exports=router;


