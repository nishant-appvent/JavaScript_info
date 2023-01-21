const express = require('express');
const app = express();
const nodeCmd = require("node-cmd");
const fs = require('fs');

const port = process.env.port||8000;

app.post('/deploy',(req,res)=>{
    try{
        console.log("fdasasdfasfasdfasdfasdfas");
        nodeCmd.run(`npx hardhat run scripts/ERC1155deploy.js --network goerli`,(err,data,stdout)=>{
            console.log(data);
            data = JSON.parse(data);
            if(err){
                return res.json({message:"Some error occured in deployment command."});
            }
            if(data.err) {
                return res.json({message:"Error Occured",data});
            }
            // console.log(val);
            res.json({message:"Success",data});
        });
    }catch(err){
    console.log(err);
    res.json({message:"fail"})
    }
});

app.listen(port,()=>{
    console.log(`Running on ${port}`);
})