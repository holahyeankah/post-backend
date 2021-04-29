const dotenv= require ('dotenv');

dotenv.config();

const config={
  development: {
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect: 'mysql',
    logging:false
  },
  test: {
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect: 'mysql',
    logging:false
  },
  production: {
    use_env_variable: 'DATABASE_URL',  
    dialect: 'mysql'
  }
};

module.exports=config[process.env.NODE_ENV || 'development']