
module.exports = (sequelize,DataTypes)=>{
    const SubCategory = sequelize.define("Sub-category",{
       
        subCategory:{
            type:DataTypes.STRING,
            // allowNull:false
        }
        
    },{
        updatedAt:false,
        createdAt:false
    });
    return SubCategory;
}
        
    // },
    // { tableName:"Userdatasat"
        // timestamps:false
        // updatedAt:false
        // updatedAt:"created_at"
        // createdAt:false
        // engine:"MYISAM"