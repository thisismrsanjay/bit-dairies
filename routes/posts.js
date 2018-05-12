const express = require('express');
const router = express.Router();
const{ensureAuthenticated,ensureGuest} = require('../config/auth');
const mongoose = require('mongoose');
const post = mongoose.model('Post');
const User = mongoose.model('User');

router.get('/',(req,res)=>{
    post.find({status:'public'}).populate('user')
    .exec ((err,posts)=>{
        res.render('posts/index',{posts:posts });
    });
    
})

router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('posts/add');
})
router.post('/',(req,res)=>{
    let allowComments;
    if(req.body.allowComments){
        allowComments= true;
    }else{
        allowComments= false;
    }
    const newStory = {
        title:req.body.title,
        body:req.body.body,
        status:req.body.status,
        allowComments:allowComments,
        user:req.user.id
    }
    new post(newStory).save((err,post)=>{
        if(err){
            return err;
        }else{
            //console.log(post);
            res.redirect(`/posts/show/${post.id}`);
        }
    })

})

module.exports = router;