
module.exports = (sequelize,DataTypes)=>{
    const Customers = sequelize.define("Customers",{
        name:{
            type:DataTypes.STRING,
            // allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            // allowNull:false
        },
        phone:{
            type:DataTypes.BIGINT,
            // allowNull:false
            },
        password:{
            type:DataTypes.STRING,
            // allowNull:false
        },
        step:DataTypes.INTEGER,
        status:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
    });
    return Customers;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"