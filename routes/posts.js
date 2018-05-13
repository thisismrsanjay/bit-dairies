const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../config/auth');
const mongoose = require('mongoose');
const post = mongoose.model('Post');
const User = mongoose.model('User');
const moment = require('moment');


router.get('/', (req, res) => {
    post.find({ status: 'public' }).populate('user').sort({date:'desc'})
        .exec((err, posts) => {
            res.render('posts/index', { posts: posts });
        });

})

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('posts/add');
})



router.get('/show/:id', (req, res) => {

    post.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err) throw err;
        else {
            var newdate = moment(data.date).format('DD/MM/YYYY');
            res.render('posts/show', {
                post: data,
                date: newdate
            });
        }
    }).populate('user').populate('comments.commentUser');
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    post.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err) throw err;
        else {
            console.log(data.user+" "+req.user.id);
            if(data.user != req.user.id){
                res.redirect('/posts');
            }else{
            res.render('posts/edit', {
                post: data
            });
            }
        }
    })

})
router.get('/user/:userId',(req,res)=>{
    post.find({user:req.params.userId ,status:'public' },(err,data)=>{
         res.render('posts/index',{
              posts:data
         })
    }).populate('user');
})
router.get('/my',ensureAuthenticated,(req,res)=>{
    post.find({user:req.user.id },(err,data)=>{
         res.render('posts/index',{
              posts:data
         })
    }).populate('user');
})


router.post('/', (req, res) => {
    let allowComments;
    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }
    new post(newStory).save((err, post) => {
        if (err) {
            return err;
        } else {
            //console.log(post);
            res.redirect(`/posts/show/${post.id}`);
        }
    })

})
router.put('/:id', (req, res) => {
    post.findOne({
        _id:req.params.id
    },(err,data)=>{
        let allowComments;
        if(req.body.allowComments){
            allowComments=true;
        }else{
            allowComments=false;
        }
        data.title = req.body.title;
        data.body =req.body.body;
        data.status= req.body.status;
        data.allowComments=req.body.allowComments;
        data.save((err)=>{
            if(err)throw err;
            else{
                res.redirect('/dashboard')
            }
        })
    })
})
router.delete('/:id', (req, res) => {
    post.remove({_id:req.params.id},(err)=>{
        if(err)throw err;
        else{
            res.redirect('/dashboard');
        }
    })
})

//req.user is important 
router.post('/comment/:id',(req,res)=>{
    post.findOne({
        _id:req.params.id
    },(err,data)=>{
        if(err)throw err;
        let newdate = moment(data.comments.commentDate).format('DD/MM/YYYY');
        let newComment ={
            commentBody : req.body.commentBody,
            commentUser : req.user.id,
            commentDate : newdate
        }
        data.comments.unshift(newComment);
        data.save((err)=>{
            if(err)throw err;
            else{
                res.redirect(`/posts/show/${data.id}`)
            }
        })
    })
})

module.exports = router;