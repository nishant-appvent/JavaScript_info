const express = require('express');
const bodyParser = require('body-parser');

// create express app

const app = express();

// setup the server port

const port = process.env.port || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended:false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/',(req,res)=>{
    res.send('Hello World');
});

// app.get('/login',(req,res)=>{
//     res.send('You are logged in');
// })
// import employee routes
const employeeRoutes = require('./src/routes/employee.route');
const loginRoutes = require('./src/routes/login.route');

// create employee routes
app.use('/api/v1/employee',employeeRoutes);
app.use('/api/v1/login',loginRoutes);

// listen to the port
app.listen(port,()=>{
    console.log(`Express Server is running at port ${port}`);
});