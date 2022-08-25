
module.exports = (sequelize,DataTypes)=>{
    const Products = sequelize.define("Product",{
        pname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue:1,
            allowNull:false
        }
    },{
        updatedAt:true,
        createdAt:true
    });
    return Products;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"