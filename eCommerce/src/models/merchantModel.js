
module.exports = (sequelize,DataTypes)=>{
    const Merchants = sequelize.define("Merchants",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type:DataTypes.BIGINT,
            allowNull:false
            },
        gstNo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            // allowNull:false
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
    });
    
    return Merchants;
}