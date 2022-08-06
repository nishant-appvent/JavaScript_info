const bcrypt = require('bcrypt');
// get all Employee list
const jwt = require("jsonwebtoken");

const e = require('express');
const UserModel = require('../models/user.model');


var UserInController = function(){
}

UserInController.registerUser = (req,res)=>{
    // res.send("you are on registration page");
    console.log('Email Phone Password Raw data',req.body);
    const regData = (req.body);

    const salt = bcrypt.genSaltSync(10);
    regData.password = bcrypt.hashSync(regData.password,salt);
    console.log(regData);
    

    // // check null
    if((regData.constructor===Object) && (Object.keys(req.body).length===0)){
        res.status(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.registerUser(regData,(err,user)=>{
            if(err)
                res.send(err);
                console.log(user[0]);
                console.log(Object.keys(user))
                if(Object.keys(user).length===1)
                 {res.json({status:false,message:user[0].message});
                    }
                else{
                    
                res.json({status:true,message:'User registered successfully',data: user}) 
            } 
        })
    }
}

UserInController.loginUser = (req,res)=>{
    console.log("Login Page");
    const loginData = (req.body);
    console.log('Email Password Raw data',loginData);

    // // check null
    if((loginData.constructor===Object) && (Object.keys(req.body).length===0)){
        res.status(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.loginUser(loginData,(err,loginRes)=>{
            if(err)
                res.send(err);
            else if (loginRes.password==="Not Found"){
                res.json({status:"Not Found",message:"User isn't registered"});``
            }
            else{
            bcrypt.compare(loginData.password,loginRes.password,(err,check)=>{
                if(check){
                    console.log("Password matched");
                    const token = jwt.sign({id:loginRes.id},"secret_key");
                    res.json({status:true,message:"Login successful",token:token})
                }
                else{
                    console.log("Password not matched")
                    res.json({status:false,message:"Login failed"})
                }
            }) }
        })
    }
}


UserInController.personalDet = (req,res)=>{
    
    const personalDetails = req.body;
    console.log(personalDetails);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.personalDet(req.id,personalDetails,(err,personal)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'Personal details inserted'})  
        })
    }
}


UserInController.addressDet = (req,res)=>{
    const addressDetails = req.body;
    console.log(addressDetails);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.addressDet(req.id,addressDetails,(err,personal)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'Address details inserted'})  
        })
    }
}


UserInController.degreeDet = (req,res)=>{
    const degreeDetails = req.body;
    console.log(degreeDetails);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.degreeDet(req.id,degreeDetails,(err,personal)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'Degree details inserted'})  
        })
    }
}

UserInController.getUser = (req,res)=>{
    let userId = req.id;
    UserModel.getUser( userId,(err,userData)=>{
        if(err) 
        res.send(err);
        console.log('Employees',userData);
        res.json({UserData:userData[0]});
    })
}



module.exports = UserInController;