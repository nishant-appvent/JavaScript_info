const mysql = require('mysql');

// mysql connection

const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root@123',
    database:'registrationDB'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully... ');
})

module.exports = dbConn;