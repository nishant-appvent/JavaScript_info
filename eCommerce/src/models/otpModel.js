
module.exports = (sequelize,DataTypes)=>{
    const OTP = sequelize.define("otpTable",{
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
       
        otp:{
            type:DataTypes.STRING,
            allowNull:false
        },
        setAt:{
            type:DataTypes.STRING,
            defaultValue: Math.floor(Date.now()/1000),
        }
       
    },{
        updatedAt:false,
        createdAt:false
    });
    return OTP;
}