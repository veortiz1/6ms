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
body("email").optional({ checkFalsy: true }).isEmail().withMessage('Invalid email format'),
body("phone").optional({ checkFalsy: true }).isInt().withMessage("Please enter only numbers for phone eg.123456677"),
body("height").optional({ checkFalsy: true }).isFloat().withMessage("Error height must only contain number or decimal!"),
body("weight").optional({ checkFalsy: true }).isFloat().withMessage("Error weight must only contain number or decimal!")
,async(req,res) =>{
    console.log("In Client Route /add POST");
    let {name,rounds,time,rest,tips} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

   


})





module.exports=router;
