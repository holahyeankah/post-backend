module.exports=(sequelize,DataTypes )=>{
    const User=sequelize.define("User", {
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
       first_name:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique: true,
            validate:{
                isEmail:true
            },
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,

        },
        age:{
            type:DataTypes.INTEGER,

        },
        phone_number:{
            type:DataTypes.INTEGER,
        }

        },{
         timestamps:false,
        tableName:'users'
        
    

    })
    return User
}