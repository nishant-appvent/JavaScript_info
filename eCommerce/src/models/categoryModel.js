
module.exports = (sequelize,DataTypes)=>{
    const Category = sequelize.define("Category",{
       
        Category:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
    },{
        updatedAt:false,
        createdAt:false
    });
    return Category;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"