module.exports = (sequelize,DataTypes)=>{
    const CartDetails = sequelize.define("CartDetails",{
        grandTotal:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false
        },
        shippingCharge:{
            type:DataTypes.DECIMAL(20,2),
            defaultValue:0,
            allowNull:false
        },
        productCount:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        updatedAt:false,
        createdAt:false
    });
    return CartDetails;
}