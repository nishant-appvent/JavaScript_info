const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const EmployeeRoutes = require('./routes/EmployeeRoute');
const AuthRoutes = require('./routes/authRoute');
const dotenv = require('dotenv');
// require("../../nft-Tut/nft-smart-contract/scripts/mintBatch");
dotenv.config();

mongoose.connect('mongodb://localhost:27017/testdb',{
    useNewUrlParser: true,  
    useUnifiedTopology: true
  })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("Connected successfully");
});
// create express app
const app = express();

// setup the server port
bodyParser.urlencoded({extended:false})
app.use(bodyParser.json())
const port = process.env.port || 7000;

// define root route
app.get('/',(req,res)=>{
    res.send('Hello World');
});


// create employee routes
app.use('/mongo',EmployeeRoutes);
app.use('/',AuthRoutes);
app.use('/uploads',express.static('uploads'));

// listen to the port
app.listen(port,()=>{
    console.log(`Express Server is running at port ${port}`);
});