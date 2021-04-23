const express= require('express')
const path = require ('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const app= express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const api_1= require('./server/routes/post')
const api_2= require('./server/routes/user')

app.use('/', api_1)
app.use('/', api_2)



const PORT= process.env.PORT || '3000'
app.listen(PORT,()=>{
console.log(`Server is listening on port ${PORT}`)

})
module.exports=app;

