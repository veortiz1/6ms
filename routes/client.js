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
body("height").optional({ checkFalsy: true }).isFloat().withMessage("Error height must only contain number or decimal!"),
body("weight").optional({ checkFalsy: true }).isFloat().withMessage("Error weight must only contain number or decimal!")
,async(req,res) =>{
    console.log("In Client Route /add POST");
    let {name,height,weight} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

   
    if(!weight){
        weight="0";
    }
    if(!height){
        height="0";
    }
    

    
    try{
        const db = mongo.db("frf");
        const clients= db.collection("Clients");

        await clients.insertOne({name:name,height:height,weight:weight,u_id:req.session.u_id});
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


router.post("/edit_id",async(req,res)=>{

    console.log("IN client route /edit_id");
    try{
    let id= req.body.id;
    console.log(id);

    req.session.c_id=id;

    console.log(req.session.c_id);
 
    return res.status(200).json({
        message: "Client Id set!",
      });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Error editing client id",
          });
    }
})

router.post("/edit",
body("name").optional({checkFalsy:true})
.matches(/^[A-Za-z0-9 ]+$/).withMessage("Name must only contain numbers,letters or spaces!"),
body("height").optional({ checkFalsy: true }).isFloat().withMessage("Error height must only contain number or decimal!"),
body("weight").optional({ checkFalsy: true }).isFloat().withMessage("Error weight must only contain number or decimal!")
,async(req,res) =>{

    console.log("in client route /edit ");
    let {name,height,weight} = req.body;
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        console.log("Input validation error!");
        const firstError = errors.array()[0]; 
        console.log("Input validation error "+ firstError.msg);
        return res.status(422).json({ error: firstError.msg});
    }   

   

    const normal_id = new ObjectId(req.session.c_id);
    console.log(normal_id);

    try{
        const db = mongo.db("frf");
        const clients= db.collection("Clients");

        let result= await clients.findOne({_id:normal_id});
        console.log(result);
     

        if(result){
            console.log("result found");
            if(!name){
                name=result.name;
                        }      
            if(!height){
                height=result.height;
            }
            if(!weight){
                weight=result.weight;
            }


            await clients.updateOne( {_id:normal_id},
                {$set:{name:name,height:height,weight:weight}}
                );
            
        }




        return res.status(200).json({
            message: "Client Edited!",
          });

    }
    catch(err){
        console.log("err" + err);
        return res.status(400).json({
            message: "Client not edited",
          });


    }




})
 

router.post("/delete", async(req,res)=>{
 let id = req.body.id;


 const normal_id = new ObjectId(req.session.c_id);

 try{
    const db = mongo.db("frf");
    const clients= db.collection("Clients");
    await clients.deleteOne({_id:normal_id});
    return res.status(200).json({
        message: "Client Edited!",
      });

 }
 catch(err){
    console.log(err);
    return res.status(400).json({
        message: "Client not edited",
      });
 }



})




module.exports=router;
