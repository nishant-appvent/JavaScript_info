
module.exports = (sequelize,DataTypes)=>{
    const Cart = sequelize.define("Cart",{
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