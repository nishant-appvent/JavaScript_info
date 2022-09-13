module.exports = (sequelize,DataTypes)=>{
    const Orders = sequelize.define("Order",{
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
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        paymentStatus:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        }

    },{
        updatedAt:true,
        createdAt:true
    });
    return Orders;
}