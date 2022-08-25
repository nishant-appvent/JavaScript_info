const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const app = express();

const port = process.env.port|| 3000;

let registerRoutes = require('./src/routes/user.route');

// app.get('/',(req,res)=>{
//     res.send('Multiple step registration running');
// });

app.use('/api/v1/user',registerRoutes);

app.listen(port,()=>{
    console.log(`Express Server is running at port ${port}`);
});