const db = require('../database/models');
const {Post, User}=db;
const { Op } = require('sequelize');
require('dotenv').config();
const createPost=( req, res)=>{
    const{title, story}=req.body;
    if(!(title && story)){
        return  res.status(404).json("Content cannot be empty")
       
    } 
    Post.create({
        title,
        story,
        user:req.decoded.payrol.name,
        user_id:req.decoded.payrol.id

    }).then(post=>{
        res.status(200).json({message:"Post successfully created", post})
    }).catch(err=>{
        res.status(404).json("Cannot create post")
    })
}


const getAllPost=(req, res)=>{
    const{page, limit, title}=req.query;
    const offset=parseInt((page-1), 10)* limit;
    const queryBuilder={   
       distict:true,
        offset:parseFloat(offset),
        limit:parseFloat(limit)
    }
   if(title){
       queryBuilder.where={
           
               title:{
                   [Op.like]:`%${title}%`
               }
           
       }
   }
    Post.findAndCountAll(queryBuilder)
    .then(post=>{
        if(post.rows.length < 1){
       return res.status(404).json('No such post')
        }

   const currentPage=page;
   const pageSize=limit;
   const totalPages=Math.ceil(post.count/pageSize)
   res.status(200).json({
       pagination:{
         currentPage,
           pageSize,
           totalPages,
           totalItems:post.count
        },
        posts:post.rows
       
   })     
    }).catch(err=>{
        res.status(400).json("post could not be found")
    })
}



const getOnePost=(req, res)=>{
    Post.findByPk(req.params.id)
    .then(post=>{
        res.status(200).json({message:"Post gotten", post})
    }).catch(err=>{
        res.status(404).json("No such post")
    })
}
const deleteOnePost=(req, res)=>{
    Post.findOne({
        where:{
            post_id:req.params.id
        }
    }).then(post=>{
        if(!post){
            return res.status(404).json("Post doesnt exist")
        }
        post.destroy();
         return res.status(200).json({message:"Post destroyed"})
        
    }).catch(err=>{
        res.status(404).json("post cant be deleted")
    })
    
    }

const updatePost=(req, res)=>{
    const{title,story}=req.body;
    

    Post.findOne({
        where:{
            post_id:req.params.id
        }
    }).then(post=>{
        if(!post){
            return res.status(404).json("post not found")
        }
        post.update({
            title:title || post.title,
            story: story || post.story
        }).then(post=>{
            return res.status(200).json({
                updatedPost:{
                    post,
                    message:"post updated successfully"
                }    
            })
        }).catch(err=>{
            res.status(404).json("Post cant be updated", err)
        })
    })
}
module.exports={ deleteOnePost, createPost, getAllPost, getOnePost, updatePost}
