module.exports=(sequelize,DataTypes )=>{
    const Post=sequelize.define("Post", {
        post_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user:{
            type:DataTypes.STRING,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        story:{
            type:DataTypes.STRING(300),
            allowNull:false,

        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        timestamps:false,
        tableName:'posts'
    })
    return Post
}