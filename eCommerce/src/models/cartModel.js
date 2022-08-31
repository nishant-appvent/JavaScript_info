
module.exports = (sequelize,DataTypes)=>{
    const Cart = sequelize.define("Cart",{
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
        }
    },{
        updatedAt:false,
        createdAt:false
    });
    return Cart;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"