const express=require('express')
const { getOneUser, signUp, signIn, getAllUser, verifyToken } = require("../Controller/User-Controller");
const { check}= require('express-validator');

const router=express.Router();


router.post('/user/register',[
    check('first_name', 'The first_name is required').not().isEmpty(),
    check('last_name', 'The last_name is required').not().isEmpty(),
    check('email', 'The email must be valid').isEmail(),
    check('password', 'The password must be atleast 6 characters').isLength({min:6})
], signUp)

router.get('/user/:id', verifyToken, getOneUser)
router.post('/user/login',[check('email', 'The email must be valid').isEmail(),
check('password', 'The password must be atleast 6 characters').isLength({min:6})] ,signIn)
router.get('/user', verifyToken, getAllUser)








module.exports=router