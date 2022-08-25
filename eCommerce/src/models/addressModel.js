
module.exports = (sequelize,DataTypes)=>{
    const Address = sequelize.define("Address",{
       
        locality:{
            type:DataTypes.STRING,
            allowNull:false
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.STRING,
            allowNull:false
        },
        zipcode:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        createdAt:true,
        updatedAt:true
    });
    return Address;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"