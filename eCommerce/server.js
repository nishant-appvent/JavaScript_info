const express = require('express');
const app = express();
const port = 3000;

require('./config/db.config')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routesUsed = require('./src/routes/route');

app.get("/",(req,res)=>{
    res.send("Home Page")
});

app.use('/api/v1/',routesUsed)

app.listen(port,()=>{
    console.log(`App listening at ${port}`)
})