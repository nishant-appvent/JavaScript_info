const {Sequelize,DataTypes}= require('sequelize');

const sequelize = new Sequelize('eCommerceDB','root','root@123',{
    host:'localhost',
    dialect:'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log("Sequelize connected ");
})
.catch(err=>{
    console.log("Error " + err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require('../src/models/customerModel')(sequelize,DataTypes);
db.otpTable = require('../src/models/otpModel')(sequelize,DataTypes);
db.merchants = require('../src/models/merchantModel')(sequelize,DataTypes);
db.admins = require('../src/models/adminModel')(sequelize,DataTypes);
db.address = require('../src/models/addressModel')(sequelize,DataTypes);
db.category = require('../src/models/categoryModel')(sequelize,DataTypes);
db.subCategory = require('../src/models/subCategoryModel')(sequelize,DataTypes);
db.product = require('../src/models/productModel')(sequelize,DataTypes);

(db.customers).hasMany(db.address);
(db.address).belongsTo(db.customers);

(db.category).hasMany(db.subCategory);
(db.subCategory).belongsTo(db.category);

(db.merchants).hasMany(db.product);
(db.product).belongsTo(db.merchants);

(db.category).hasMany(db.product);
(db.product).belongsTo(db.category);

(db.subCategory).hasMany(db.product);
(db.product).belongsTo(db.subCategory);

console.log(db.customers);

db.sequelize.sync({alter:true}).then(()=>{
    console.log ("yes re sync");
})

module.exports = db;