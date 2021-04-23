const express=require('express')
const { getOnePost, getAllPost, deleteOnePost ,updatePost, createPost } = require('../Controller/Post-Controller');
const {verifyToken } = require("../Controller/User-Controller");
const router=express.Router();


router.post('/post',verifyToken, createPost)
router.delete('/delete/:id', verifyToken, deleteOnePost)
router.get('/post/all', getAllPost)
router.get('/post/:id', getOnePost)
router.put('/edit/:id',verifyToken, updatePost)

module.exports=router