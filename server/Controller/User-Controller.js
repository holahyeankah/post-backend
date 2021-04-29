const db = require('../database/models');
const {User}=db;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} =require ('express-validator');
const dotenv= require ('dotenv');
dotenv.config();


const signUp=(req,res)=>{   
const {password, email,first_name, last_name} = req.body;

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
User.findOne({
    where:{
        email
    }
}).then(user=>{
    if(user){
    return res.status(400).json('Email already exist')
    }
    
const saltRounds=10;
const hash=bcrypt.hashSync(password, saltRounds)
User.create({
    first_name,
    last_name,
    email,
    password:hash
}).then(user=>{
    res.status(200).json({message:"User successfully created", user})
        
}).catch(err=>{
    res.status(404).json("User doesnt exist")

})
    
})
    
};

const signIn=(req,res)=>{
const {email, password}= req.body;
User.findOne({
    
        where:{
            email     
        }
    })
    .then(user=>{
     if(!user)
      return res.status(404).json('User doesnt exist')
         bcrypt.compare(password, user.password, (err, result)=>{
             if (err){
                 throw new Error(err)
             };
             if (result){  
                 delete user.password; 
                 const payrol={
                     id:user.user_id,
                    name:user.first_name + " " + user.last_name
                 }
                   
              jwt.sign({payrol},process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token)=>{
                        res.json({message:
                        "Login successfuly",
                          token,                     
                         } )
                 
         })
        } else{
            res.status(404).json(
                 ' Incorrect password '
                   
            )
        }
    
         })
    })
   
}
const getAllUser=(req, res)=>{
    user.findAll().then(user=>{
        res.json(user)
       
        
    })
};

const getOneUser=(req,res)=>{
    user.findById(req.params.id,(error, data)=>{
        if(error){
            return(error)
        }else{
            res.status(200).json({message:data})
        }
    })
}

function verifyToken(req, res, next){
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
    const bearer= bearerHeader.split(' ');
    const bearerToken=bearer[1];
        jwt.verify(bearerToken, process.env.SECRET_KEY, (err, token) => {
            if (err) {
               return res.status(401).json({ message: 'unverified token'})
            } else {
                req.decoded = token;
                return next();
            }
        })

    } else{
       
        return res.status(404).json('unverified')
    }
}



module.exports = {getAllUser, getOneUser, verifyToken, signUp, signIn}


