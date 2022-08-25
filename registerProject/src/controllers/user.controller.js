const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const e = require('express');
const UserModel = require('../models/user.model');
const { on } = require('../../config/db.config');


var UserInController = function(){
}



UserInController.registerUser = (req,res)=>{
    // res.send("you are on registration page");
    console.log('Email Phone Password Raw data',req.body);
    const regData = (req.body);

    const salt = bcrypt.genSaltSync(10);
    regData.password = bcrypt.hashSync(regData.password,salt);
    console.log(regData);

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
                    delete loginRes.password;
                    delete loginRes.otp;
                    res.json({status:true,message:"Login successful",yourData:loginRes,token:token})
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
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        UserModel.personalDet(req.id,personalDetails,(err,personal)=>{
            if(err)
                res.send(err);
                const yourData = personal[0];
                delete yourData.password;
                delete yourData.otp;
                res.json({status:true,message:'Personal details inserted',yourData:yourData})  
        })
    }
}


UserInController.addressDet = async (req,res)=>{
    const addressDetails = req.body;
    console.log(addressDetails);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        try{
        const address = await UserModel.addressDet(req.id,addressDetails);
        if(!address){
            res.status(404).json({message:"Failed"});
        }
        delete address[0].password;
        delete address[0].otp;
        res.status(200).json({status:true,message:'Address details inserted',yourData:address[0]});
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }

    }
}


UserInController.degreeDet = async (req,res)=>{
    const degreeDetails = req.body;
    console.log(degreeDetails);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        try{
        const degree=await UserModel.degreeDet(req.id,degreeDetails);
        if(!degree){
            res.status(404).json({message:"Failed"});
        }
        delete degree[0].password;
        delete degree[0].otp;
        res.status(200).json({status:true,message:"Degree details inserted",yourData:degree[0]})
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
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


UserInController.getAllUser = async (req,res)=>{
    const adminId = req.id;
    const limit = 5;
    const page = req.query.page;
    let offset = 0;
    if(page) {
    offset = (page-1)*limit;}
    console.log(adminId);
    try{
    const allUserData = await UserModel.getAllUsers(adminId,limit,offset);
    if(!allUserData){
        res.status(404).json({message:"Failed"});
    }
    else if(allUserData==="NotAdmin"){
        res.status(200).json({message:"Access Denied"});
    }
    else{
        let onBoarded = 0;
        let remaining = 0;
        for(let i of allUserData){
            delete i.password;
            delete i.otp;
            if(i.step===0){
                onBoarded += 1;
            }
            else{
                remaining += 1;
            }
        }
    res.status(200).json({status:true,message:"All users data Fetched",Onboarded:onBoarded,DetailsPending:remaining,AllUsersData:allUserData})
    }
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}


UserInController.sendOtp = async (req,res)=>{
    const email = req.body;
    const id = req.id;
    console.log(email);
    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        try{
        const otpSent=await UserModel.saveOtp(id,email);
        console.log(otpSent);
        if(!otpSent){
            res.status(404).json({message:"Failed"});
        }
        res.status(200).json({status:true,message:otpSent})
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}
}

UserInController.verifyOtp = async (req,res)=>{
    const receivedOtp = req.body.otp;
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        try{
        const otpReceived=await UserModel.verifyOtp(req.id,receivedOtp);
        console.log(otpReceived);
        if(!otpReceived){
            res.status(404).json({message:"Failed"});
        }
        res.status(200).json({status:true,message:otpReceived})
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}
}

UserInController.sendPost = async (req,res)=>{
    const userId = req.id;
    const postBody = req.body; 
    console.log("-----")
    try{
        const postRes = await UserModel.sendPost(userId,postBody);
        console.log(postRes);
        if(!postRes){
            res.status(404).json({message:"Failed"});
        }
        res.status(200).json({message:postRes});
    }
    catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

UserInController.watchPost = async (req,res)=>{
    const userId  = req.id;
    try{
        const postResponse = await UserModel.watchPost(userId);
        console.log(postResponse);
        if(!postResponse){
            res.status(404).json({message:"Failed"});
        }
        res.status(200).json({message:postResponse});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = UserInController;
module.exports = UserInController