
module.exports = (sequelize,DataTypes)=>{
    const payment = sequelize.define("payment",{
        paymentID:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
       
        transactionID:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
       
    },{
        updatedAt:true,
        createdAt:true
    });
    return payment;
}