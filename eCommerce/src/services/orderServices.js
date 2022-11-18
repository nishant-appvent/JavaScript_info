
const dbConn = require("../../config/db.config");
const Orders = dbConn.order;

const orderFindAll = ()=>{
    return Orders.findAll().then((data)=>{
            return data;
        }).catch((err)=>{
            return false;
        })
};

// const 

module.exports = {
    orderFindAll
}

