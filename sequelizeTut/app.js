const express = require('express');
const app = express();

const port = 8080;

require("./models/index");

const userCtrl = require("./controllers/userController");
app.get("/",(req,res)=>{
    res.send("Home Page")
});

app.get("/add",userCtrl.addUser);

app.listen(port,()=>{
    console.log(`App listening at  ${port}`);
})