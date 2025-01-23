const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');





router.post("/",body("user").notEmpty().withMessage("Please Fill out Name field!")
.matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain letters,numbers,and spaces"),
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
    const db = mongo.db("chatApp");
    const users = db.collection("Users");


    
    }
    catch(err){
        cons
    }



})



module.exports=router;


