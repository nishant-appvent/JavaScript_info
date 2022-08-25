
const db = require("../models/index");
const Users = db.users;
const {Sequelize} = require("sequelize");

const addUser = async (req,res)=>{
    // let data = await Users.build({name:'Tdfakhfdjaest',email:'test2@gmail.com'})
    // await data.save();

// Inserting data
    // let data = await Users.create({name:"qwerty",email:'qwertywerwq@gmail.com'},{fields:["email","gender"]});
// Last Insert ID
    // console.log(data.name)
    // console.log(data.id)
    // console.log(data)

// Updating Data
    // let data = await Users.update({name:'final',email:'updatedgmail@gmail.com'},{where:{id:2}});

// Deleting Data
    // let data = await Users.destroy({where:{id:5}});

// truncate
    // let data = await Users.destroy({truncate:true});

// Bulk Insert 
    // let data = await Users.bulkCreate([
    //     {name:"first",gender:"male",email:"first@gmail.com"},
    //     {name:"first2",gender:"male",email:"first2@gmail.com"},
    //     {name:"first3",gender:"male",email:"first3@gmail.com"},
    //     {name:"first4",gender:"male",email:"first4@gmail.com"},
    // ])

// Select full DATA
    // let fullData = await Users.findAll();
    // console.log(fullData);
    
// Select one DAta
    // let data = await Users.findOne({where:{id:7}});

    // data.name = "Reload Updated name";
    // data.reload();
    // data.save();
    // data.destroy();


    // console.log(data.dataValues);
    // console.log(fullData);

// Select
    // let data = await Users.findAll({
    //     attributes:[
    //         'name',
    //         ["email","emailId"],
    //         [Sequelize.fn('CONCAT', Sequelize.col('gender'),"-G"),"GENDER"],
    //     ]
    // })

// include-exclude
    
    let data = await Users.findAll({
        attributes:{exclude:'createdAt',
            include:[[Sequelize.fn('CONCAT',"prefix-----", Sequelize.col('name'),"---Suffix"),"FullName"]]
    }
    })

    let response = {
    data:data
}
    res.status(200).json(response);
}

module.exports = {
    addUser
}
 