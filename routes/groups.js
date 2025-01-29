const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../config/db');
const client = require('../config/redis');
const crypto = require('crypto');
const { body,check, validationResult } = require('express-validator');
const { Types } = require('mongoose');



router.post("/",
body("name").notEmpty().withMessage("Group Name is requred!")
.isLength({max: 20}).withMessage("Name has to be less than 20 characters!")
.matches(/^[A-Za-z0-9 ]+$/).withMessage("Group name must only contain numbers,letters, or spaces."),
body('password').optional({ checkFalsy: true })
.isLength({max:20}),
body("description").optional({checkFalsy: true})
.isLength({max:50})
,async(req,res) =>{
    console.log( " IN GROUPS / post");

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        return res.status(422).json({ error: firstError.msg});
    }   

    const {name,password,description} = req.body;

    try{
        const db= mongo.db("6ms");
        const groups = db.collection("groups");
        const added = await groups.insertOne({
            name:name,
            password:password,
            description:description,
            user_id:req.session.u_id
        });

        console.log("Group Added!");

        return res.status(200).json({
            message: "Group Made!",
          });


        

    }
    catch(err){
        console.log("Error in groups / post: "+ err);
        return res.status(400).json({
            message: "Error making groupr",
          });

    }





})


router.get("/Created_Groups",async(req,res) =>{
    console.log( " IN GROUPS / Created_groups");

    try{
        const db= mongo.db("6ms");
        const groups = db.collection("groups");

        const results= await groups.find({user_id:req.session.u_id}).toArray();
        console.log(results);
        return res.status(200).json({
            results: results
          });
    }
    catch(err){
        return res.status(400).json({
            message: "Error getting groups"
          });

    }
    

  



})


router.post("/delete", async(req,res) =>{
    console.log( " IN GROUPS / Delete");

    let id=req.body.id;

    console.log(typeof id);
    try{
        const db= mongo.db("6ms");
        const groups = db.collection("groups");
        await groups.deleteOne({_id: new Types.ObjectId(id)});

        console.log("Group deleted!");

        return res.status(200).json({
            message: "Groupe deleted"
          });

    }
    catch(err){

        console.log("Error: "+ err);

        return res.status(400).json({
            message: "Error deleting groups"
          });

    }

})


router.post("/join",async(req,res)=>{
    let id= req.body.id;

    try{
        const db= mongo.db("6ms");
        const groups = db.collection("groups_joined");

        let results = await groups.find({group:id,u_id:req.session.u_id}).toArray();

        console.log(results);

        if(results.length==0){
            await groups.insertOne({group:id,u_id:req.session.u_id});
            console.log("User added to group");
            return res.status(200).json({
                message: "User added to group!"
              });


        }

        else{

            console.log("User not added to group");
            return res.status(400).json({
                message: "User Exists in group"
              });

        }


        


    }
    catch(err){
        console.log("Error: "+ err);



        return res.status(400).json({
            message: "Error joining group"
          });

    }
})


router.get("/Joined_Groups", async(req,res)=>{

    try{
        const db= mongo.db("6ms");
        const groups = db.collection("groups_joined");

        let results =  await groups.find({u_id: req.session.u_id}).toArray();

        return res.status(200).json({
            groups_joined: results
          });







    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Error Getting Joined groups"
          });
    }

})



module.exports=router;
