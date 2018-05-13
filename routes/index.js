const express = require('express');
const router = express.Router();
const{ensureAuthenticated,ensureGuest} = require('../config/auth');
const mongoose = require('mongoose');
const post = mongoose.model('Post');

router.get('/',ensureGuest,(req,res)=>{
    res.render('index/home');
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    post.find({user:req.user.id},(err,data)=>{
        if(err)throw err;
        else{
            res.render('index/dashboard',{
                posts:data
            });
        }

    })
})
router.get('/about',(req,res)=>{
    res.render('index/about');
})



module.exports = router;