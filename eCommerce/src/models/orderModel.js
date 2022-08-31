
module.exports = (sequelize,DataTypes)=>{
    const Order = sequelize.define("Order",{
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        discountPercent:{
            type:DataTypes.FLOAT,
            defaultValue:0,
            allowNull:false
        },
        discountedPrice:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        updatedAt:true,
        createdAt:true
    });
    return Order;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"