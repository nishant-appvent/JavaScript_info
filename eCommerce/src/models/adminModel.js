
module.exports = (sequelize,DataTypes)=>{
    const Admins = sequelize.define("Admins",{
       
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        // createdAt:{
        //     type:DataTypes.TIME,
        //     defaultValue:Date.now()
        // }
        
    },{
        updatedAt:false,
        createdAt:false
    });
    return Admins;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"